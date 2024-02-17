import React, { useEffect, useState } from 'react';
import { styles } from '../style';
import search from '../img/search.svg';
import '../css/loader.css';
import { useLoaderData, Link } from 'react-router-dom';
const API = 'https://restcountries.com/v3.1/all';

let options = {
  style: 'decimal',
  useGrouping: true,
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
};

const Home = () => {
  const countries = useLoaderData();
  const [searchText, setSearchText] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');



  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const FilterCountriesBySearch = (country) => {
    if (searchText.trim() === '') {
      return true;
    }
    return country.name.common.toLowerCase().includes(searchText.toLowerCase());
  };

  const FilterRegionsBySelect = (country) => {
    if (selectedRegion === 'all') {
      return true;
    }
    return country.region.toLowerCase().includes(selectedRegion.toLowerCase());
  };

  const FilteredCountries = countries.filter(FilterCountriesBySearch);
  const FilteredCountriesByRegion = FilteredCountries.filter(FilterRegionsBySelect);

  return (
    <main className="bg-[#fafafa] min-h-screen py-12 dark:bg-midDark">
      <div className={`${styles.container}`}>
        <div className="flex flex-col justify-between items-center mb-12 sm:flex-row sm:items-start md:flex-row md:items-start lg:flex-row lg:items-start">
          <div className="relative mb-5">
            <input
              type="search"
              className="py-5 pr-14 sm:pr-24 md:pr-48 lg:pr-[270px] pl-16 rounded-md shadow-input dark:bg-lightDark dark:text-white"
              placeholder="Search for a country..."
              value={searchText}
              onChange={handleSearchChange}
            />
            <img src={search} alt="search" className="absolute left-8 bottom-6" />
          </div>

          <select
            defaultValue="mainOpt"
            onChange={handleRegionChange}
            className="py-5 pr-20 pl-6 rounded-md shadow-input dark:bg-lightDark dark:text-white"
          >
            <option value="mainOpt" disabled>
              Filter by Region
            </option>
            <option value="all">All</option>
            <option value="afr">Africa</option>
            <option value="america">America</option>
            <option value="euro">Europe</option>
            <option value="asia">Asia</option>
            <option value="ocean">Oceania</option>
          </select>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">
          {FilteredCountriesByRegion.length === 0 ? (
            <li className="text-center absolute text-3xl font-semibold">There are no matching countries</li>
          ) : (
            FilteredCountriesByRegion.map((country, index) => {
              return (
                <li className="rounded-md bg-white shadow-md dark:bg-lightDark dark:text-white" key={index}>
                  <Link to={country.name.common}>
                    <img src={country.flags.png} alt={country.flags.common + ' flag'} className="w-full rounded-t-md h-40 " />
                    <div className="pt-6 pb-12 px-6">
                      <h3 className="mb-4 text-xl font-extrabold">{country.name.common}</h3>
                      <p>
                        <span className="font-bold">Population: </span>
                        {country.population.toLocaleString('uz-Uz', options)}
                      </p>
                      <p>
                        <span className="font-bold">Region: </span>
                        {country.region}
                      </p>
                      <p>
                        <span className="font-bold">Capital: </span>
                        {country.capital ? country.capital : 'No capital'}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </main>
  );
};

export default Home;

export const getCountries = async () => {
  const response = await fetch(API);
  const data = await response.json();
  if (!response.ok) {
    throw Error('Davlatlarni olib bolmadi');
  }
  return data;
};
