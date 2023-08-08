import React from 'react'
import { APIURL } from '../../../utils/constants';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaEdit, FaTrash } from 'react-icons/fa'
import { HiCurrencyRupee } from 'react-icons/hi'
import { motion } from 'framer-motion';
import { straggerFadeInOut } from '../../../animations';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { MdOutlineVerified } from 'react-icons/md'
import { VscUnverified } from 'react-icons/vsc'


const User = ({ user, index }) => {


    return (

        <motion.tr  {...straggerFadeInOut(index)} className='shadow-md border-[3px] font-semibold text-textColor bg-gray-50  border-gray-200 '>

            <td className="py-4 px-6 text-lg">{user.userName}</td>
            <td className="py-4 px-6">{user.email}</td>
            <td className="py-4 px-6 text-[15px]">{user.phoneNumber ? user.phoneNumber : 'XXXXXXXXXX'}</td>
            <td className="py-4 px-6 text-[15px]">{user.address ? user.address : 'XXXXXXXXXX'}</td>
            <td className="py-4 px-6">
                {
                    user.role === 'admin' ?
                        <button className='bg-green-600 px-2 text-white rounded-md py-1 w-32 flex gap-2'>
                            <MdOutlineVerified className='text-lg my-auto' />
                            Verified
                        </button> :
                        <button className='bg-red-600 px-2 text-white rounded-md py-1 w-32 flex gap-2'>
                            <VscUnverified className='text-xl my-auto' />
                            Unverfied
                        </button>
                }


            </td>
        </motion.tr>
    )
}

export default User