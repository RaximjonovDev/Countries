import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../style';
import moon from '../img/moon.svg';
import sun from '../img/sun.svg'

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    const body = document.querySelector('body');
    if (isDarkMode) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <header className={`py-6 shadow-header dark:bg-lightDark dark:text-white`}>
      <div className={`flex justify-between items-center ${styles.container}`}>
        <Link className='text-textColor text-xl font-extrabold sm:text-2xl dark:text-white' to="/">
          <h1>Where in the world?</h1>
        </Link>

        <button className='inline-flex items-center tex-base font-semibold text-textColor dark:text-white' onClick={() => setIsDarkMode((prevMode) => !prevMode)}>
          <img className='mr-2' src={isDarkMode ? sun : moon} alt="Moon icon" />
          <span className='hidden font-semibold sm:block'>{isDarkMode ? 'Light mode' : 'Dark mode'}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
