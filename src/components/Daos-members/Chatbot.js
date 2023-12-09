import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import "../Daos-members/Chatbot.css";
import chat from "../../assests/chatbot.png";

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Arial, sans-serif',
  headerBgColor: '#b0f127',
  headerFontColor: 'black',
  headerFontSize: '20px',
  botBubbleColor: 'gray',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const closeChatbot = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const chatbotContainer = document.getElementById('chatbot-container');

      if (chatbotContainer && !chatbotContainer.contains(event.target)) {
        closeChatbot();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div id="chatbot-container">

      {isOpen && (
        <div>
          <ThemeProvider theme={theme}>
            <ChatBot
              headerTitle="Chatbot"
              recognitionEnable={true}
              steps={[
                {
                  id: '1',
                  message: 'Hello! I am a chatbot.',
                  trigger: '2',
                },
                {
                  id: '2',
                  user: true,
                  trigger: '3',
                },
                {
                  id: '3',
                  message: 'You said "{previousValue}"',
                  trigger: '2',
                },
              ]}
            />
          </ThemeProvider>
        </div>
      )}

      <img src={chat} onClick={toggleChatbot} className="chat-icon" alt="Chat Icon" />
    </div>
  );
};

export default Chatbot;
