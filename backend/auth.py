import os
import time
import hmac
import hashlib
import base64
import json
from functools import wraps
from flask import request, session, jsonify, g

SECRET_KEY = os.environ.get('SECRET_KEY', 'paralipay-secure-secret-key-3091')

# Trusted server-side user directory (Simulated database / user store)
USERS_DB = {
    "usr_farmer_01": {
        "id": "usr_farmer_01",
        "username": "farmer_gurpreet",
        "phone": "+919876543210",
        "role": "farmer",
        "name": "Gurpreet Singh",
        "location": "Ludhiana, Punjab"
    },
    "usr_baler_01": {
        "id": "usr_baler_01",
        "username": "baler_manjit",
        "phone": "+919876543211",
        "role": "baler",
        "name": "Manjit Singh (Singh Agri Services)",
        "location": "Ludhiana West, Punjab"
    },
    "usr_plant_01": {
        "id": "usr_plant_01",
        "username": "plant_ludhiana",
        "phone": "+919876543212",
        "role": "plant",
        "name": "Punjab BioEnergy Plant Ltd.",
        "location": "Ludhiana Industrial Cluster, Punjab"
    },
    "usr_admin_01": {
        "id": "usr_admin_01",
        "username": "admin_parali",
        "phone": "+919876543213",
        "role": "admin",
        "name": "System Administrator",
        "location": "Chandigarh, Punjab"
    }
}

# Private records store (field analyses, predictions, contracts)
# Key: record_id, Value: record dict with 'user_id'
PRIVATE_RECORDS_DB = {
    "REC-PB-LDH102": {
        "id": "REC-PB-LDH102",
        "user_id": "usr_farmer_01",
        "field_id": "Field #PB-LDH102",
        "area_hectares": 1.70,
        "crop_type": "Rice",
        "predicted_biomass": 3.08,
        "created_at": "2026-09-20T04:00:00Z"
    },
    "REC-PB-LDH98": {
        "id": "REC-PB-LDH98",
        "user_id": "usr_farmer_01",
        "field_id": "Field #PB-LDH98",
        "area_hectares": 2.10,
        "crop_type": "Wheat",
        "predicted_biomass": 5.20,
        "created_at": "2026-09-20T04:05:00Z"
    }
}

def generate_signed_token(user_id, role, expiry_seconds=86400):
    """
    Generates a tamper-proof cryptographically signed token (HMAC-SHA256).
    Payload: user_id, role, exp
    Format: base64(payload).base64(signature)
    """
    payload = {
        "user_id": user_id,
        "role": role,
        "exp": int(time.time()) + expiry_seconds
    }
    payload_json = json.dumps(payload, separators=(',', ':'))
    payload_b64 = base64.urlsafe_b64encode(payload_json.encode()).decode().rstrip('=')
    
    sig = hmac.new(SECRET_KEY.encode(), payload_b64.encode(), hashlib.sha256).digest()
    sig_b64 = base64.urlsafe_b64encode(sig).decode().rstrip('=')
    
    return f"{payload_b64}.{sig_b64}"

def verify_signed_token(token):
    """
    Verifies the cryptographic signature and expiration of the token.
    Returns payload dict if valid, or None if invalid/expired/tampered.
    """
    if not token or '.' not in token:
        return None
    
    parts = token.split('.')
    if len(parts) != 2:
        return None
    
    payload_b64, sig_b64 = parts
    
    # Verify HMAC signature
    expected_sig = hmac.new(SECRET_KEY.encode(), payload_b64.encode(), hashlib.sha256).digest()
    expected_sig_b64 = base64.urlsafe_b64encode(expected_sig).decode().rstrip('=')
    
    if not hmac.compare_digest(sig_b64, expected_sig_b64):
        return None
    
    # Decode and check expiration
    try:
        padding = '=' * (4 - (len(payload_b64) % 4)) if len(payload_b64) % 4 else ''
        payload_json = base64.urlsafe_b64decode(payload_b64 + padding).decode()
        payload = json.loads(payload_json)
        
        if payload.get('exp', 0) < time.time():
            return None # Expired
            
        return payload
    except Exception:
        return None

def authenticate_user(identifier, credential=None):
    """
    Authenticates a user by username or phone number (or role for quick demo access).
    Returns the user dict if authenticated, or None.
    """
    if not identifier:
        return None
        
    ident_clean = str(identifier).strip().lower()
    
    # 1. Match by username or phone
    for user in USERS_DB.values():
        if user["username"].lower() == ident_clean or user["phone"] == ident_clean:
            return user
            
    # 2. Match by role (e.g. 'farmer', 'baler', 'plant', 'admin' for demo login)
    for user in USERS_DB.values():
        if user["role"].lower() == ident_clean:
            return user
            
    return None

def get_current_user():
    """
    Resolves the authenticated user strictly from server-side trusted mechanisms:
    1. Flask server-side session (signed cookie).
    2. Authorization: Bearer <signed_token> header.
    
    NEVER trusts client-provided parameters (request body, query parameters, or raw headers).
    """
    # Check 1: Server-side Session
    user_id = session.get('user_id')
    if user_id and user_id in USERS_DB:
        return USERS_DB[user_id]
        
    # Check 2: Cryptographic Bearer Token in Authorization header
    auth_header = request.headers.get('Authorization')
    if auth_header and auth_header.startswith('Bearer '):
        token = auth_header[7:].strip()
        token_data = verify_signed_token(token)
        if token_data and token_data.get('user_id') in USERS_DB:
            user = USERS_DB[token_data['user_id']]
            # Ensure the token role matches current database role (prevent privilege escalation)
            if user['role'] == token_data.get('role'):
                return user
                
    return None

def require_auth(allowed_roles=None):
    """
    Decorator to protect Flask endpoints.
    - Rejects unauthenticated requests with 401 UNAUTHENTICATED.
    - If allowed_roles is specified, rejects unauthorized roles with 403 FORBIDDEN.
    - Attaches authenticated user to flask.g.current_user.
    """
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            user = get_current_user()
            if not user:
                return jsonify({
                    "success": False,
                    "error": "Authentication required. Please provide a valid session or Bearer token.",
                    "code": "UNAUTHENTICATED"
                }), 401
                
            if allowed_roles:
                # Normalize allowed_roles list
                roles_list = [r.lower() for r in allowed_roles] if isinstance(allowed_roles, (list, tuple)) else [allowed_roles.lower()]
                user_role = user.get('role', '').lower()
                
                # Admin always has access; otherwise check user_role
                if user_role not in roles_list and user_role != 'admin':
                    return jsonify({
                        "success": False,
                        "error": f"Access forbidden: User with role '{user_role}' is not authorized for this resource.",
                        "code": "FORBIDDEN"
                    }), 403
                    
            g.current_user = user
            return fn(*args, **kwargs)
        return wrapper
    return decorator

def save_user_record(user_id, record_data):
    """Saves a private record associated with the authenticated user."""
    rec_id = record_data.get("id") or f"REC-{int(time.time()*1000)}"
    record_data["id"] = rec_id
    record_data["user_id"] = user_id
    record_data["created_at"] = time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
    PRIVATE_RECORDS_DB[rec_id] = record_data
    return record_data

def get_user_record(user_id, record_id, user_role='farmer'):
    """
    Retrieves a private record.
    Enforces user isolation: Users can only access their own records unless admin.
    """
    record = PRIVATE_RECORDS_DB.get(record_id)
    if not record:
        return None, "RECORD_NOT_FOUND"
        
    if record["user_id"] != user_id and user_role != "admin":
        return None, "FORBIDDEN"
        
    return record, "SUCCESS"
