import React from 'react'
import { NavLink } from 'react-router-dom'
import FoodZone from '../../assests/FoodZone.png'
import { isActiveStyles, isNotActiveStyles } from '../../utils/nav'

const DBLeft = () => {
    return (
        <section className='h-full bg-gradient-to-r from-gray-100 to-gray-300 py-12 hidden md:flex flex-col backdrop-blur-md shadow-md min-w-210 w-300 gap-3 px-[11px] '>


            <NavLink to='/' className='flex items justify-start gap-4 items-center text-2xl'>
                <img src={FoodZone} className='w-20' alt="FoodZone" />
                <h4 className='font-semibold text-2xl '>Foodie.</h4>
            </NavLink>
            <hr className='border-gray-400' />


            <ul className='flex flex-col gap-4' >
                <NavLink className={({ isActive }) => isActive ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500` : isNotActiveStyles} to={'/dashboard/home'}>Home</NavLink>
                <NavLink className={({ isActive }) => isActive ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500` : isNotActiveStyles} to={'/dashboard/orders'}>Orders</NavLink>
                <NavLink className={({ isActive }) => isActive ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500` : isNotActiveStyles} to={'/dashboard/items'}>Items</NavLink>
                <NavLink className={({ isActive }) => isActive ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500` : isNotActiveStyles} to={'/dashboard/addnewitems'}>Add new items</NavLink>
                <NavLink className={({ isActive }) => isActive ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500` : isNotActiveStyles} to={'/dashboard/users'}>Users</NavLink>

            </ul>

        </section>
    )
}

export default DBLeft