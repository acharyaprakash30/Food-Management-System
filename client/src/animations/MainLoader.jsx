import React from 'react'
import { fadeInOut } from '.'
import { motion } from 'framer-motion'
import { HashLoader } from 'react-spinners'

const MainLoader = () => {
    return (
        <motion.div className='opacity-50 fixed  z-50 inset-0 backdrop-blur-[2px] flex items-center justify-center w-screen min-h-screen backdrop-filter ' {...fadeInOut}>
            <div className='flex items-center justify-center container'>

                <HashLoader color="#d63691" size={85} />

            </div>
        </motion.div>
    )
}

export default MainLoader