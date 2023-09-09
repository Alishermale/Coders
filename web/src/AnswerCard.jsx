import React, { useState } from 'react';

const AnswerCard = ({ message, isSender }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

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
      return '30%'
    }
    if (message.length >= 10) {
      return '15%'
    }
    return 'auto'
  }

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

  };

  const textStyle = {
    margin: 0,
    padding: 0
  };




  const buttonText = isExpanded ? 'Свернуть текст' : 'Развернуть текст полностью';

  
  return (
    <div style={ cardStyle }>
      <div style={ messageField }>
        { isExpanded ? (
          <p style={textStyle}>{message}</p>
        ) : (
          <p style={textStyle}>{ message.slice(0, 400) }</p>
        )}
        { message.length > 400 && (
          <button style={buttonStyle} onClick={toggleExpand}>
            {buttonText}
          </button>
        )}
      </div>
      



    </div>
  );
};

export default AnswerCard;