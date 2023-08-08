import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaUserAlt } from 'react-icons/fa'
import { MdVerified } from 'react-icons/md'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { MdFoodBank } from 'react-icons/md'
import CountUp from 'react-countup';

import axios from 'axios';
import { APIURL } from '../../../utils/constants';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../store/user/userAction';
import Avatar from '../../../assests/Avatar.png'
import { motion } from 'framer-motion';
import { straggerFadeInOut } from '../../../animations';
import { PieChart, Pie, Cell } from 'recharts';
import { getAllItems } from '../../../store/product/productAction';
import { clearFields as clearProductFields } from '../../../store/product/productSlice';
import { clearFields } from '../../../store/user/authSlice';
import { getToken } from '../../../store/getToken';




const Home = () => {
    const [userStats, setUserStats] = useState({})
    const [itemStats, setitemStats] = useState({})
    const dispatch = useDispatch()
    const { usersList } = useSelector(state => state.user)
    const { items } = useSelector(state => state.product)


    const fetchDatas = async () => {
        try {
            await dispatch(getAllUsers()).unwrap()
            await dispatch(getAllItems()).unwrap()
            dispatch(clearProductFields())
            dispatch(clearFields())

            const userStats = await axios.get(`${APIURL}/latest/users`, getToken())
            // console.log(userStats.data);
            setUserStats(userStats.data)
            const itemStats = await axios.get(`${APIURL}/latest/items`, getToken())
            setitemStats(itemStats.data)
            console.log(itemStats);



        }
        catch (err) {
            console.log(err.message);
            toast.error("Something went wrong.")

        }


    }

    useEffect(() => {

        fetchDatas()

    }, [])

    console.log(itemStats);




    return (
        <section className=' pt-10 pb-8 '>

            <aside className='w-full flex justify-evenly py-5' >

                <Card title="Customers" count={userStats?.totalUsers} latest={userStats?.latestUserCount} per={userStats?.percentage}
                    icon={<FaUserAlt size={28} />} style='bg-[rgb(178,121,255)]' />

                <Card title="Food Item" count={itemStats?.totalItems} latest={itemStats?.latestItemCount} per={itemStats?.percentage}
                    icon={<MdFoodBank size={37} />} style='bg-[rgb(58,203,232)]' />

                <Card title="Verified Users" count={7} icon={<MdVerified size={33} latest={1} per={30} />} style='bg-[rgb(245,197,37)]' />
                <Card title="Orders" count={2} icon={<BsFillCartCheckFill size={32} latest={8} per={1} />} style='bg-[rgb(255,144,98)]' />

            </aside >

            <aside className=' w-full mt-20  flex justify-between'>
                <section className='min-w-[300px]' >
                    <p className='text-headingColor font-semibold text-xl px-4 mb-3 '>Latest Registerd Users</p>

                    <div className='bg-gray-100 shadow-md max-w-[430px] py-4 px-7 flex gap-7 rounded-3xl border-gray-300'>

                        {usersList?.slice(0, 5).map((user, index) =>
                            <motion.div {...straggerFadeInOut(index)} key={usersList?.id}>
                                <img src={user?.image ? `${APIURL}/file/${user.image}` : Avatar} className='w-12 h-12 rounded-full' alt="user" />
                                <p className='text-textColor font-semibold font-sans text-sm text-center'>{user?.userName.split(' ')[0]}</p>

                            </motion.div>

                        )}

                    </div>

                </section>

                <section className='flex  relative pt-5'>
                    <p className='text-gray-200 text-2xl absolute top-0 font-semibold left-0 -mt-6 px-3 py-1 shadow-lg bg-orange-600 rounded-lg'>Food Categories</p>
                    <aside className='flex flex-col gap-1 mt-3'>
                        <div className='flex gap-2'> <p className='w-5 h-5 rounded-full  bg-[rgb(255,99,132)]'></p>Drinks</div>
                        <div className='flex gap-2'> <p className='w-5 h-5 rounded-full  bg-[#36A2EB]'></p>Pizza</div>
                        <div className='flex gap-2'> <p className='w-5 h-5 rounded-full  bg-[#FFCE56]'></p>Soups</div>
                        <div className='flex gap-2'> <p className='w-5 h-5 rounded-full  bg-[#8E44AD]'></p>Burgers</div>
                        <div className='flex gap-2'> <p className='w-5 h-5 rounded-full  bg-[#34992B]'></p>Chinese</div>
                        <div className='flex gap-2'> <p className='w-5 h-5 rounded-full  bg-[rgb(111,3,84)]'></p>Pasta</div>
                    </aside>

                    <PieChartt width={200} height={200} items={items} className='  ' />
                </section>




            </aside>








        </section>
    )
}

export default Home


export const Card = ({ title, latest, style, icon, count, per }) => {
    // console.log(per);
    return (
        <div className={`px-2 pt-3 pb-2 w-52 rounded-xl  ${style} text-gray-900 flex justify-around  shadow-lg`}>

            <aside >
                <p className='text-xl text-gray-900 flex gap-3 items-center  cursor-pointer'>{icon}
                    <CountUp className='font-semibold text-2xl cursor-pointer' start={-100} end={count} />
                </p>

                <p className='font-semibold mt-4 text-headingColor'>{title}</p>
            </aside>

            <aside className='flex flex-col gap-3'>
                <CircularProgressbar strokeWidth={15} value={per || 10} className='w-8 h-8  ' color='red' styles={buildStyles({
                    pathColor: 'white',
                    trailColor: "#4338CA"
                })} />
                <p className='font-bold text-lg cursor-pointer' title='Recenly added'>+{latest || 4}</p>

            </aside>


        </div>
    );
};


const PieChartt = ({ items }) => {
    // Create an object to store the category totals
    const categoryTotals = {};

    // Calculate the total count for each category
    items.forEach((item) => {
        const { category } = item;
        if (category in categoryTotals) {
            categoryTotals[category]++;
        } else {
            categoryTotals[category] = 1;
        }
    });

    // Convert the category totals object into an array of data for the pie chart
    const data = Object.entries(categoryTotals).map(([name, value]) => ({
        name,
        value,
    }));

    // Define the colors for the pie chart
    const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#8E44AD', '#34992B', 'rgb(111,3,84)'];

    return (
        <PieChart width={400} height={200} className=''>
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
            >
                {data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
        </PieChart>
    );
};


