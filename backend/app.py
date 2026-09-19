import os
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint confirming API service status."""
    return jsonify({
        "status": "healthy",
        "service": "ParaliPay Biomass & Agricultural Intelligence API",
        "version": "1.0.0",
        "python_version": sys.version.split()[0]
    }), 200

@app.route('/api/models', methods=['GET'])
def get_models():
    """Returns available models and their current status."""
    return jsonify({
        "models": [
            {
                "name": "Baseline Punjab Residue Estimator",
                "version": "1.0.0",
                "status": "active",
                "type": "Domain Baseline",
                "target": "biomass_tonnes"
            }
        ]
    }), 200

@app.route('/api/predict', methods=['POST'])
def predict():
    """
    Prediction endpoint following the required contract.
    Accepts JSON with agricultural parameters and returns structured predictions.
    """
    if not request.is_json:
        return jsonify({
            "success": False,
            "error": "Request body must be valid JSON",
            "code": "INVALID_JSON"
        }), 400

    data = request.get_json()
    if not data:
        return jsonify({
            "success": False,
            "error": "Request payload is empty",
            "code": "EMPTY_PAYLOAD"
        }), 400

    # Input validation
    area = data.get('area_acres')
    distance = data.get('distance_km', 7.2)
    crop = data.get('crop', 'Paddy Straw')

    # Validate area
    if area is None:
        return jsonify({
            "success": False,
            "error": "Missing required field: 'area_acres'",
            "code": "MISSING_FIELD"
        }), 400

    try:
        area = float(area)
        if area <= 0 or area > 10000:
            return jsonify({
                "success": False,
                "error": "'area_acres' must be a positive number between 0.1 and 10,000",
                "code": "OUT_OF_BOUNDS"
            }), 400
    except (ValueError, TypeError):
        return jsonify({
            "success": False,
            "error": "'area_acres' must be a valid numeric value",
            "code": "INVALID_NUMERIC"
        }), 400

    # Validate distance
    try:
        distance = float(distance)
        if distance < 0 or distance > 500:
            return jsonify({
                "success": False,
                "error": "'distance_km' must be between 0 and 500 km",
                "code": "OUT_OF_BOUNDS"
            }), 400
    except (ValueError, TypeError):
        return jsonify({
            "success": False,
            "error": "'distance_km' must be a valid numeric value",
            "code": "INVALID_NUMERIC"
        }), 400

    # Baseline domain calculation for Punjab paddy residue (approx 1.24 tonnes/acre)
    # Target: field residue in tonnes
    estimated_residue = round(area * 1.238, 2)

    # Economic viability assessment
    plant_offer_per_tonne = 5000.0
    logistics_per_tonne = round(850.0 + distance * 69.44, 2)
    farmer_payout_per_tonne = max(2200.0, plant_offer_per_tonne - logistics_per_tonne - 800.0)
    total_farmer_payout = round(estimated_residue * farmer_payout_per_tonne, 2)

    is_viable = distance <= 20.0 and estimated_residue >= 3.0
    is_marginal = not is_viable and (distance <= 28.0 and estimated_residue >= 2.0)

    recommendations = []
    if is_viable:
        recommendations.append("Field residue meets volume threshold for direct bio-CNG plant collection contract.")
        recommendations.append(f"Recommended net farmer floor payout: ₹{total_farmer_payout:,.2f}.")
    elif is_marginal:
        recommendations.append("Pair with adjacent fields in cluster to amortize baler mobilization overhead.")
    else:
        recommendations.append("Haul distance exceeds economic viability threshold for standalone collection.")

    warnings = []
    if distance > 30:
        warnings.append("High transport distance may impact operational margin.")

    return jsonify({
        "success": True,
        "prediction": estimated_residue,
        "unit": "tonnes",
        "model": "Baseline Punjab Residue Estimator",
        "model_version": "1.0.0",
        "metrics": {},
        "reliability": {
            "status": "Baseline",
            "note": "Standard Punjab agro-climatic baseline for paddy straw (~1.24 t/acre)"
        },
        "economics": {
            "viable": is_viable,
            "marginal": is_marginal,
            "logistics_cost_per_tonne": logistics_per_tonne,
            "farmer_payout_per_tonne": farmer_payout_per_tonne,
            "total_payout": total_farmer_payout
        },
        "feature_contributions": [
            {"feature": "area_acres", "importance": 0.82},
            {"feature": "distance_km", "importance": 0.18}
        ],
        "recommendations": recommendations,
        "warnings": warnings
    }), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='127.0.0.1', port=port, debug=True)
