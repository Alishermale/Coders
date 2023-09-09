import React from 'react';
import axios from 'axios';
import './App.css';
import AnswerCard from './AnswerCard';

export const api = axios.create({
  baseURL: '' //  IP/api
});


function App() {
  const [inputText, setInputText] = React.useState('');
  const [messages, setMessages] = React.useState([]); 

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = async () => {
    if (inputText.trim() !== '') {
      const senderNewMessage = {
        message: inputText,
        isSender: true,
      };
      
      setMessages([...messages, senderNewMessage]);

      setInputText('');
      
      try {
        const response = await api.get('', { timeout: 500 }); // API PATH
        const botNewMessage = {
          message: response.statusText, /// API GET OK!
          isSender: false,
        };
  
        setMessages([...messages, senderNewMessage, botNewMessage]);
      } catch (error) {
        console.error('Ошибка при запросе к API:', error);
      }
    }
  };


  return (
    <div className="App">
      <div className="Chat">
        {messages.map((message, index) => (
          <AnswerCard key={index} message={message.message} isSender={message.isSender} />
        ))}
        <div className="InputArea">
          <input
            type="text"
            placeholder="Введите сообщение..."
            value={inputText}
            onChange={handleInputChange}
          />
          <button onClick={handleSendMessage}>Отправить</button>
        </div>
      </div>
      
    </div>
  );
}

export default App;
