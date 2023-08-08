import React, { useState } from 'react'
import Overlay from '../../../common/Overlay'
import { useFormik } from 'formik';
import { addItemSchema } from '../../../schema/index'
import { motion } from 'framer-motion';
import { btnClick, fade, fadeInOut, slideTop } from '../../../animations';
import DragDrop from '../../../utils/DragDrop'
import { useDispatch, useSelector } from 'react-redux'
import { updateItem } from '../../../store/product/productAction';
import { clearFields } from '../../../store/product/productSlice';
import { FaTrash } from 'react-icons/fa'
import { APIURL, Category } from '../../../utils/constants';
import { HiCurrencyRupee } from 'react-icons/hi'


const EditItem = ({ hideEditModal, selectItem }) => {

    const initialValues = { name: selectItem.name, category: selectItem.category, price: selectItem.price, file: selectItem.image };

    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.currUser)
    const [isFile, setIsFile] = useState('one')

    const { values, errors, handleBlur, touched, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialValues,
        validationSchema: addItemSchema,
        onSubmit: async (values, action) => {
            // console.log(values);
            values.userId = userData.id
            values.id = selectItem.id
            // console.log(values);
            values.image = selectItem.image
            dispatch(updateItem(values)).then(() => {


                setTimeout(() => {
                    dispatch(clearFields())
                    hideEditModal(true)

                }, 1800);
            })



        }

    });






    return (

        <Overlay onClick={hideEditModal}>


            <form className='flex items-center justify-center flex-col pt-6 max-w-screen-md mx-auto w-full px-4 bg-gray-200 rounded-md z-50  fixed -mt-5' onSubmit={handleSubmit} >

                <aside className=' rounded-md p-4 w-full flex flex-col items-center  justify-center gap-4 py-6 pb-10 '>


                    {/* name and price  */}
                    <div className='w-full flex gap-4'>

                        <aside className='w-2/3'>
                            <motion.input type="text" {...slideTop} placeholder='Enter Item name' className='w-full px-4 py-3 bg-gray-100 font-semibold   shadow-md outline-none rounded-md border border-gray-300 focus:border-red-400' onBlur={handleBlur}
                                onChange={handleChange} name='name' value={values.name} />

                            {touched.name && errors.name && <motion.div {...fadeInOut} className='pt-2 px-2 text-red-500'>{errors.name}</motion.div>}
                        </aside>

                        <aside className='w-1/3 relative'>
                            <motion.input {...slideTop} type="number" placeholder='Enter Item Price' className='w-full  px-10  py-3 bg-gray-100  shadow-md outline-none rounded-md border border-gray-300 focus:border-red-400 font-semibold' onBlur={handleBlur}
                                onChange={handleChange} name='price' value={values.price} />
                            <HiCurrencyRupee className='text-2xl text-red-600 absolute top-[11px] left-3' />
                            {touched.price && errors.price && <motion.div {...fadeInOut} className='pt-2 px-2 text-red-500'>{errors.price}</motion.div>}
                        </aside>
                    </div>


                    <section className='flex gap-10 w-full mt-4 px-3'>

                        {/* category */}
                        <div className='w-1/3 flex flex-col  gap-3 ' >

                            <motion.p {...fadeInOut} className='text-2xl text-gray-700 font-semibold'> Categories</motion.p>
                            {
                                Category.map((item, i) =>
                                    <motion.p {...fade} key={item.id} name={item.category} value={values.name} className={`${item.category === values.category ? 'bg-red-500 text-white' : 'bg-transparent'} w-1/2 px-5 py-2 rounded-md text-lg text-textColor font-semibold cursor-pointer hover:shadow-md border border-gray-500 backdrop-blur-md`}
                                        onClick={() => {
                                            console.log(values.category);


                                            handleChange('category')(item.category)
                                        }}
                                        onBlur={handleBlur('category')}
                                    >
                                        {item.title}
                                    </motion.p>
                                )
                            }
                        </div>

                        <motion.section  {...fadeInOut} className='w-2/3 overflow-hidden mt-3 px-4'>
                            {/* image uploader */}


                            <motion.div {...fadeInOut} className=' backdrop-blur-md  w-full h-[300px] rounded-md cursor-pointer flex flex-col relative' >

                                {
                                    values?.file && selectItem.image && (isFile === 'one') &&
                                    <div className='backdrop-blur-md  w-full h-[300px] bg-black rounded-md cursor-pointer flex flex-col relative border-2 border-gray-300'>
                                        <FaTrash className='right-1 top-1 z-30 absolute p-[6px] text-3xl text-gray-200 rounded-full bg-red-600' onClick={() => { setFieldValue('file', null); setIsFile('two') }} />

                                        <img src={`${APIURL}/file/${values.file}`} alt="Selected" {...fadeInOut} className="w-full mx-auto  h-full object-cover rounded-md  " />

                                    </div>
                                }

                                {
                                    (isFile === 'two') && values?.file === null &&

                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[rgb(225,227,232)]  hover:bg-gray-100 ">


                                        <DragDrop />

                                        <input id="dropzone-file" type="file" className="hidden"
                                            onChange={(event) => {
                                                setFieldValue('file', event.target.files[0])
                                                setIsFile('three')
                                            }} name="file" onBlur={handleBlur} />

                                    </label>


                                }
                                {
                                    (isFile === 'three') && values?.file &&
                                    <div className='backdrop-blur-md  w-full h-[300px] bg-black rounded-md cursor-pointer flex flex-col relative '>

                                        <FaTrash className='right-1 top-1 z-30 absolute p-[6px] text-3xl text-gray-200 rounded-full bg-red-600' onClick={() => { setFieldValue('file', null); setIsFile('two') }} />

                                        <img src={URL.createObjectURL(values.file)} alt="Selected" {...fadeInOut} className="w-full mx-auto  h-full object-cover rounded-md  " />

                                    </div>
                                }


                            </motion.div>

                            {/* errors */}
                            {touched.file && errors.file && <motion.div {...fadeInOut} className='pt-2 px-2 text-red-500  mx-auto'>{errors.file}</motion.div>}



                            {/* button */}
                            <div className='flex  justify-center'>

                                <motion.button {...fadeInOut} {...btnClick} className='bg-red-500 mt-5 rounded-md  py-1 w-2/3 m-0 text-white' type='submit'>Update now</motion.button>


                            </div>


                        </motion.section>

                    </section>


                </aside>

            </form>

        </Overlay >

    )
}

export default EditItem