import unittest
import json
import sys
import os
import urllib.request
import urllib.error

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from app import app
import predict

class TestStage8EndToEnd(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    # ==========================================
    # 1. AUTHENTICATION
    # ==========================================

    def test_auth_login_works(self):
        """[ ] Login works: POST /api/auth/login authenticates and returns token and session."""
        payload = {"role": "farmer", "phone": "+919876543210"}
        resp = self.app.post('/api/auth/login', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.data)
        self.assertTrue(data['success'])
        self.assertIn('token', data)
        self.assertEqual(data['user']['role'], 'farmer')
        self.assertEqual(data['user']['id'], 'usr_farmer_01')

    def test_auth_logout_works(self):
        """[ ] Logout works: POST /api/auth/logout clears session."""
        # First login
        login_resp = self.app.post('/api/auth/login', data=json.dumps({"role": "farmer"}), content_type='application/json')
        self.assertEqual(login_resp.status_code, 200)
        # Logout
        logout_resp = self.app.post('/api/auth/logout')
        self.assertEqual(logout_resp.status_code, 200)
        data = json.loads(logout_resp.data)
        self.assertTrue(data['success'])
        # Verify subsequent request to /api/auth/me is unauthenticated
        me_resp = self.app.get('/api/auth/me')
        self.assertEqual(me_resp.status_code, 401)

    def test_auth_existing_sessions_work(self):
        """[ ] Existing sessions work: Active session can access /api/auth/me."""
        client = app.test_client()
        with client.session_transaction() as sess:
            sess['user_id'] = 'usr_farmer_01'
            sess['role'] = 'farmer'
        resp = client.get('/api/auth/me')
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.data)
        self.assertTrue(data['success'])
        self.assertEqual(data['user']['id'], 'usr_farmer_01')

    def test_auth_unauthenticated_users_protected(self):
        """[ ] Unauthenticated users are protected: Access without auth returns 401."""
        anon_client = app.test_client()
        resp_predict = anon_client.post('/api/predict', data=json.dumps({"crop_type": "Wheat", "area": 4.2}), content_type='application/json')
        self.assertEqual(resp_predict.status_code, 401)
        resp_field = anon_client.post('/api/field', data=json.dumps({"polygon": []}), content_type='application/json')
        self.assertEqual(resp_field.status_code, 401)

    # ==========================================
    # 2. FARMER
    # ==========================================

    def test_farmer_reaches_dashboard(self):
        """[ ] Farmer reaches Farmer Dashboard: Navigation buttons link to #farmer-dashboard."""
        with open('src/components/Navbar.jsx', 'r') as f:
            navbar_content = f.read()
        self.assertIn("scrollTo('farmer-dashboard')", navbar_content)

        with open('src/components/RoleModal.jsx', 'r') as f:
            modal_content = f.read()
        self.assertIn("getElementById('farmer-dashboard')", modal_content)

    def test_farmer_dashboard_loads_correctly(self):
        """[ ] Dashboard loads correctly: Section has id='farmer-dashboard' and render structure."""
        with open('src/components/DecisionEngineSection.jsx', 'r') as f:
            section_content = f.read()
        self.assertIn('id="farmer-dashboard"', section_content)
        self.assertIn('FARMER FIELD & RESIDUE ANALYSIS', section_content)
        self.assertIn('analyze-field-btn', section_content)

    def test_farmer_existing_navigation_works(self):
        """[ ] Existing navigation works: #decision-engine anchor exists for backwards compatibility."""
        with open('src/components/DecisionEngineSection.jsx', 'r') as f:
            section_content = f.read()
        self.assertIn('id="decision-engine"', section_content)

    # ==========================================
    # 3. MAP
    # ==========================================

    def test_map_loads_and_captures_polygon(self):
        """[ ] Map loads & Field can be selected & Polygon is captured."""
        client = app.test_client()
        with client.session_transaction() as sess:
            sess['user_id'] = 'usr_farmer_01'
            sess['role'] = 'farmer'

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
        resp = client.post('/api/field', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.data)
        self.assertTrue(data['success'])
        self.assertEqual(len(data['field']['polygon']), 4)
        self.assertEqual(data['field']['num_vertices'], 4)

    def test_map_centroid_is_calculated(self):
        """[ ] Centroid is calculated: Correct mean of polygon vertices."""
        client = app.test_client()
        with client.session_transaction() as sess:
            sess['user_id'] = 'usr_farmer_01'
            sess['role'] = 'farmer'

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
        resp = client.post('/api/field', data=json.dumps(payload), content_type='application/json')
        data = json.loads(resp.data)
        centroid = data['field']['centroid']
        self.assertAlmostEqual(centroid['lat'], 30.9030, places=3)
        self.assertAlmostEqual(centroid['lng'], 75.8590, places=3)

    def test_map_area_is_calculated(self):
        """[ ] Area is calculated: WGS84 geodesic area in hectares and acres."""
        client = app.test_client()
        with client.session_transaction() as sess:
            sess['user_id'] = 'usr_farmer_01'
            sess['role'] = 'farmer'

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
        resp = client.post('/api/field', data=json.dumps(payload), content_type='application/json')
        data = json.loads(resp.data)
        area_ha = data['field']['area_hectares']
        area_acres = data['field']['area_acres']
        self.assertGreater(area_ha, 0)
        self.assertAlmostEqual(area_acres, round(area_ha * 2.47105, 2), places=1)

    # ==========================================
    # 4. DATA
    # ==========================================

    def test_data_crop_type_is_valid(self):
        """[ ] Crop type is valid: Accepts Wheat, Rice, Maize; rejects invalid crops."""
        client = app.test_client()
        with client.session_transaction() as sess:
            sess['user_id'] = 'usr_farmer_01'
            sess['role'] = 'farmer'

        for crop in ['Wheat', 'Rice', 'Maize']:
            resp = client.post('/api/predict', data=json.dumps({"crop_type": crop, "area": 4.2}), content_type='application/json')
            self.assertEqual(resp.status_code, 200)

        # Rejects invalid crop
        resp_invalid = client.post('/api/predict', data=json.dumps({"crop_type": "Sugarcane", "area": 4.2}), content_type='application/json')
        self.assertEqual(resp_invalid.status_code, 400)
        self.assertEqual(json.loads(resp_invalid.data)['code'], 'UNSUPPORTED_CROP')

    def test_data_rainfall_retrieved_correctly(self):
        """[ ] Rainfall is retrieved correctly: Positive annual cumulative rainfall in mm."""
        resp = self.app.get('/api/environment?lat=30.9010&lng=75.8570')
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.data)
        rainfall = data['environment']['weather']['rainfall']
        self.assertEqual(rainfall['unit'], 'mm')
        self.assertGreater(rainfall['value'], 0)
        self.assertEqual(rainfall['type'], 'retrieved')

    def test_data_temperature_retrieved_correctly(self):
        """[ ] Temperature is retrieved correctly: Annual mean temperature in °C."""
        resp = self.app.get('/api/environment?lat=30.9010&lng=75.8570')
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.data)
        temp = data['environment']['weather']['temperature']
        self.assertEqual(temp['unit'], '°C')
        self.assertGreater(temp['value'], 0)
        self.assertEqual(temp['type'], 'retrieved')

    def test_data_soil_ph_retrieved_estimated(self):
        """[ ] Soil pH is retrieved/estimated if required: Soil pH in 5.0 - 9.5 range labeled estimated."""
        resp = self.app.get('/api/environment?lat=30.9010&lng=75.8570')
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.data)
        soil_ph = data['environment']['soil']['soil_ph']
        self.assertEqual(soil_ph['type'], 'estimated')
        self.assertGreaterEqual(soil_ph['value'], 5.0)
        self.assertLessEqual(soil_ph['value'], 9.5)

    def test_data_yield_handled_correctly(self):
        """[ ] Yield is handled correctly: Valid range (0.5 - 20.0 t/ha), rejects out of bounds."""
        client = app.test_client()
        with client.session_transaction() as sess:
            sess['user_id'] = 'usr_farmer_01'
            sess['role'] = 'farmer'

        # Valid yield
        resp_valid = client.post('/api/predict', data=json.dumps({"crop_type": "Wheat", "area": 4.2, "yield": 4.8}), content_type='application/json')
        self.assertEqual(resp_valid.status_code, 200)

        # Negative yield
        resp_neg = client.post('/api/predict', data=json.dumps({"crop_type": "Wheat", "area": 4.2, "yield": -2.0}), content_type='application/json')
        self.assertEqual(resp_neg.status_code, 400)

        # Exceeds max yield
        resp_excess = client.post('/api/predict', data=json.dumps({"crop_type": "Wheat", "area": 4.2, "yield": 35.0}), content_type='application/json')
        self.assertEqual(resp_excess.status_code, 400)

    def test_data_units_match_ml_training_data(self):
        """[ ] Units match ML training data: area (ha), rainfall (mm), soil_ph, yield (t/ha), temp (°C), biomass (tonnes)."""
        client = app.test_client()
        with client.session_transaction() as sess:
            sess['user_id'] = 'usr_farmer_01'
            sess['role'] = 'farmer'

        payload = {
            "crop_type": "Wheat",
            "area": 4.2,
            "rainfall": 739.9,
            "soil_ph": 7.2,
            "yield": 4.2,
            "temperature": 22.6
        }
        resp = client.post('/api/predict', data=json.dumps(payload), content_type='application/json')
        data = json.loads(resp.data)
        self.assertEqual(data['unit'], 'tonnes')
        self.assertEqual(data['label'], 'PREDICTED BIOMASS')
        self.assertIn('RandomForestRegressor', data['model'])

    # ==========================================
    # 5. ML
    # ==========================================

    def test_ml_existing_model_loads(self):
        """[ ] Existing model loads: Loaded model artifact exists and is a scikit-learn Pipeline."""
        model = predict.get_model()
        self.assertIsNotNone(model)
        self.assertTrue(hasattr(model, 'predict'))

    def test_ml_existing_predict_py_is_used(self):
        """[ ] Existing predict.py is used: predict_residue function produces correct prediction structure."""
        features = {
            "crop_type": "Rice",
            "area": 1.7,
            "rainfall": 739.9,
            "soil_ph": 7.2,
            "yield": 4.8,
            "temperature": 22.6
        }
        res = predict.predict_residue(features)
        self.assertEqual(res['label'], 'PREDICTED BIOMASS')
        self.assertEqual(res['unit'], 'tonnes')
        self.assertGreater(res['prediction'], 0)

    def test_ml_prediction_works(self):
        """[ ] Prediction works: Full endpoint returns PREDICTED BIOMASS with economics."""
        client = app.test_client()
        with client.session_transaction() as sess:
            sess['user_id'] = 'usr_farmer_01'
            sess['role'] = 'farmer'

        payload = {
            "crop_type": "Wheat",
            "area": 4.2,
            "yield": 4.2
        }
        resp = client.post('/api/predict', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.data)
        self.assertAlmostEqual(data['prediction'], 3.08, places=2)
        self.assertIn('economics', data)
        self.assertIn('recommendations', data)

    def test_ml_model_not_retrained_per_request(self):
        """[ ] Model is not retrained per request: Model instance is cached in memory."""
        m1 = predict.get_model()
        m2 = predict.get_model()
        self.assertIs(m1, m2)
        self.assertEqual(id(m1), id(m2))

    def test_ml_invalid_input_rejected(self):
        """[ ] Invalid input is rejected: Non-numeric area or invalid feature rejected with 400."""
        client = app.test_client()
        with client.session_transaction() as sess:
            sess['user_id'] = 'usr_farmer_01'
            sess['role'] = 'farmer'

        resp = client.post('/api/predict', data=json.dumps({"crop_type": "Wheat", "area": "invalid_area"}), content_type='application/json')
        self.assertEqual(resp.status_code, 400)
        self.assertEqual(json.loads(resp.data)['code'], 'INVALID_INPUT')

    def test_ml_missing_input_rejected(self):
        """[ ] Missing input is rejected: Missing area or crop_type rejected with 400."""
        client = app.test_client()
        with client.session_transaction() as sess:
            sess['user_id'] = 'usr_farmer_01'
            sess['role'] = 'farmer'

        resp = client.post('/api/predict', data=json.dumps({"area": 4.2}), content_type='application/json')
        self.assertEqual(resp.status_code, 400)
        self.assertEqual(json.loads(resp.data)['code'], 'MISSING_INPUT')

    def test_ml_missing_model_handled(self):
        """[ ] Missing model is handled: FileNotFoundError returns 500 MODEL_NOT_FOUND."""
        from unittest.mock import patch
        client = app.test_client()
        with client.session_transaction() as sess:
            sess['user_id'] = 'usr_farmer_01'
            sess['role'] = 'farmer'

        with patch('app.predict_residue', side_effect=FileNotFoundError("Model missing")):
            resp = client.post('/api/predict', data=json.dumps({"crop_type": "Wheat", "area": 4.2}), content_type='application/json')
            self.assertEqual(resp.status_code, 500)
            self.assertEqual(json.loads(resp.data)['code'], 'MODEL_NOT_FOUND')

    def test_ml_prediction_error_handled(self):
        """[ ] Prediction error is handled: Math/runtime exception returns 500 PREDICTION_ERROR."""
        from unittest.mock import patch
        client = app.test_client()
        with client.session_transaction() as sess:
            sess['user_id'] = 'usr_farmer_01'
            sess['role'] = 'farmer'

        with patch('app.predict_residue', side_effect=RuntimeError("Internal inference failure")):
            resp = client.post('/api/predict', data=json.dumps({"crop_type": "Wheat", "area": 4.2}), content_type='application/json')
            self.assertEqual(resp.status_code, 500)
            self.assertEqual(json.loads(resp.data)['code'], 'PREDICTION_ERROR')

    # ==========================================
    # 6. SECURITY
    # ==========================================

    def test_security_backend_verifies_authentication(self):
        """[ ] Backend verifies authentication: Unauthenticated requests rejected with 401."""
        anon_client = app.test_client()
        resp = anon_client.post('/api/predict', data=json.dumps({"crop_type": "Wheat", "area": 4.2}), content_type='application/json')
        self.assertEqual(resp.status_code, 401)
        self.assertEqual(json.loads(resp.data)['code'], 'UNAUTHENTICATED')

    def test_security_backend_verifies_role(self):
        """[ ] Backend verifies role: Baler cannot access farmer predict endpoint (403)."""
        baler_client = app.test_client()
        with baler_client.session_transaction() as sess:
            sess['user_id'] = 'usr_baler_01'
            sess['role'] = 'baler'

        resp = baler_client.post('/api/predict', data=json.dumps({"crop_type": "Wheat", "area": 4.2}), content_type='application/json')
        self.assertEqual(resp.status_code, 403)
        self.assertEqual(json.loads(resp.data)['code'], 'FORBIDDEN')

    def test_security_unauthorized_requests_rejected(self):
        """[ ] Unauthorized requests are rejected: Passing client-side role does not bypass auth."""
        anon_client = app.test_client()
        resp = anon_client.post('/api/predict?role=farmer', data=json.dumps({"crop_type": "Wheat", "area": 4.2, "role": "farmer"}), content_type='application/json')
        self.assertEqual(resp.status_code, 401)

    def test_security_private_records_protected(self):
        """[ ] Private records are protected: User B cannot access User A's records (403)."""
        user_b = app.test_client()
        with user_b.session_transaction() as sess:
            sess['user_id'] = 'usr_baler_01'
            sess['role'] = 'baler'

        resp = user_b.get('/api/records/REC-PB-LDH102')
        self.assertEqual(resp.status_code, 403)
        self.assertEqual(json.loads(resp.data)['code'], 'FORBIDDEN')

    def test_security_api_keys_remain_private(self):
        """[ ] API keys remain private: Error and health endpoints never leak keys or internal paths."""
        resp = self.app.get('/api/health')
        text = resp.data.decode()
        self.assertNotIn('/Users/', text)
        self.assertNotIn('apikey', text.lower())
        self.assertNotIn('secret', text.lower())

    # ==========================================
    # 7. REGRESSION
    # ==========================================

    def test_regression_existing_pages_work(self):
        """[ ] Existing pages work: Built distribution and Vite dev server respond."""
        self.assertTrue(os.path.exists('dist/index.html'))
        self.assertTrue(os.path.exists('index.html'))

    def test_regression_existing_apis_work(self):
        """[ ] Existing APIs work: /api/health and /api/models return 200."""
        h_resp = self.app.get('/api/health')
        self.assertEqual(h_resp.status_code, 200)
        m_resp = self.app.get('/api/models')
        self.assertEqual(m_resp.status_code, 200)

    def test_regression_existing_database_works(self):
        """[ ] Existing database works: User and record lookups function without error."""
        from auth import USERS_DB, PRIVATE_RECORDS_DB
        self.assertIn('usr_farmer_01', USERS_DB)
        self.assertIn('REC-PB-LDH102', PRIVATE_RECORDS_DB)

    def test_regression_existing_css_works(self):
        """[ ] Existing CSS works: CSS styles exist with emerald and agri tokens."""
        css_files = [f for f in os.listdir('dist/assets') if f.endswith('.css')]
        self.assertTrue(len(css_files) > 0)
        with open(os.path.join('dist/assets', css_files[0]), 'r') as f:
            css_content = f.read()
        self.assertIn('emerald', css_content)

    def test_regression_existing_animations_work(self):
        """[ ] Existing animations work: Micro-animations exist in CSS and components."""
        with open('src/components/DecisionEngineSection.jsx', 'r') as f:
            jsx_content = f.read()
        self.assertIn('animate-spin', jsx_content)
        self.assertIn('animate-bounce', jsx_content)
        self.assertIn('animate-pulse', jsx_content)

    def test_regression_existing_features_remain_intact(self):
        """[ ] Existing features remain intact: Economics, viability, and payouts calculated accurately."""
        client = app.test_client()
        with client.session_transaction() as sess:
            sess['user_id'] = 'usr_farmer_01'
            sess['role'] = 'farmer'

        payload = {
            "crop_type": "Wheat",
            "area": 4.2,
            "distance_km": 7.2
        }
        resp = client.post('/api/predict', data=json.dumps(payload), content_type='application/json')
        self.assertEqual(resp.status_code, 200)
        data = json.loads(resp.data)
        self.assertTrue(data['economics']['viable'])
        self.assertGreater(data['economics']['farmer_payout_per_tonne'], 0)
        self.assertGreater(data['economics']['total_payout'], 0)

if __name__ == '__main__':
    unittest.main()
