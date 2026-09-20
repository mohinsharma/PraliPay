import unittest
import json
import sys
import os

# Add backend directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import app

class TestBiomassAPI(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
        # Establish trusted server-side session for existing test suite
        with self.app.session_transaction() as sess:
            sess['user_id'] = 'usr_farmer_01'
            sess['role'] = 'farmer'

    def test_health_endpoint(self):
        response = self.app.get('/api/health')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['status'], 'healthy')
        self.assertIn('service', data)

    def test_models_endpoint(self):
        response = self.app.get('/api/models')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('models', data)
        self.assertTrue(len(data['models']) > 0)

    def test_predict_valid_input(self):
        payload = {
            "crop_type": "Wheat",
            "area": 4.2,
            "rainfall": 739.9,
            "soil_ph": 7.2,
            "yield": 4.2,
            "temperature": 22.6,
            "distance_km": 7.2
        }
        response = self.app.post(
            '/api/predict',
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertTrue(data['success'])
        self.assertEqual(data['label'], 'PREDICTED BIOMASS')
        self.assertEqual(data['unit'], 'tonnes')
        self.assertAlmostEqual(data['prediction'], 3.08, places=2)
        self.assertIn('model', data)
        self.assertIn('reliability', data)
        self.assertEqual(data['reliability']['status'], 'Prototype Estimate')
        self.assertIn('recommendations', data)
        self.assertIn('economics', data)
        self.assertGreater(data['economics']['total_payout'], 0)

    def test_predict_missing_input(self):
        payload = {
            "distance_km": 7.2,
            "crop_type": "Wheat"
            # Missing area
        }
        response = self.app.post(
            '/api/predict',
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertFalse(data['success'])
        self.assertEqual(data['code'], 'MISSING_INPUT')

    def test_predict_invalid_crop(self):
        payload = {
            "crop_type": "Barley",
            "area": 4.2,
            "distance_km": 7.2
        }
        response = self.app.post(
            '/api/predict',
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertFalse(data['success'])
        self.assertEqual(data['code'], 'UNSUPPORTED_CROP')

    def test_predict_invalid_numeric(self):
        payload = {
            "crop_type": "Wheat",
            "area_acres": "not-a-number",
            "distance_km": 7.2
        }
        response = self.app.post(
            '/api/predict',
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertFalse(data['success'])
        self.assertEqual(data['code'], 'INVALID_INPUT')

    def test_predict_out_of_bounds(self):
        payload = {
            "crop_type": "Wheat",
            "area": -5.0,
            "distance_km": 7.2
        }
        response = self.app.post(
            '/api/predict',
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertFalse(data['success'])
        self.assertEqual(data['code'], 'INVALID_INPUT')

    def test_predict_role_auth(self):
        # Valid farmer role via authenticated session
        payload = {
            "crop_type": "Wheat",
            "area": 4.2
        }
        resp = self.app.post('/api/predict', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(resp.status_code, 200)

        # Unauthorized role (Baler attempting to call farmer predict endpoint)
        baler_client = app.test_client()
        with baler_client.session_transaction() as sess:
            sess['user_id'] = 'usr_baler_01'
            sess['role'] = 'baler'
        resp_unauth = baler_client.post('/api/predict', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(resp_unauth.status_code, 403)
        data = json.loads(resp_unauth.data)
        self.assertEqual(data['code'], 'FORBIDDEN')

    def test_predict_non_json(self):
        response = self.app.post(
            '/api/predict',
            data="not json",
            content_type='text/plain'
        )
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertFalse(data['success'])
        self.assertEqual(data['code'], 'INVALID_JSON')

    def test_field_valid_polygon(self):
        payload = {
            "polygon": [
                {"lat": 30.9010, "lng": 75.8570},
                {"lat": 30.9050, "lng": 75.8570},
                {"lat": 30.9050, "lng": 75.8610},
                {"lat": 30.9010, "lng": 75.8610}
            ],
            "crop_type": "Wheat",
            "yield": 4.2
        }
        response = self.app.post(
            '/api/field',
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertTrue(data['success'])
        self.assertIn('field', data)
        self.assertGreater(data['field']['area_hectares'], 0)
        self.assertEqual(data['field']['num_vertices'], 4)
        self.assertAlmostEqual(data['field']['centroid']['lat'], 30.9030, places=3)
        self.assertAlmostEqual(data['field']['centroid']['lng'], 75.8590, places=3)
        self.assertEqual(data['field']['crop_type'], 'Wheat')
        self.assertEqual(data['field']['yield'], 4.2)
        self.assertEqual(data['field']['yield_unit'], 'tonnes/hectare')
        self.assertEqual(data['display']['title'], 'Field selected')
        self.assertTrue(data['display']['area_text'].startswith('Area:'))
        self.assertEqual(data['display']['crop_text'], 'Crop: Wheat')
        self.assertEqual(data['display']['yield_text'], 'Yield: 4.2 t/ha')

        # Verify Stage 3 Environmental Data
        self.assertIn('environment', data)
        env = data['environment']
        self.assertIn('weather', env)
        self.assertIn('soil', env)
        self.assertIn('features', env)

        # Weather features check
        weather = env['weather']
        self.assertEqual(weather['status'], 'success')
        self.assertIn('rainfall', weather)
        self.assertEqual(weather['rainfall']['unit'], 'mm')
        self.assertEqual(weather['rainfall']['type'], 'retrieved')
        self.assertGreater(weather['rainfall']['value'], 0)

        self.assertIn('temperature', weather)
        self.assertEqual(weather['temperature']['unit'], '°C')
        self.assertEqual(weather['temperature']['type'], 'retrieved')

        # Soil features check
        soil = env['soil']
        self.assertEqual(soil['status'], 'success')
        self.assertIn('soil_ph', soil)
        self.assertEqual(soil['soil_ph']['unit'], 'pH')
        self.assertEqual(soil['soil_ph']['type'], 'estimated')
        self.assertGreaterEqual(soil['soil_ph']['value'], 5.0)
        self.assertLessEqual(soil['soil_ph']['value'], 9.5)

    def test_field_valid_crops_all(self):
        for crop, yield_val in [("Rice", 4.8), ("Wheat", 4.2), ("Maize", 3.8)]:
            payload = {
                "polygon": [
                    {"lat": 30.9010, "lng": 75.8570},
                    {"lat": 30.9050, "lng": 75.8570},
                    {"lat": 30.9050, "lng": 75.8610},
                    {"lat": 30.9010, "lng": 75.8610}
                ],
                "crop_type": crop,
                "yield": yield_val
            }
            response = self.app.post(
                '/api/field',
                data=json.dumps(payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.data)
            self.assertTrue(data['success'])
            self.assertEqual(data['field']['crop_type'], crop)
            self.assertEqual(data['field']['yield'], yield_val)
            self.assertEqual(data['field']['yield_unit'], 'tonnes/hectare')

    def test_field_missing_crop(self):
        payload = {
            "polygon": [
                {"lat": 30.9010, "lng": 75.8570},
                {"lat": 30.9050, "lng": 75.8570},
                {"lat": 30.9050, "lng": 75.8610},
                {"lat": 30.9010, "lng": 75.8610}
            ],
            "yield": 4.8
        }
        response = self.app.post(
            '/api/field',
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertFalse(data['success'])
        self.assertEqual(data['code'], 'MISSING_CROP_TYPE')

    def test_field_invalid_crop(self):
        payload = {
            "polygon": [
                {"lat": 30.9010, "lng": 75.8570},
                {"lat": 30.9050, "lng": 75.8570},
                {"lat": 30.9050, "lng": 75.8610},
                {"lat": 30.9010, "lng": 75.8610}
            ],
            "crop_type": "Cotton",
            "yield": 4.8
        }
        response = self.app.post(
            '/api/field',
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertFalse(data['success'])
        self.assertEqual(data['code'], 'INVALID_CROP_TYPE')

    def test_field_missing_yield(self):
        payload = {
            "polygon": [
                {"lat": 30.9010, "lng": 75.8570},
                {"lat": 30.9050, "lng": 75.8570},
                {"lat": 30.9050, "lng": 75.8610},
                {"lat": 30.9010, "lng": 75.8610}
            ],
            "crop_type": "Rice"
        }
        response = self.app.post(
            '/api/field',
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertFalse(data['success'])
        self.assertEqual(data['code'], 'MISSING_YIELD')

    def test_field_invalid_yield_negative(self):
        payload = {
            "polygon": [
                {"lat": 30.9010, "lng": 75.8570},
                {"lat": 30.9050, "lng": 75.8570},
                {"lat": 30.9050, "lng": 75.8610},
                {"lat": 30.9010, "lng": 75.8610}
            ],
            "crop_type": "Rice",
            "yield": -2.0
        }
        response = self.app.post(
            '/api/field',
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertFalse(data['success'])
        self.assertEqual(data['code'], 'INVALID_YIELD')

    def test_field_invalid_yield_non_numeric(self):
        payload = {
            "polygon": [
                {"lat": 30.9010, "lng": 75.8570},
                {"lat": 30.9050, "lng": 75.8570},
                {"lat": 30.9050, "lng": 75.8610},
                {"lat": 30.9010, "lng": 75.8610}
            ],
            "crop_type": "Rice",
            "yield": "high-yield"
        }
        response = self.app.post(
            '/api/field',
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertFalse(data['success'])
        self.assertEqual(data['code'], 'INVALID_YIELD')

    def test_field_invalid_yield_out_of_bounds(self):
        payload = {
            "polygon": [
                {"lat": 30.9010, "lng": 75.8570},
                {"lat": 30.9050, "lng": 75.8570},
                {"lat": 30.9050, "lng": 75.8610},
                {"lat": 30.9010, "lng": 75.8610}
            ],
            "crop_type": "Rice",
            "yield": 35.0
        }
        response = self.app.post(
            '/api/field',
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertFalse(data['success'])
        self.assertEqual(data['code'], 'INVALID_YIELD')

    def test_environment_endpoint_get(self):
        response = self.app.get('/api/environment?lat=30.9010&lng=75.8570')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertTrue(data['success'])
        self.assertIn('environment', data)
        env = data['environment']
        self.assertEqual(env['weather']['status'], 'success')
        self.assertEqual(env['soil']['status'], 'success')
        self.assertEqual(env['weather']['rainfall']['unit'], 'mm')
        self.assertEqual(env['weather']['rainfall']['type'], 'retrieved')
        self.assertEqual(env['soil']['soil_ph']['type'], 'estimated')

    def test_environment_endpoint_post(self):
        payload = {"lat": 30.9010, "lng": 75.8570}
        response = self.app.post(
            '/api/environment',
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertTrue(data['success'])
        self.assertIn('environment', data)

    def test_environment_missing_coordinates(self):
        response = self.app.get('/api/environment')
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertFalse(data['success'])
        self.assertEqual(data['code'], 'MISSING_COORDINATES')

    def test_environment_invalid_coordinates(self):
        response = self.app.get('/api/environment?lat=abc&lng=75.8570')
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertFalse(data['success'])
        self.assertEqual(data['code'], 'INVALID_COORDINATES')

    def test_environment_out_of_bounds(self):
        response = self.app.get('/api/environment?lat=95.0&lng=75.8570')
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertFalse(data['success'])
        self.assertEqual(data['code'], 'INVALID_COORDINATES')

    def test_field_insufficient_points(self):
        payload = {
            "polygon": [
                {"lat": 30.9010, "lng": 75.8570},
                {"lat": 30.9050, "lng": 75.8570}
            ],
            "crop_type": "Rice",
            "yield": 4.8
        }
        response = self.app.post(
            '/api/field',
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertFalse(data['success'])
        self.assertEqual(data['code'], 'INVALID_POLYGON')

    def test_field_invalid_coordinates(self):
        payload = {
            "polygon": [
                {"lat": "invalid", "lng": 75.8570},
                {"lat": 30.9050, "lng": 75.8570},
                {"lat": 30.9050, "lng": 75.8610}
            ],
            "crop_type": "Rice",
            "yield": 4.8
        }
        response = self.app.post(
            '/api/field',
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertFalse(data['success'])
        self.assertEqual(data['code'], 'INVALID_NUMERIC')

    def test_field_out_of_bounds(self):
        payload = {
            "polygon": [
                {"lat": 95.0, "lng": 75.8570},
                {"lat": 30.9050, "lng": 75.8570},
                {"lat": 30.9050, "lng": 75.8610}
            ],
            "crop_type": "Rice",
            "yield": 4.8
        }
        response = self.app.post(
            '/api/field',
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertFalse(data['success'])
        self.assertEqual(data['code'], 'OUT_OF_BOUNDS')

    def test_field_missing_polygon(self):
        payload = {}
        response = self.app.post(
            '/api/field',
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertFalse(data['success'])
        self.assertEqual(data['code'], 'MISSING_FIELD')

    def test_field_predicted_biomass_structure(self):
        payload = {
            "polygon": [
                {"lat": 30.9010, "lng": 75.8570},
                {"lat": 30.9050, "lng": 75.8570},
                {"lat": 30.9050, "lng": 75.8610},
                {"lat": 30.9010, "lng": 75.8610}
            ],
            "crop_type": "Wheat",
            "yield": 4.2
        }
        response = self.app.post(
            '/api/field',
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('predicted_biomass', data)
        biomass = data['predicted_biomass']
        self.assertEqual(biomass['label'], 'PREDICTED BIOMASS')
        self.assertEqual(biomass['unit'], 'tonnes')
        self.assertGreater(biomass['prediction'], 0)
        self.assertIn('display', data)
        self.assertIn('PREDICTED BIOMASS:', data['display']['predicted_biomass_text'])

    def test_predict_missing_model(self):
        from unittest.mock import patch
        with patch('app.predict_residue', side_effect=FileNotFoundError("Model missing")):
            payload = {
                "crop_type": "Wheat",
                "area": 4.2,
                "role": "farmer"
            }
            response = self.app.post(
                '/api/predict',
                data=json.dumps(payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, 500)
            data = json.loads(response.data)
            self.assertFalse(data['success'])
            self.assertEqual(data['code'], 'MODEL_NOT_FOUND')

    def test_predict_prediction_error(self):
        from unittest.mock import patch
        with patch('app.predict_residue', side_effect=RuntimeError("Prediction math failed")):
            payload = {
                "crop_type": "Wheat",
                "area": 4.2,
                "role": "farmer"
            }
            response = self.app.post(
                '/api/predict',
                data=json.dumps(payload),
                content_type='application/json'
            )
            self.assertEqual(response.status_code, 500)
            data = json.loads(response.data)
            self.assertFalse(data['success'])
            self.assertEqual(data['code'], 'PREDICTION_ERROR')

    def test_stage7_auth_login_success(self):
        """Verify login endpoint authenticates and returns user and token."""
        payload = {"role": "farmer", "phone": "+919876543210"}
        resp = self.app.post('/api/auth/login', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.data)
        self.assertTrue(data['success'])
        self.assertIn('token', data)
        self.assertEqual(data['user']['role'], 'farmer')
        self.assertEqual(data['user']['id'], 'usr_farmer_01')

    def test_stage7_auth_login_invalid_credentials(self):
        """Verify login rejects non-existent user."""
        payload = {"username": "non_existent_user_99"}
        resp = self.app.post('/api/auth/login', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(resp.status_code, 401)
        data = json.loads(resp.data)
        self.assertFalse(data['success'])
        self.assertEqual(data['code'], 'INVALID_CREDENTIALS')

    def test_stage7_auth_login_invalid_phone_validation(self):
        """Verify login rejects invalid phone number format with 400."""
        payload = {"phone": "12345", "role": "farmer"}
        resp = self.app.post('/api/auth/login', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(resp.status_code, 400)
        data = json.loads(resp.data)
        self.assertFalse(data['success'])
        self.assertEqual(data['code'], 'INVALID_PHONE')

    def test_stage7_auth_login_invalid_role_validation(self):
        """Verify login rejects invalid role with 400."""
        payload = {"role": "invalid_superman_role", "phone": "+919876543210"}
        resp = self.app.post('/api/auth/login', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(resp.status_code, 400)
        data = json.loads(resp.data)
        self.assertFalse(data['success'])
        self.assertEqual(data['code'], 'INVALID_ROLE')

    def test_stage7_auth_login_new_user_registration(self):
        """Verify login dynamically registers a new Punjab user when valid details are provided."""
        payload = {
            "name": "Harpreet Singh",
            "role": "farmer",
            "phone": "+91 98111 22233",
            "location": "Sangrur, Punjab"
        }
        resp = self.app.post('/api/auth/login', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.data)
        self.assertTrue(data['success'])
        self.assertIn('token', data)
        self.assertEqual(data['user']['name'], 'Harpreet Singh')
        self.assertEqual(data['user']['role'], 'farmer')


    def test_stage7_auth_logout(self):
        """Verify logout endpoint clears session."""
        resp = self.app.post('/api/auth/logout')
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.data)
        self.assertTrue(data['success'])

    def test_stage7_auth_me_authenticated(self):
        """Verify /api/auth/me returns current authenticated user from server session."""
        resp = self.app.get('/api/auth/me')
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.data)
        self.assertTrue(data['success'])
        self.assertEqual(data['user']['id'], 'usr_farmer_01')
        self.assertEqual(data['user']['role'], 'farmer')

    def test_stage7_predict_unauthenticated_rejected(self):
        """Verify unauthenticated request to /api/predict is rejected with 401."""
        anon_client = app.test_client()
        payload = {
            "crop_type": "Wheat",
            "area": 4.2
        }
        resp = anon_client.post('/api/predict', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(resp.status_code, 401)
        data = json.loads(resp.data)
        self.assertFalse(data['success'])
        self.assertEqual(data['code'], 'UNAUTHENTICATED')

    def test_stage7_predict_client_role_tampering_ignored(self):
        """Verify client-supplied role in payload/params does NOT bypass authentication."""
        anon_client = app.test_client()
        payload = {
            "crop_type": "Wheat",
            "area": 4.2,
            "role": "farmer",
            "user_id": "usr_farmer_01"
        }
        # Passing role in body or query param without valid session/token MUST fail with 401
        resp = anon_client.post('/api/predict?role=farmer&user_id=usr_farmer_01', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(resp.status_code, 401)
        data = json.loads(resp.data)
        self.assertEqual(data['code'], 'UNAUTHENTICATED')

    def test_stage7_predict_baler_forbidden(self):
        """Verify baler role cannot access farmer prediction endpoint."""
        baler_client = app.test_client()
        with baler_client.session_transaction() as sess:
            sess['user_id'] = 'usr_baler_01'
            sess['role'] = 'baler'

        payload = {
            "crop_type": "Wheat",
            "area": 4.2
        }
        resp = baler_client.post('/api/predict', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(resp.status_code, 403)
        data = json.loads(resp.data)
        self.assertEqual(data['code'], 'FORBIDDEN')

    def test_stage7_field_unauthenticated_rejected(self):
        """Verify unauthenticated request to /api/field is rejected with 401."""
        anon_client = app.test_client()
        payload = {
            "polygon": [
                {"lat": 30.9010, "lng": 75.8570},
                {"lat": 30.9050, "lng": 75.8570},
                {"lat": 30.9050, "lng": 75.8610},
                {"lat": 30.9010, "lng": 75.8610}
            ],
            "crop_type": "Wheat",
            "yield": 4.2
        }
        resp = anon_client.post('/api/field', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(resp.status_code, 401)
        data = json.loads(resp.data)
        self.assertEqual(data['code'], 'UNAUTHENTICATED')

    def test_stage7_field_farmer_authorized(self):
        """Verify farmer role can access /api/field."""
        payload = {
            "polygon": [
                {"lat": 30.9010, "lng": 75.8570},
                {"lat": 30.9050, "lng": 75.8570},
                {"lat": 30.9050, "lng": 75.8610},
                {"lat": 30.9010, "lng": 75.8610}
            ],
            "crop_type": "Wheat",
            "yield": 4.2
        }
        resp = self.app.post('/api/field', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.data)
        self.assertTrue(data['success'])

    def test_stage7_baler_endpoint_farmer_forbidden(self):
        """Verify farmer role cannot access baler jobs endpoint."""
        resp = self.app.get('/api/baler/jobs')
        self.assertEqual(resp.status_code, 403)
        data = json.loads(resp.data)
        self.assertEqual(data['code'], 'FORBIDDEN')

    def test_stage7_baler_endpoint_baler_authorized(self):
        """Verify baler role can access baler jobs endpoint."""
        baler_client = app.test_client()
        with baler_client.session_transaction() as sess:
            sess['user_id'] = 'usr_baler_01'
            sess['role'] = 'baler'
        resp = baler_client.get('/api/baler/jobs')
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.data)
        self.assertTrue(data['success'])
        self.assertIn('jobs', data)

    def test_stage7_private_records_cross_user_isolation(self):
        """Verify User B cannot access User A's private record."""
        # Create client for User B (baler or another farmer)
        user_b_client = app.test_client()
        with user_b_client.session_transaction() as sess:
            sess['user_id'] = 'usr_baler_01'
            sess['role'] = 'baler'

        # Record 'REC-PB-LDH102' belongs to 'usr_farmer_01'
        resp = user_b_client.get('/api/records/REC-PB-LDH102')
        self.assertEqual(resp.status_code, 403)
        data = json.loads(resp.data)
        self.assertEqual(data['code'], 'FORBIDDEN')

        # User A (farmer_01) can access their own record
        resp_owner = self.app.get('/api/records/REC-PB-LDH102')
        self.assertEqual(resp_owner.status_code, 200)
        data_owner = json.loads(resp_owner.data)
        self.assertTrue(data_owner['success'])
        self.assertEqual(data_owner['record']['id'], 'REC-PB-LDH102')

    def test_stage7_input_validation_ml_features(self):
        """Verify malformed/out-of-bounds ML features are rejected with 400."""
        # Test out of bounds rainfall
        payload_bad_rainfall = {
            "crop_type": "Wheat",
            "area": 4.2,
            "rainfall": -100.0
        }
        resp = self.app.post('/api/predict', data=json.dumps(payload_bad_rainfall), content_type='application/json')
        self.assertEqual(resp.status_code, 400)
        self.assertEqual(json.loads(resp.data)['code'], 'INVALID_INPUT')

        # Test out of bounds soil pH
        payload_bad_ph = {
            "crop_type": "Wheat",
            "area": 4.2,
            "soil_ph": 15.0
        }
        resp = self.app.post('/api/predict', data=json.dumps(payload_bad_ph), content_type='application/json')
        self.assertEqual(resp.status_code, 400)
        self.assertEqual(json.loads(resp.data)['code'], 'INVALID_INPUT')

        # Test out of bounds temperature
        payload_bad_temp = {
            "crop_type": "Wheat",
            "area": 4.2,
            "temperature": 150.0
        }
        resp = self.app.post('/api/predict', data=json.dumps(payload_bad_temp), content_type='application/json')
        self.assertEqual(resp.status_code, 400)
        self.assertEqual(json.loads(resp.data)['code'], 'INVALID_INPUT')

    def test_stage7_secrets_not_exposed(self):
        """Verify that server errors and responses never leak filesystem paths or secret keys."""
        resp = self.app.get('/api/health')
        text = resp.data.decode()
        self.assertNotIn('/Users/', text)
        self.assertNotIn('secret', text.lower())

    def test_field_analyze_geojson_valid(self):
        """Verify POST /api/field/analyze processes GeoJSON polygon and returns Sentinel-2 analysis."""
        payload = {
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [75.8510, 30.9150],
                        [75.8690, 30.9150],
                        [75.8720, 30.8975],
                        [75.8480, 30.8975],
                        [75.8510, 30.9150]
                    ]
                ]
            },
            "crop_type": "Paddy",
            "location_name": "Ludhiana, Punjab"
        }
        resp = self.app.post('/api/field/analyze', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.data)
        self.assertTrue(data['success'])
        self.assertEqual(data['label'], 'Demo Satellite Analysis')
        self.assertEqual(data['crop'], 'Paddy')
        self.assertIn('area', data)
        self.assertGreater(data['area']['acres'], 0)
        self.assertGreater(data['area']['hectares'], 0)
        self.assertEqual(data['vegetation_index']['ndvi'], 0.68)
        self.assertEqual(data['analysis_confidence'], 'Prototype Estimate')
        self.assertGreater(data['estimated_residue'], 0)
        self.assertGreater(data['estimated_collection_value'], 0)

    def test_field_analyze_invalid_polygon(self):
        """Verify POST /api/field/analyze rejects polygons with fewer than 3 points."""
        payload = {
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[75.85, 30.91], [75.86, 30.91]]]
            }
        }
        resp = self.app.post('/api/field/analyze', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(resp.status_code, 400)
        data = json.loads(resp.data)
        self.assertFalse(data['success'])
        self.assertEqual(data['code'], 'INVALID_POLYGON')

    def test_field_analyze_out_of_bounds(self):
        """Verify POST /api/field/analyze rejects coordinates out of range."""
        payload = {
            "coordinates": [[195.0, 30.0], [75.0, 30.0], [75.0, 31.0]]
        }
        resp = self.app.post('/api/field/analyze', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(resp.status_code, 400)
        data = json.loads(resp.data)
        self.assertFalse(data['success'])
        self.assertEqual(data['code'], 'OUT_OF_BOUNDS')

if __name__ == '__main__':
    unittest.main()

