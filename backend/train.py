import pandas as pd
import joblib

from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor


# Load data
df = pd.read_csv("dataset.csv")

# Inputs
X = df[
    [
        "crop_type",
        "area",
        "rainfall",
        "soil_ph",
        "yield",
        "temperature"
    ]
]

# What we want to predict
y = df["residue"]


# Convert crop names into numbers
preprocessor = ColumnTransformer([
    (
        "crop",
        OneHotEncoder(handle_unknown="ignore"),
        ["crop_type"]
    )
], remainder="passthrough")


# Create ML model
model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)


# Combine preprocessing + model
pipeline = Pipeline([
    ("preprocessor", preprocessor),
    ("model", model)
])


# TRAIN
pipeline.fit(X, y)

print("Model trained successfully!")


# Save model
joblib.dump(pipeline, "residue_model.pkl")

print("Model saved as residue_model.pkl")