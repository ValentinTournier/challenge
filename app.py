from flask import Flask, request, jsonify
from Chatbot.Query_pipeline import chat

app = Flask(__name__)

@app.route('/chat', methods=['POST'])
def chatrequest():
    # Récupère le message de la requête
    user_message = request.json.get('message')

    # Logique simple pour générer une réponse (tu peux utiliser ta logique plus complexe ici)
    response_message = chat(user_message)

    return jsonify({"response": response_message})

if __name__ == '__main__':
    app.run(debug=True)