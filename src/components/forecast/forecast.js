import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import './forecast.css';
import PropTypes from 'prop-types';

const WEEK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek),
  );

  return (
    <>
      <span className="title">Daily</span>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => (
          <AccordionItem key={item.dt || idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    src={`icons/${item.weather[0].icon}.png`}
                    className="icon-small"
                    alt="weather"
                  />
                  <span className="day">{forecastDays[idx]}</span>
                  <span className="description">
                    {item.weather[0].description}
                  </span>
                  <span className="min-max">
                    {Math.round(item.main.temp_max)}
                    °C /
                    {Math.round(item.main.temp_min)}
                    °C
                  </span>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <span>Pressure:</span>
                  <span>{item.main.pressure}</span>
                </div>
                <div className="daily-details-grid-item">
                  <span>Humidity:</span>
                  <span>{item.main.humidity}</span>
                </div>
                <div className="daily-details-grid-item">
                  <span>Clouds:</span>
                  <span>
                    {item.clouds.all}
                    %
                  </span>
                </div>
                <div className="daily-details-grid-item">
                  <span>Wind speed:</span>
                  <span>
                    {item.wind.speed}
                    {' '}
                    m/s
                  </span>
                </div>
                <div className="daily-details-grid-item">
                  <span>Sea level:</span>
                  <span>
                    {item.main.sea_level}
                    {' '}
                    m
                  </span>
                </div>
                <div className="daily-details-grid-item">
                  <span>Feels like:</span>
                  <span>
                    {item.main.feels_like}
                    °C
                  </span>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

Forecast.propTypes = {
  data: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        weather: PropTypes.arrayOf(
          PropTypes.shape({
            description: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
          }),
        ).isRequired,
        main: PropTypes.shape({
          temp_max: PropTypes.number.isRequired,
          temp_min: PropTypes.number.isRequired,
          pressure: PropTypes.number.isRequired,
          humidity: PropTypes.number.isRequired,
          sea_level: PropTypes.number.isRequired,
          feels_like: PropTypes.number.isRequired,
        }).isRequired,
        wind: PropTypes.shape({
          speed: PropTypes.number.isRequired,
        }).isRequired,
        clouds: PropTypes.shape({
          all: PropTypes.number.isRequired,
        }).isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default Forecast;
