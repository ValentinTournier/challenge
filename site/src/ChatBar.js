import React, { useState, useEffect, useRef } from 'react';

function ChatBar() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (input) {
      // Ajoute le message utilisateur à la liste
      setMessages([...messages, { user: "Vous", text: input }]);

      // Envoie une requête au serveur Flask
      try {
        const response = await fetch('http://127.0.0.1:5000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input }),
        });

        const data = await response.json();
        // Ajoute la réponse du serveur Flask
        setMessages((msgs) => [...msgs, { user: "Chatbot", text: data.response }]);
      } catch (error) {
        console.error("Erreur lors de la communication avec le serveur :", error);
        // Ajoute un message d'erreur si la requête échoue
        setMessages((msgs) => [...msgs, { user: "Chatbot", text: "Erreur lors de la communication avec le serveur." }]);
      }

      // Vide l'input
      setInput('');
    }
  };

    // Fonction pour gérer le défilement automatique
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fonction pour gérer l'envoi via la touche "Entrée"
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-bar">
      <div className="messages">
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.user}:</strong> {msg.text}</p>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Écrivez un message..."
      />
      <button onClick={handleSend}>Envoyer</button>
    </div>
  );
}

export default ChatBar;