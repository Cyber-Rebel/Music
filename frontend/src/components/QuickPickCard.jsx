import React from 'react';

const QuickPickCard = ({ title, image }) => {
  return (
    <div className="quick-pick-card">
      <div className="quick-pick-image" style={image ? { backgroundImage: `url(${image})` } : {}}></div>
      <span className="quick-pick-title">{title}</span>
    </div>
  );
};

export default QuickPickCard;
