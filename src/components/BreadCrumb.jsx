import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const BreadCrump = () => {

    const location = useLocation();
    const pathArr = location.pathname.split('/').filter(path => path.trim() !== '');
    const cleanedPathArr = pathArr.map(path => path.replace(/20|%20/g, ' '));



    return (
        <ul className='flex space-x-2 '>
            <li>
                <Link>Home</Link>
            </li>
            {
                cleanedPathArr.map((path, index) => {
                    return (
                        <li key={index}>
                            {
                                index !== cleanedPathArr.length - 1 ?
                                    <Link>/ {path}</Link> :
                                    <span>/ {path}</span>
                            }
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default BreadCrump