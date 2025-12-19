from flask import Flask, jsonify, request
import datetime

app = Flask(__name__)

# --- Mock Data (In-Memory Database) ---
# NOTE: This data resets every time the serverless function restarts (which is often).
# Ideally, replace this with a connection to a real database (e.g., PostgreSQL, MongoDB).

gallery_images = [
    {
        "id": 1,
        "title": "October 4 Ceremony",
        "url": "Images/graces.jpg",
        "date": "2025-10-04",
        "description": "Celebration of the feast."
    },
    {
        "id": 2,
        "title": "Sunday Masses",
        "url": "https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        "date": "2025-12-03",
        "description": "Weekly gathering."
    },
    {
        "id": 3,
        "title": "Night Vigils",
        "url": "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        "date": "2025-12-05",
        "description": "Prayer through the night."
    }
]

videos = [
    {
        "id": 1,
        "title": "Sunday Sermon: The Second school of Advent",
        "url": "https://www.facebook.com/embed/dQw4w9WgXcQ",
        "date": "2025-12-07",
        "description": "Join us for a spiritual journey."
    },
    {
        "id": 2,
        "title": "Weekly Adoration",
        "url": "https://www.facebook.com/embed/hTWKbfoikeg",
        "date": "2025-12-10",
        "description": "Moments of grace and prayer."
    }
]

# Simple hardcoded admin credentials
ADMIN_USERNAME = "chilota745"
ADMIN_PASSWORD_HASH = "admin123" # In a real app, use hashed passwords!

# --- Routes ---

@app.route('/api/gallery', methods=['GET', 'POST'])
def handle_gallery():
    if request.method == 'GET':
        return jsonify(gallery_images)
    
    if request.method == 'POST':
        # Simulating a protected route
        # In a real app, check for a session token or JWT here
        data = request.json
        if not data or 'title' not in data or 'url' not in data:
            return jsonify({"error": "Missing required fields"}), 400
        
        new_image = {
            "id": len(gallery_images) + 1,
            "title": data['title'],
            "url": data['url'],
            "date": data.get('date', datetime.date.today().isoformat()),
            "description": data.get('description', '')
        }
        gallery_images.insert(0, new_image) # Add to top
        return jsonify({"status": "success", "id": new_image['id']}), 201

@app.route('/api/videos', methods=['GET', 'POST'])
def handle_videos():
    if request.method == 'GET':
        return jsonify(videos)

    if request.method == 'POST':
        data = request.json
        if not data or 'title' not in data or 'url' not in data:
            return jsonify({"error": "Missing required fields"}), 400
            
        new_video = {
            "id": len(videos) + 1,
            "title": data['title'],
            "url": data['url'],
            "date": data.get('date', datetime.date.today().isoformat()),
            "description": data.get('description', '')
        }
        videos.insert(0, new_video)
        return jsonify({"status": "success", "id": new_video['id']}), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if username == ADMIN_USERNAME and password == ADMIN_PASSWORD_HASH:
        # success
        # In a real app, issue a JWT token here
        return jsonify({"status": "success", "message": "Login successful", "token": "mock-token-123"})
    else:
        return jsonify({"status": "error", "message": "Invalid credentials"}), 401

@app.route('/api/auth/check', methods=['GET'])
def check_auth():
    # Mock check - always returns logged out unless we implement client-side token storage check
    # For this demo, we'll just say 'loggedout' to be safe, or 'loggedin' if a header is present
    return jsonify({"status": "loggedout"})

@app.route('/api/auth/logout', methods=['GET', 'POST'])
def logout():
    return jsonify({"status": "success", "message": "Logged out"})

# Vercel requires the app to be exposed as `app`
if __name__ == '__main__':
    app.run(debug=True)
