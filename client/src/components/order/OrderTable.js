import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaEdit, FaTrash } from 'react-icons/fa'
import { HiCurrencyRupee } from 'react-icons/hi'
import { motion } from 'framer-motion';
import { straggerFadeInOut } from '../../animations';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { MdOutlineVerified } from 'react-icons/md'
import { VscUnverified } from 'react-icons/vsc'
import { APIURL } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { updateOrderStatus } from '../../store/order/orderAction';
import { toast } from 'react-hot-toast';





const OrderTable = ({ item, index,userRole }) => {

    const dispatch = useDispatch();

    const handleStatusChange = async(itemId,e) =>{
        const dataValues = {
            itemId,
            status:e.target.value
        }
        await dispatch(updateOrderStatus(dataValues))
        toast.success("Order status updated successfully")
    }


    return (
        <motion.tr  {...straggerFadeInOut(index)} className='shadow-md border-[3px] font-semibold text-textColor bg-gray-50  border-gray-200 '>
            <td className="py-2 px-3 text-lg">{new Date(item.createdAt).toDateString()}</td>
            <td className="py-2 px-3 text-lg">{item.user.userName}</td>
            <td className="py-4 px-6 text-lg">
                <table className="w-full">
                <tr className='text-lg text-center font-bold'>
                    <td>Image</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Quantity</td>
                </tr>
                {
                    item.items.map((data,i)=>{
                        return(
                            <tr className='text-lg text-center'>
                            <td><LazyLoadImage effect='opacity' src={`${APIURL}/file/${data.image}`} alt="Item" className="w-[75px] object-contain h-[50px] rounded-full" /></td>
                            <td>{data.name}</td>
                            <td>{data.price}</td>
                            <td>{data.orderItems.quantity}</td>
                            </tr>
                        )
                    })
                }
                </table>
            </td>
            <td className="py-2 px-3 text-lg">{item.totalAmount}</td>
            <td className="py-2 px-3 text-lg">
            {
                userRole === 'admin' ?(
                    <select onChange={(e)=>handleStatusChange(item.id,e)} defaultValue={item.status}>
                <option value="Preparing">Preparing</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Delivered">Delivered</option>
            </select>
                ):
            (<p>{item.status}</p>)
            }
        
            
            </td>
        </motion.tr>
    )
}

export default OrderTable