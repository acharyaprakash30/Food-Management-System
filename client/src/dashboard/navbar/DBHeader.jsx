import React, { useEffect, useState } from 'react'
import { MdLogout, MdSearch } from 'react-icons/md'
import { BsFillBellFill, BsToggles2 } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { btnClick } from '../../animations'
import Avatar from '../../assests/Avatar.png'

import { logout } from '../../store/user/authSlice'
import { clearUserData } from '../../store/user/currUserSlice'
import { useLocation } from 'react-router-dom'
// import { searchItems } from '../../store/product/productAction'
// import { clearFields } from '../../store/product/productSlice'
import { clearSearchFields, getSearchInput } from '../../store/searchSlice'
import { APIURL } from '../../utils/constants'

const DBHeader = () => {
    const [search, setSearch] = useState({ searchKeyword: '', category: 'all', status: false })
    const { userData } = useSelector(state => state.currUser)
    const dispatch = useDispatch()
    const { pathname } = useLocation()

    const handleSearch = (value) => {
        setSearch({ ...search, searchKeyword: value, status: true })

    }

    useEffect(() => {
        dispatch(clearSearchFields())

        setSearch({ searchKeyword: '', category: 'all', status: false })
    }, [pathname, dispatch])

    useEffect(() => {
        const { searchKeyword } = search

        if (search.status) {
            dispatch(getSearchInput({ searchKeyword }))
        }




    }, [search, dispatch])


    return (
        <section className='w-full flex items-center justify-between gap-3  px-3 '>

            {/* left */}
            <h3 className='text-2xl text-headingColor font-extrabold  font-sans ' >DASHBOARD
                {userData && <p className='block text-base text-black font-semibold'>Welcome {userData?.userName} to the dashboard .</p>}
            </h3>

            {/* right */}

            <div className='flex items-center justify-center gap-4'>

                <div className='flex items-center justify-center gap-4'>

                    <div className='flex items-center justify-center gap-3 px-4 py-2 backdrop-blur-md rounded-md drop-shadow-lg  bg-gray-100 border-2 border-gray-300'>
                        <MdSearch className='text-gray-700 text-2xl ' />
                        <input type="text" placeholder='Search here..' className=' bg-transparent w-48 outline-none text-base'
                            onChange={(e) => handleSearch(e.target.value)} value={search.searchKeyword} />
                        <BsToggles2 className='text-gray-700 text-2xl' />
                    </div>


                    <motion.div {...btnClick} className='w-10 bg-gray-100 rounded-md cursor-pointer backdrop-blur-md shadow-md flex items-center justify-center h-10 gap-2 ' >
                        <BsFillBellFill className='text-gray-500 text-xl h-full' />
                    </motion.div>


                    <div className='flex items-center  justify-center gap-2'>


                        <div className='w-10 h-10 rounded-md shadow-md cursor-pointer overflow-hidden'>
                            <motion.img className='w-full h-full object-cover rounded-md' src={userData?.image ? `${APIURL}/file/${userData.image}` : Avatar}
                                whileHover={{ scale: 1.1 }} referrerPolicy='no-referrers' />
                        </div>

                        <motion.div {...btnClick} className='w-10 rounded-md cursor-pointer backdrop-blur-md shadow-md flex items-center justify-center h-10  bg-gray-100' >
                            <MdLogout className='text-2xl text-textColor group-hover::text-headingColor h-10' onClick={() => { dispatch(logout()); dispatch(clearUserData()) }} />
                        </motion.div>


                    </div>

                </div>

            </div>


        </section>
    )
}

export default DBHeader