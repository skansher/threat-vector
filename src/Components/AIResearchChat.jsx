import React, { useState, useRef, useEffect } from 'react';
import Header from "./Header.jsx";
import "../CSS/chat.css";

const AIResearchChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to detect if response contains profile JSON
  const detectProfileData = (text) => {
    try {
      // Look for JSON pattern in the response
      const jsonMatch = text.match(/\{[\s\S]*?"primary_name"[\s\S]*?\}/);
      if (jsonMatch) {
        const cleaned = jsonMatch[0]
          .replace(/```json/g, '')
          .replace(/```/g, '')
          .trim();
        const profileData = JSON.parse(cleaned);
        return profileData;
      }
      
      // Also check for array format
      const arrayMatch = text.match(/\[[\s\S]*?"primary_name"[\s\S]*?\]/);
      if (arrayMatch) {
        const cleaned = arrayMatch[0]
          .replace(/```json/g, '')
          .replace(/```/g, '')
          .trim();
        const profileData = JSON.parse(cleaned);
        return Array.isArray(profileData) ? profileData[0] : profileData;
      }
      
      return null;
    } catch (e) {
      console.error('Error parsing profile data:', e);
      return null;
    }
  };

  // Send message to Writer AI via backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const API_BASE_URL = process.env.REACT_APP_API_URL || '';
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const aiMessage = { role: 'assistant', content: data.response };
      
      setMessages(prev => [...prev, aiMessage]);

      // Check if response contains profile data
      const profileData = detectProfileData(data.response);
      if (profileData) {
        // Add follow-up question
        setMessages(prev => [...prev, {
          role: 'system',
          content: '💾 Profile data detected! Would you like to save this to your dashboard?'
        }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error connecting to the AI. Please make sure the backend is running.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset chat to initial state
  const handleNewChat = () => {
    setMessages([]);
    setInput('');
    setIsLoading(false);
  };

  return (
    <div className="page-container">
      <Header />

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className="chat-container">
              
              {/* Chat Header */}
              <div className="chat-header">
                <div className="d-flex align-items-center gap-2">
                  <span className="chat-icon">🔍</span>
                  <span className="chat-title">APT Research Assistant</span>
                </div>
                <button 
                  className="btn btn-sm btn-outline-light"
                  onClick={handleNewChat}
                  title="Start a new chat"
                >
                  New Chat
                </button>
              </div>

              {/* Messages Container */}
              <div className="chat-messages">
                {messages.length === 0 && (
                  <div className="chat-empty-state">
                    <p className="empty-state-title">👋 Ask me about any APT group!</p>
                    <p className="empty-state-subtitle">Examples:</p>
                    <p className="empty-state-example">"Tell me about APT28"</p>
                    <p className="empty-state-example">"Research Salt Typhoon"</p>
                  </div>
                )}
                
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`message-wrapper ${msg.role === 'user' ? 'message-user' : 'message-assistant'}`}
                  >
                    <div className={`message-bubble message-${msg.role}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="message-wrapper message-assistant">
                    <div className="message-bubble message-loading">
                      Thinking...
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="chat-input-container">
                <div className="input-group">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
                    placeholder="Ask about an APT group..."
                    disabled={isLoading}
                    className="form-control chat-input"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={isLoading || !input.trim()}
                    className="btn btn-primary chat-send-btn"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIResearchChat;