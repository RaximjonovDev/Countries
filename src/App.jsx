import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Detail from './pages/Detail'
import PageNotFound from './pages/PageNotFound'
import { getCountries } from './pages/Home'
import { getCountry } from './pages/Detail'



const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout/>}>
        <Route path='/' element={<Home/>} loader={getCountries}/>
        <Route path='*' element={<PageNotFound/>}/> 
        <Route path='/:name' element={<Detail/>} loader={getCountry}/>
      </Route>
    )
  )
  
  return (
    <RouterProvider router={router}/>
  )
}

export default App