import React from 'react';
import PropTypes from 'prop-types';

const CityCard = ({ cityName, onClick }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === 'Space') {
      onClick(cityName);
    }
  };

  return (
    <div
      className="city-card"
      onClick={() => onClick(cityName)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {cityName}
    </div>
  );
};

CityCard.propTypes = {
  cityName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CityCard;
