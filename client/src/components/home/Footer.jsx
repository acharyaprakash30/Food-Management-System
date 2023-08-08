import React from 'react'
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FooterItems } from '../../utils/constants'


const Footer = () => {
    return (

        <footer className='w-full lg:h-370 bg-[rgb(18,22,24)] '>


            <div className='text-white my-auto flex flex-col h-full pt-6 pb-4 sm:py-10 gap-12 sm:gap-16'>

                <h1 className='text-3xl sm:text-4xl flex gap-3 sm:gap-4 font-semibold  mx-auto pt-6'>
                    <span>GET FOOD</span>
                    <span className='bg-orange-600 text-black px-3 rounded-sm -mt-1 py-1 tracking-wide'>DELIVERED</span>
                </h1>

                <aside className='grid grid-cols-2 lg:flex w-full lg:w-4/5 mx-auto  '>
                    {
                        FooterItems.map(item =>
                            <div className='flex-1 flex flex-col' key={item.id}>
                                <LazyLoadImage src={item.image} className='object-cover w-[75px] xs:w-24  mx-auto' alt='footer' effect='opacity' />
                                <p className='text-center text-base xs:text-xl py-6 px-2'>{item.title}</p>
                            </div>)
                    }

                </aside>


            </div>


        </footer>

    )
}

export default Footer