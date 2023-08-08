import MainLoader from '../../../animations/MainLoader';
import LoginBg from '../../../assests/LoginBg.jpg'
import React, { useEffect } from 'react';
import { FaLock, FaEnvelope, FaUser } from 'react-icons/fa'
import { useFormik } from 'formik'
import { motion } from 'framer-motion';
import FoodZone from '../../../assests/FoodZone.png'
import FoodService from '../../../assests/FoodService.png'
import { Link, useNavigate } from 'react-router-dom';
import { btnClick } from '../../../animations';
import { useDispatch, useSelector } from 'react-redux';
import { clearFields } from '../../../store/user/authSlice';
import { userRegister } from '../../../store/user/authAction';
import { registrationSchema } from '../../../schema';
import FormInput from '../../../common/FormInput';


const initialValues = { email: 'admin@test.com', password: 'admin123$', userName: 'admin', phoneNumber: '+977985640172' };




const Register = () => {

    const auth = useSelector(state => state.auth)
    console.log();

    const dispatch = useDispatch()
    const handleNavigate =()=>navigate('/')

    const navigate = useNavigate()
    const { values, errors, handleBlur, touched, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: registrationSchema,
        onSubmit: async (values, action) => {

            console.log(values);

            const a = await dispatch(userRegister(values)).unwrap()
            console.log(a);




        }

    });

    useEffect(() => {

        setTimeout(() => {
            if (auth.error === null && auth.success !== false) {
                navigate('/login', { replace: true })
                dispatch(clearFields())
            }

        }, 2000);

    }, [dispatch, navigate, auth.error, auth.success])









    useEffect(() => {
        // console.log(values);
        // dispatch(setError())
        dispatch(clearFields())

    }, [values, dispatch])

    return (
        <section className='w-screen min-h-screen  relative overflow-hidden flex  sm:py-5 py-8 bg-yellow-400'>
            {
                auth.loading && <MainLoader />
            }

            {/* background Image */}
            <img src={LoginBg} alt='Login Bg' className='w-full h-full object-fit  absolute top-0 left-0 border-black blur-[2px]' />
            <img src={FoodService} alt="Food Service" className='hidden lg:flex w-80 absolute z-50 top-16 left-[40%]' />

            <aside className=' sm:ml-10 flex flex-col bg-yellow-400 shadow-md items-center w-[90%] backdrop-filter min-h-full z-10 sm:w-460 backdrop-blur-3xl p-4 px-4  bg-opacity-20 lg:bg-opacity-100 '>

                {/* //top section */}
                <div className='flex items-center justify-start gap-4 w-full'>

                    <img src={FoodZone} alt="Food Zone" className='w-24 h-24 cursor-pointer' onClick={handleNavigate}/>
                    <p className='border-b-2 border-green-700 w-3/4' ></p>

                </div>



                <h3 className='text-3xl text-black mb-4 font-semibold'>Sign up with following</h3>

                {/* input section */}

                <form className='w-full flex flex-col items-center justify-center gap-4 px-4 md:px-12 py-4' onSubmit={handleSubmit}>

                    <FormInput placeholder='Full Name' type='text' icon={<FaUser className='text-xl text-textColor' />}
                        value={values.userName} onChange={handleChange} name='userName' onBlur={handleBlur}
                        errors={errors.userName} touched={touched.userName}
                    />


                    <FormInput placeholder='Email' type='text' icon={<FaEnvelope className='text-xl text-textColor' />}
                        value={values.email} onChange={handleChange} name='email' onBlur={handleBlur}
                        errors={errors.email} touched={touched.email}
                    />

                    <FormInput placeholder='Phone number' type='text' icon={<FaLock className='text-xl text-textColor' />}
                        value={values.phoneNumber} onChange={handleChange} name='phoneNumber' onBlur={handleBlur}
                        errors={errors.phoneNumber} touched={touched.phoneNumber}
                    />

                    <FormInput placeholder='Password' type='text' icon={<FaLock className='text-xl text-textColor' />}
                        value={values.password} onChange={handleChange} name='password' onBlur={handleBlur}
                        errors={errors.password} touched={touched.password}
                    />

                    

                    {auth.error?.length > 1 &&
                        <motion.div className='-mt-6 text-red-600' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} >
                            {auth.error}
                        </motion.div>
                    }
                    {auth.success?.length > 1 &&
                        <motion.div className='-mt-6 text-red-600' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} >
                            {auth.success}
                        </motion.div>
                    }


                    {/* button section */}

                    <motion.button type='submit' className='w-full px-4 py-2 rounded-md bg-red-600 cursor-pointer text-white text-xl hover:bg-red-500 transition-all'>Signup</motion.button>


                    {/* link section */}

                    <p className='flex gap-2 text-lg'>Already have an account?:
                        <Link to='/login' className='font-semibold'>

                            <motion.button {...btnClick}
                                className='text-red-700 underline cursor-pointer bg-transparent' >Login</motion.button>

                        </Link>
                    </p>

                </form>

            </aside>

        </section>
    );
}

export default Register;
