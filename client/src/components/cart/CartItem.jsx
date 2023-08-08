import { motion } from 'framer-motion'
import React from 'react'
import { HiCurrencyRupee } from 'react-icons/hi';
import { btnClick } from '../../animations';
import { APIURL } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, getAllCartItems, incrementQuantity } from '../../store/cart/cartAction';
import { clearFields } from '../../store/cart/cartSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const CartItem = ({ item }) => {
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.currUser)
  // console.log(item.quantity);

  const handleIncrement = async () => {

    const userId = userData.id
    const itemId = item.id


    try {
      const isIncreased = await dispatch(incrementQuantity({ userId, itemId })).unwrap()
      const fetchUpdatedCart = await dispatch(getAllCartItems(userData?.id)).unwrap()
      dispatch(clearFields())

    } catch (error) {

      console.log('error');
    }




  }

  const handleDecrement = async () => {
    const userId = userData.id
    const itemId = item.id


    try {
      const isIncreased = await dispatch(decrementQuantity({ userId, itemId })).unwrap()
      const fetchUpdatedCart = await dispatch(getAllCartItems(userData?.id)).unwrap()
      dispatch(clearFields())

    } catch (error) {

      console.log('error');
    }




  }


  return (
    <motion.li className='w-full flex items-center justify-start bg-zinc-800 rounded-md drop-shadow-md px-2 sm:pl-2 xs:pr-3 sm:pr-4 gap-4'>

      <div className='h-20  w-20 sm:w-28 sm:h-24 py-2 flex'>
        <LazyLoadImage src={`${APIURL}/file/${item.image}`} className='w-full h-full object-contain m-auto ' alt="Cart Item" effect='opacity' />
      </div>

      <div className='flex items-center justify-start gap-1 w-full h-20 '>
        <h3 className='text-[15px] xs:text-base md:text-lg text-primary font-semibold h-auto   w-28 xs:w-40 '>
          <span className='line-clamp-2 font-sans'>
            {item.name}
          </span>
          <span className='text-[13px] xs:text-sm block capitalize text-gray-400 '>
            {item.category}
          </span>

        </h3>

        <p className='text-sm font-semibold text-red-400 ml-auto flex items-center justify-center gap-1 md:text-base font-sans'>
          <HiCurrencyRupee className='text-red-500 text-[19px]' />
          {item.price * item.quantity}
        </p>

        {/* buttons */}
        <div className='ml-auto flex items-center justify-center gap-3'>
          <motion.div className='h-7 w-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-950 cursor-pointer active:bg-green-600' {...btnClick} onClick={handleIncrement}>
            <p className='text-xl sm:text-xl font-semibold text-primary ' >+</p>
          </motion.div>
          <p className='text-base sm:text-lg text-primary font-semibold flex'>x{item.quantity}</p>
          <motion.div className='w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-950 cursor-pointer active:bg-blue-600' {...btnClick} onClick={handleDecrement}>
            <p className='text-xl sm:text-xl font-semibold text-primary' >--</p>
          </motion.div>

        </div>



      </div>

    </motion.li>

  )
}

export default CartItem