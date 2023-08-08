import React from 'react'
import { APIURL } from '../../../utils/constants';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaEdit, FaTrash } from 'react-icons/fa'
import { HiCurrencyRupee } from 'react-icons/hi'
import { motion } from 'framer-motion';
import { straggerFadeInOut } from '../../../animations';
import 'react-lazy-load-image-component/src/effects/opacity.css';


const Item = ({ item, handleDelete, index, handleEdit }) => {


    return (

        <motion.tr  {...straggerFadeInOut(index)} className='shadow-md border-b-[3px] border-gray-300  font-semibold text-textColor  bg-gray-100 '>
            <td className=" px-6 ">
                <LazyLoadImage effect='opacity' src={`${APIURL}/file/${item.image}`} alt="Item" className="w-[75px] object-contain h-[75px] rounded-full" />
            </td>
            <td className="py-4 px-6">{item.name}</td>
            <td className="py-4 px-6"><HiCurrencyRupee className='inline text-2xl -mt-1 font-bold text-red-600' /> {item.price}</td>
            <td className="py-4 px-6">{item.category}</td>
            <td className="py-4 px-6">
                <div className="flex  space-x-2 gap-3">
                    <FaEdit className="cursor-pointer text-green-600 hover:text-green-800 text-2xl" onClick={() => { handleEdit(item) }} />
                    <FaTrash className="cursor-pointer text-red-500 hover:text-red-700 text-xl mt-1" onClick={() => { handleDelete(item) }} />
                </div>
            </td>
        </motion.tr>
    )
}

export default Item