import os
import logging
import joblib
import pandas as pd

logger = logging.getLogger(__name__)

MODEL_PATH = os.path.join(os.path.dirname(__file__), "residue_model.pkl")

# Exact features in required order matching train.py
REQUIRED_FEATURES = [
    "crop_type",
    "area",
    "rainfall",
    "soil_ph",
    "yield",
    "temperature"
]

ALLOWED_CROPS = ["Wheat", "Rice", "Maize"]

# Module-level model cache to avoid reloading from disk on every prediction
_cached_model = None

def get_model(model_path: str = MODEL_PATH):
    """
    Loads and caches the existing trained ML model pipeline.
    Does NOT retrain the model.
    """
    global _cached_model
    if _cached_model is not None:
        return _cached_model

    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model artifact not found at '{model_path}'")

    try:
        _cached_model = joblib.load(model_path)
        return _cached_model
    except Exception as e:
        raise RuntimeError(f"Failed to load trained model: {str(e)}")

def validate_features(features: dict) -> dict:
    """
    Validates input features against exact model expectations:
    - Presence of all required features
    - Valid crop_type category
    - Numeric types and reasonable ranges
    """
    if not isinstance(features, dict):
        raise TypeError("Features must be provided as a dictionary")

    # Check for missing features
    missing = [f for f in REQUIRED_FEATURES if f not in features or features[f] is None]
    if missing:
        raise ValueError(f"Missing required feature(s): {', '.join(missing)}")

    # Validate crop_type
    crop_type = str(features["crop_type"]).strip()
    if crop_type not in ALLOWED_CROPS:
        raise ValueError(
            f"Unsupported crop_type '{crop_type}'. Model only accepts: {', '.join(ALLOWED_CROPS)}"
        )

    # Validate numeric features
    validated = {"crop_type": crop_type}
    numeric_specs = {
        "area": (0.01, 100000.0, "Field area"),
        "rainfall": (0.0, 5000.0, "Annual rainfall (mm)"),
        "soil_ph": (1.0, 14.0, "Soil pH"),
        "yield": (0.1, 50.0, "Crop yield (tonnes/ha)"),
        "temperature": (-50.0, 60.0, "Mean temperature (°C)")
    }

    for feat, (min_val, max_val, label) in numeric_specs.items():
        try:
            val = float(features[feat])
            if not (min_val <= val <= max_val):
                raise ValueError(f"{label} ({feat}={val}) is out of reasonable range [{min_val}, {max_val}]")
            validated[feat] = val
        except (ValueError, TypeError) as e:
            if "out of reasonable range" in str(e):
                raise
            raise TypeError(f"Feature '{feat}' must be a valid numeric value, got '{features[feat]}'")

    return validated

def predict_residue(features: dict, model_path: str = MODEL_PATH) -> dict:
    """
    Executes inference using the existing trained RandomForestRegressor pipeline.
    
    Parameters:
        features (dict): Dictionary with keys ['crop_type', 'area', 'rainfall', 'soil_ph', 'yield', 'temperature']
        model_path (str): Optional path to model artifact (defaults to residue_model.pkl)
        
    Returns:
        dict: Structured prediction with label 'PREDICTED BIOMASS', unit 'tonnes', and metadata.
    """
    validated = validate_features(features)
    model = get_model(model_path)

    # Construct DataFrame with exact column names in exact order
    df = pd.DataFrame([validated])[REQUIRED_FEATURES]

    try:
        raw_pred = model.predict(df)
        predicted_tonnes = round(float(raw_pred[0]), 2)
    except Exception as e:
        raise RuntimeError(f"Prediction execution failed: {str(e)}")

    return {
        "prediction": max(0.0, predicted_tonnes),
        "unit": "tonnes",
        "target": "residue",
        "label": "PREDICTED BIOMASS",
        "model": "RandomForestRegressor (Pipeline)",
        "version": "1.0.0",
        "features": validated,
        "reliability": {
            "status": "Prototype Estimate",
            "note": "Predicted using trained RandomForestRegressor pipeline with OneHotEncoder on regional agro-climatic dataset"
        }
    }

if __name__ == "__main__":
    # Quick standalone test
    sample = {
        "crop_type": "Wheat",
        "area": 4.2,
        "rainfall": 739.9,
        "soil_ph": 7.2,
        "yield": 4.2,
        "temperature": 22.6
    }
    print("Testing prediction:")
    result = predict_residue(sample)
    print(result)
