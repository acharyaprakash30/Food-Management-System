import { motion } from 'framer-motion'
import React, { useState } from 'react'

const FormInput = ({ placeholder, icon, onBlur, onChange, type, value, name, errors, touched }) => {
    const [isFocus, setIsFocus] = useState(false)
    const handleBlur = (event) => {
        setIsFocus(false)
        onBlur(event)


    }

    return (

        <>
            <motion.div className={`flex items-center justify-center gap-4 bg-gray-100 backdrop-blur-md rounded-md w-full px-4 py-[6px] ${isFocus && 'shadow-md shadow-gray-800'}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} >
                {icon}
                <input type={type} placeholder={placeholder} value={value} onChange={onChange} name={name}

                    onBlur={handleBlur} onFocus={() => setIsFocus(true)}
                    className='w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none'
                />
            </motion.div>

            <div className='-mt-3  min-h-[24px]  text-red-600 self-start ml-2'>
                {errors && touched &&
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} >{errors}</motion.div>}
            </div>
        </>

    )
}

export default FormInput