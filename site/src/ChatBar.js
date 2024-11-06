import React, { useState } from 'react';

function ChatBar() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input) {
      setMessages([...messages, { user: "Vous", text: input }]);
      setInput('');
      // Simulation d'une réponse de chatbot
      setMessages((msgs) => [...msgs, { user: "Chatbot", text: "Je suis ici pour vous aider!" }]);
    }
  };

  return (
    <div className="chat-bar">
      <div className="messages">
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.user}:</strong> {msg.text}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Écrivez un message..."
      />
      <button onClick={handleSend}>Envoyer</button>
    </div>
  );
}

export default ChatBar;
