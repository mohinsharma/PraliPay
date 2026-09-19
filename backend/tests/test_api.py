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
            "area_acres": 4.2,
            "distance_km": 7.2,
            "crop": "Paddy Straw"
        }
        response = self.app.post(
            '/api/predict',
            data=json.dumps(payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertTrue(data['success'])
        self.assertEqual(data['unit'], 'tonnes')
        self.assertGreater(data['prediction'], 0)
        self.assertIn('model', data)
        self.assertIn('reliability', data)
        self.assertIn('recommendations', data)
        self.assertIn('economics', data)

    def test_predict_missing_area(self):
        payload = {
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
        self.assertEqual(data['code'], 'MISSING_FIELD')

    def test_predict_invalid_numeric(self):
        payload = {
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
        self.assertEqual(data['code'], 'INVALID_NUMERIC')

    def test_predict_out_of_bounds(self):
        payload = {
            "area_acres": -5.0,
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
        self.assertEqual(data['code'], 'OUT_OF_BOUNDS')

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

if __name__ == '__main__':
    unittest.main()
