import React from 'react'
import { BiChevronsRight } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { btnClick } from '../../animations'
import { showCart } from '../../store/cart/cartSlice'
import { useDispatch } from 'react-redux'
import { MdShoppingCart } from 'react-icons/md'
import { FaHamburger } from 'react-icons/fa'
import { BsFillBackspaceReverseFill } from 'react-icons/bs'


const CartHeader = () => {

    const dispatch = useDispatch()
    return (
        <div className='w-full flex items-center justify-between py-4   px-3 ' >
            <motion.i {...btnClick} className='flex cursor-pointer hover:scale-105' onClick={() => dispatch(showCart())} >
                <BsFillBackspaceReverseFill className='text-4xl text-red-700 hover:text-red-600' />
            </motion.i>

            <h3 className='text-2xl font-extrabold tracking-wide flex items-center gap-3 '><MdShoppingCart className='text-4xl  text-black' />  My Basket </h3>

            <motion.i {...btnClick} className='flex cursor-pointer pr-4 text-blue-500 hover:text-red-800 hover:scale-105' >
                <FaHamburger className='text-4xl text-blue-700' />
            </motion.i>

        </div>
    )
}

export default CartHeader