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
  };

  const messageField = {
    backgroundColor: isSender ? '#1E2022' : '#B7CBD8',
    color: isSender ? 'white' : 'black',
    borderRadius: isSender ? '20px 0px 20px 20px' : '0px 20px 20px 20px',
    padding: '10px',
    marginBottom: '10px',
    width: '80%',
    marginLeft: isSender ? 'auto' : 'none',
    marginRight: isSender ? 'none' : 'auto',
  };


  const buttonText = isExpanded ? 'Свернуть текст' : 'Развернуть текст полностью';

  
  return (
    <div style={ cardStyle }>
      <div style={ messageField }>
        { isExpanded ? (
          <p>{message}</p>
        ) : (
          <p>{ message.slice(0, 400) }</p>
        )}
        { message.length > 100 && (
          <button style={buttonStyle} onClick={toggleExpand}>
            {buttonText}
          </button>
        )}
      </div>
      



    </div>
  );
};

export default AnswerCard;