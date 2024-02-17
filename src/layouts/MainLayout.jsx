import React, { Fragment } from 'react'
import Header from '../components/Header'
import { Outlet, useLocation } from 'react-router-dom'
import BreadCrumb from '../components/BreadCrumb'

const MainLayout = () => {
  const location = useLocation()
  const HomePage = location.pathname === '/'
  return (
    <>
    <Header/>
    <Fragment>

        {!HomePage && 
        <div className='dark:bg-midDark dark:text-white'> 
          <div className='w-full max-w-7xl mx-auto px-5 pt-5'>
          <BreadCrumb/>
        </div>
        </div>
        }

        <Outlet/>

    </Fragment>
    </>
  )
}

export default MainLayout