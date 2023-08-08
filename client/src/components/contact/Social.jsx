import React from 'react'
import { SocialData } from '../../utils/constants'


const Social = () => {

    return (
        <div className='hidden lg:flex flex-row top-[40%] left-0 fixed z-50' data-aos="zoom-in-right" >

            <ul>
                {
                    SocialData.map(({ child, href, style, download, id, delay }) =>

                    (<li key={id} className={`flex justify-between items-center w-[9rem] h-[50px] px-3 hover:duration-300
                 bg-gray-700 ml-[-100px] hover:rounded-md hover:ml-[-4px] duration-300 ${style}`}
                    >

                        <a href={href} target="_blank" rel="noreferrer" download={download} className='w-full  text-white font-bold flex justify-between' >{child}</a>

                    </li>))
                }
            </ul>


        </div >
    )
}

export default Social