import os
import json
import mysql.connector
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

app = Flask(__name__)
CORS(app)

# Database Connection Helper
def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        port=int(os.getenv("DB_PORT", 3306))
    )

# --- AUTH ROUTES ---

@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not all([name, email, password]):
        return jsonify({"error": "Todos os campos são obrigatórios"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        # Check if user exists
        cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            return jsonify({"error": "Este e-mail já está cadastrado"}), 400
        
        # Insert user
        cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", (name, email, password))
        conn.commit()
        
        user_id = cursor.lastrowid
        
        cursor.close()
        conn.close()
        
        return jsonify({"id": user_id, "name": name, "email": email}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("SELECT id, name, email FROM users WHERE email = %s AND password = %s", (email, password))
        user = cursor.fetchone()
        
        cursor.close()
        conn.close()
        
        if user:
            return jsonify(user), 200
        else:
            return jsonify({"error": "Credenciais inválidas"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- PROFILE ROUTES ---

@app.route("/api/profile/<int:user_id>", methods=["GET"])
def get_profile(user_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        # Get basic profile
        cursor.execute("SELECT * FROM profiles WHERE user_id = %s", (user_id,))
        profile = cursor.fetchone() or {}
        
        # Get education
        cursor.execute("SELECT id, institution, degree, year FROM education WHERE user_id = %s", (user_id,))
        profile["education"] = cursor.fetchall()
        
        # Get experience
        cursor.execute("SELECT id, company, role, period FROM experience WHERE user_id = %s", (user_id,))
        profile["experience"] = cursor.fetchall()
        
        # Get skills
        cursor.execute("SELECT skill_name FROM skills WHERE user_id = %s", (user_id,))
        profile["skills"] = [s["skill_name"] for s in cursor.fetchall()]
        
        cursor.close()
        conn.close()
        
        return jsonify(profile), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/profile", methods=["POST"])
def save_profile():
    data = request.json
    user_id = data.get("userId")
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Update/Insert Profile
        cursor.execute("""
            INSERT INTO profiles (user_id, phone, city, state, birth_date, bio)
            VALUES (%s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE
            phone=VALUES(phone), city=VALUES(city), state=VALUES(state), 
            birth_date=VALUES(birth_date), bio=VALUES(bio)
        """, (user_id, data.get("phone"), data.get("city"), data.get("state"), data.get("birthDate"), data.get("bio")))
        
        # Clear and Insert Education
        cursor.execute("DELETE FROM education WHERE user_id = %s", (user_id,))
        for edu in data.get("education", []):
            cursor.execute("INSERT INTO education (user_id, institution, degree, year) VALUES (%s, %s, %s, %s)",
                           (user_id, edu.get("institution"), edu.get("degree"), edu.get("year")))
            
        # Clear and Insert Experience
        cursor.execute("DELETE FROM experience WHERE user_id = %s", (user_id,))
        for exp in data.get("experience", []):
            cursor.execute("INSERT INTO experience (user_id, company, role, period) VALUES (%s, %s, %s, %s)",
                           (user_id, exp.get("company"), exp.get("role"), exp.get("period")))
            
        # Clear and Insert Skills
        cursor.execute("DELETE FROM skills WHERE user_id = %s", (user_id,))
        for skill in data.get("skills", []):
            cursor.execute("INSERT INTO skills (user_id, skill_name) VALUES (%s, %s)", (user_id, skill))
            
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({"message": "Perfil salvo com sucesso"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- ANALYSIS ROUTE ---

@app.route("/api/analyze", methods=["POST"])
def analyze():
    data = request.json
    responses = data.get("responses")
    
    if not responses:
        return jsonify({"error": "Respostas não fornecidas"}), 400
        
    try:
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        model = genai.GenerativeModel('gemini-3-flash-preview')
        
        prompt = f"""
        Analise as seguintes respostas de um teste vocacional para uma pessoa com TEA (Transtorno do Espectro Autista).
        Respostas: {json.dumps(responses)}
        
        Retorne um JSON com a seguinte estrutura:
        [
          {{ "name": "Nome da Área", "percentage": 0-100, "description": "Explicação curta" }}
        ]
        Priorize as áreas: Manual e Técnico, Administração, Design, Ciência, Tecnologia, Escrita.
        """
        
        response = model.generate_content(prompt)
        # Extract JSON from response.text
        text = response.text
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0]
        elif "```" in text:
            text = text.split("```")[1].split("```")[0]
            
        results = json.loads(text.strip())
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=3000)
