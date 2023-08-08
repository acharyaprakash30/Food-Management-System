
import FormInput from '../../../common/FormInput'
import LoginBg from '../../../assests/LoginBg.jpg'
import React, { useEffect, } from 'react';
import { FaLock, FaEnvelope } from 'react-icons/fa'
import { useFormik } from 'formik'
import { loginSchmea } from '../../../schema';
import { motion } from 'framer-motion';
import FoodZone from '../../../assests/FoodZone.png'
import FoodService from '../../../assests/FoodService.png'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import MainLoader from '../../../animations/MainLoader';
import { btnClick } from '../../../animations';
import { clearFields } from '../../../store/user/authSlice';
import { userLogin } from '../../../store/user/authAction';




const initialValues = { email: 'admin@test.com', password: 'admin123$' };


const Login = () => {

    const navigate = useNavigate('')
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const { loading } = useSelector(state => state.auth)
    const handleNavigate =()=>navigate('/')


    const { values, errors, handleBlur, touched, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchmea,
        onSubmit: async (values, action) => {
            // console.log(values);  
            const a = await dispatch(userLogin(values)).unwrap()
            // console.log(a);


        }

    });


    useEffect(() => {

        setTimeout(() => {
            if (auth.userToken) {
                navigate('/', { replace: true })
                dispatch(clearFields())
            }
        }, 1000);
    }, [dispatch, auth.userToken, navigate])

    useEffect(() => {
        // console.log(1);
        dispatch(clearFields())

    }, [values, dispatch])

    return (
        <section className='w-screen  min-h-screen relative overflow-hidden flex  py-10 sm:py-8 bg-yellow-400'>
            {
                loading && (
                    <MainLoader />
                )
            }


            {/* background Image */}
            <img src={LoginBg} alt='Login Bg' className='w-full h-full object-fit  absolute top-0 left-0 border-black blur-[2px]' />
            <img src={FoodService} alt="Food Service" className='hidden lg:flex w-80 absolute z-40 top-16 left-[40%]' />

            <aside className='sm:ml-10 flex flex-col bg-yellow-400 shadow-md items-center w-[90%] backdrop-filter min-h-full z-10 sm:w-460 backdrop-blur-xl p-4 px-4 bg-opacity-20 lg:bg-opacity-100 '>

                {/* //top section */}
                <div className='flex items-center justify-start gap-4 w-full mb-4  sm:mb-2'>

                    <img src={FoodZone} alt="Food Zone" className='w-28 h-28 cursor-pointer' onClick={handleNavigate} />
                    <p className='border-b-2 border-green-700 w-3/4' ></p>



                </div>
                <h3 className="text-black font-semibold text-3xl">Welcome Back!</h3>
                <h6 className='text-xl text-textColor mb-4 mt-1 font-semibold'>Login with following</h6>

                {/* input section */}

                <form className='w-full flex flex-col items-center justify-center gap-[15px] px-4 md:px-12 py-4' onSubmit={handleSubmit}>


                    <FormInput placeholder='Email' type='text' icon={<FaEnvelope className='text-xl text-textColor' />}
                        value={values.email} onChange={handleChange} name='email' onBlur={handleBlur}
                        errors={errors.email} touched={touched.email}
                    />



                    <FormInput placeholder='Password' type='text' icon={<FaLock className='text-xl text-textColor' />}
                        value={values.password} onChange={handleChange} name='password' onBlur={handleBlur}
                        errors={errors.password} touched={touched.password}
                    />


                    {/* button section */}

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

                    <motion.button type='submit' className='w-full px-4 py-2 rounded-md bg-red-600 cursor-pointer text-white text-xl hover:bg-red-500 transition-all' >Login</motion.button>

                    <div className='w-full sm:w-[380px] flex gap-4 mt-3'>
                        <p className='border-b-2 border-gray-400 rounded- w-full'></p>


                        <p className='border-b-2 border-gray-400 rounded- w-full'></p>

                    </div>

                    {/* link section */}

                    <p className='flex gap-2 text-lg'>Don't have an account?:
                        <Link to='/register' className='sm:font-semibold font-bold'>

                            <motion.button {...btnClick}
                                className='text-red-700 underline cursor-pointer bg-transparent' >Register</motion.button>

                        </Link>
                    </p>




                </form>





            </aside>

        </section>
    );
}

export default Login;
