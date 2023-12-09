// Rating.js

import React, { useState } from 'react';

const Rating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    onRatingChange(selectedRating); // Pass the rating to the parent component
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleStarClick(i)}
          style={{ cursor: 'pointer', color: i <= rating ? 'gold' : 'white' ,fontSize:"50px"}}
        >
          &#9733; {/* Unicode character for a star */}
        </span>
      );
    }
    return stars;
  };

  return (
    <div>
      <p style={{textAlign:"left",color:"black"}}>Rate to delegate</p>
      {renderStars()}
    </div>
  );
};

export default Rating;
