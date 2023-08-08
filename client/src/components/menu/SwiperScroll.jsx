import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { MenuCategory } from '../../utils/constants';
import { motion } from 'framer-motion';
import { straggerFadeInOut } from '../../animations/index';

const SwiperScroll = ({ category, handleFilter }) => {
    const [slidesPerView, setSlidesPerView] = useState(4);


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1240) {
                setSlidesPerView(5);
            } else if (window.innerWidth > 768 && window.innerWidth < 1024) {
                setSlidesPerView(5);
            }
            else if (window.innerWidth > 500)
                setSlidesPerView(4)
            else {
                setSlidesPerView(3)
            }
        };


        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial slidesPerView based on the current width

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Swiper centeredSlides={false} grabCursor={true} slidesPerView={slidesPerView} spaceBetween={30} className="mySwiper  "  >

            {MenuCategory.map((item, index) => (

                <SwiperSlide key={item.id} className=' mx-auto'>
                    <CategoryCard item={item} index={index} category={category} handleFilter={handleFilter} />
                </SwiperSlide>
            ))}



        </Swiper>
    )
}

export default SwiperScroll




export const CategoryCard = ({ item, index, category, handleFilter }) => {
    const handleClick = () => {
        handleFilter(item.category);
    };

    return (
        <motion.div key={index} {...straggerFadeInOut(index)} className={`hover:bg-red-600 hover:text-white  border-gray-300 border-2    group sm:w-28 min-w-[60px] cursor-grab rounded-lg  pt-2 pb-1 ${category === item.category ? 'bg-red-500 border-transparent ' : 'bg-stone-100 '} justify-center gap-4 `} onClick={handleClick}>
            <div className={`w-14 flex-col mx-auto h-14 rounded-full shadow-md flex items-center justify-center  group-hover:bg-white ${category === item.category ? 'bg-white border-none' : ''}`} >
                <img src={item.image} className='object-contain w-full h-full ' alt="Food Item" />
            </div>
            <p className={`text-center text-[14px] pt-2  text-textColor  font-semibold group-hover:text-white ${category === item.category && 'text-white'} `} >{item.category.toUpperCase()}</p>

        </motion.div>
    );
};