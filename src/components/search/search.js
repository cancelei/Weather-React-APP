import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import propTypes from 'prop-types';
import { geoApiOptions, GEO_API_URL } from '../../api';

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => fetch(
    `${GEO_API_URL}/cities?minPopulation=50000&namePrefix=${inputValue}`,
    geoApiOptions,
  )
    .then((response) => response.json())
    .then((response) => ({
      options: response.data.map((city) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
      })),
    }));

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      className="searchforcity"
      placeholder="Search for city"
      debounceTimeout={1200}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
