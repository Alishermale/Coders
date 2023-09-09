import React, { useEffect } from 'react';
import {animateScroll} from 'react-scroll'
import axios from 'axios';
import {FaPaperPlane} from 'react-icons/fa'

import './App.css';
import AnswerCard from './AnswerCard';

export const api = axios.create({
  baseURL: 'http://185.195.27.161:8000'
});


function App() {
  const [inputText, setInputText] = React.useState('');
  const [isLocked, setIsLocked] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  
  const scrollToBottom = () => {
    animateScroll.scrollToBottom()
  }

  useEffect(() => scrollToBottom(), messages)
  
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };


  const handleSendMessage = async () => {
    if (inputText.trim() !== '') {

      setIsLocked(true)

      const senderNewMessage = {
        message: inputText,
        isSender: true,
      };
      setMessages([...messages, senderNewMessage]);
      

      setInputText('');
      
      try {
        

        const postQuerry = { text: senderNewMessage.message }
        const response = await api.post('/predict/', postQuerry, { timeout: 5000 });

        const botNewMessage = {
          message: `Категория: ${response.data.level};  Уровень рейтинга: ${response.data.cat}`,
          isSender: false,
        };
        
        setMessages([...messages, senderNewMessage, botNewMessage]);
        
        setIsLocked(false)
        
      } catch (error) {
        console.error('Ошибка при запросе к API:', error);
      }
      
    }
    scrollToBottom()
  };


  return (
    <div className="App">
      <div className="Chat">
        {messages.map((message, index) => (
          <AnswerCard key={index} message={message.message} isSender={message.isSender} />
        ))}
        {/* {isLoading?
          <ReactLoading type={"bars"} width={40} color={"black"} /> : null
        } */}
        
        
      </div>
      <div className="InputArea">
        <textarea
          type="text"
          placeholder="Введите сообщение..."
          value={inputText}
          disabled={isLocked}
          onChange={handleInputChange}
        />
        <button className='ButtonStyle' onClick={handleSendMessage}>
          <FaPaperPlane />
        </button>
      </div>
      
    </div>
  );
}

export default App;
