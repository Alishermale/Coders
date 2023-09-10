import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading'




const AnswerCard = ({message, isSender}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkSize = () => {
    if (message.length >= 100) {
      return '70%'
    }
    if (message.length >= 60) {
      return '50%'
    }
    if (message.length >= 40) {
      return '40%'
    }
    if (message.length >= 20) {
      return '40%'
    }
    if (message.length >= 10) {
      return '30%'
    }
    return 'auto'
  }

  useEffect(() => {
    if (!isSender) {
      setTimeout(() => {
        setIsLoading(!isLoading)
      }, 3000)
    }
  }, [])

  const cardStyle = {
    marginBottom: 40,
    
  };
  
  const buttonStyle = {
    background: 'transparent',
    color: '#838383',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    marginTop: 10
  };
  
  const messageField = {
    backgroundColor: isSender ? '#1E2022' : '#B7CBD8',
    color: isSender ? 'white' : 'black',
    borderRadius: isSender ? '20px 0px 20px 20px' : '0px 20px 20px 20px',
    padding: '15px 25px',
    marginBottom: '10px',
    width: 'min-content',
    display: 'flex',
    flexDirection: 'column',
    minWidth: checkSize(),
    justifyContent: isSender? 'right': 'left',
    marginLeft: isSender ? 'auto' : 'none',
    marginRight: isSender ? 'none' : 'auto',
    transition: 'opacity 0.3s'
  };
  
  return (
    <div style={ cardStyle }>
      <div style={ messageField }>
        { !isSender && isLoading ? <ReactLoading type={"bubbles"} color={"black"} width={35} height={35}/> 
        : 
        <div>
          {isExpanded ? (
            <p>{ message }</p>
          ) : (
            <p>{ message.slice(0, 400) }</p>
          )}
          { message.length > 400 && (
            <button style={ buttonStyle } onClick={ setIsExpanded(!isExpanded) }>
              { isExpanded ? 'Свернуть текст' : 'Развернуть текст полностью' }
            </button>
          )}
        </div>}
      </div>
    </div>
  );
};

export default AnswerCard;