import React, { useState, useEffect, useRef } from 'react';

function ChatBar() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (input) {
      setMessages([...messages, { user: "Vous", text: input }]);
      setInput('');
      // Simulation d'une réponse de chatbot
      setMessages((msgs) => [...msgs, { user: "Chatbot", text: "Je suis ici pour vous aider!" }]);
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
