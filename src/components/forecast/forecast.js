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
      <label className="title" htmlFor="title" aria-controls="title">Daily</label>
      <Accordion allowZeroExpanded aria-labelledby="daily-label">
        {data.list.splice(0, 7).map((item, idx) => (
          <AccordionItem key={idx} aria-controls="item">
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    src={`icons/${item.weather[0].icon}.png`}
                    className="icon-small"
                    alt="weather"
                  />
                  <label className="day" htmlFor="forecasttitle" aria-controls="forcast title">{forecastDays[idx]}</label>
                  <span className="description" id="forecasttitle" aria-controls="Description">
                    {item.weather[0].description}
                  </span>
                  <label className="min-max" htmlFor="minmaxtemperature" aria-controls="minmaxtemp info">
                    {Math.round(item.main.temp_max)}
                    °C /
                    {Math.round(item.main.temp_min)}
                    °C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label htmlFor="pressure" aria-controls="Pressure info">Pressure:</label>
                  <span id="pressure">{item.main.pressure}</span>
                </div>
                <div className="daily-details-grid-item">
                  <label htmlFor="titlehumidity" aria-controls="Humidity info">Humidity:</label>
                  <label htmlFor="humidity" aria-controls="Humidity info">{item.main.humidity}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label htmlFor="clouds" aria-controls="Cloud info">Clouds:</label>
                  <label htmlFor="information for clouds" aria-controls="Cloud info">
                    {item.clouds.all}
                    %
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label htmlFor="title for Wind Speed" aria-controls="Wind info">Wind speed:</label>
                  <label htmlFor="infor for Wind Speed" aria-controls="Wind info">
                    {item.wind.speed}
                    {' '}
                    m/s
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label htmlFor="Sea Level" aria-controls="Sea Level info">Sea level:</label>
                  <label htmlFor="Sea Level Info" aria-controls="Sea Level info">
                    {item.main.sea_level}
                    m
                  </label>
                </div>
                <div className="daily-details-grid-item">
                  <label htmlFor="temp feel title" aria-controls="temp feel">Feels like:</label>
                  <label htmlFor="temp feel value" aria-controls="temp feel value">
                    {item.main.feels_like}
                    °C
                  </label>
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
