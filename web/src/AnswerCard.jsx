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

  const messageField = {
    backgroundColor: isSender ? '#1E2022' : '#B7CBD8',
    color: isSender ? 'white' : 'black',
    borderRadius: isSender ? '20px 0px 20px 20px' : '0px 20px 20px 20px',
    padding: '15px 25px',
    marginBottom: '10px',
    width: '80%',
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