import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <section className=' fixed z-50 w-screen h-screen bg-gray-200'>
            <div className="flex flex-col items-center justify-center h-screen  -mt-10">
                <h1 className="text-5xl md:text-7xl font-bold text-gray-800">404</h1>
                <p className="text-2xl md:text-4xl text-gray-600 mt-4">Page Not Found</p>
                <p className="text-xl md:text-2xl text-gray-600 mt-2">The requested page could not be found.</p>
                <Link to="/" className=" hover:text-primary mt-4 text-[15px] md:text-lg bg-blue-600 hover:bg-opacity-90 text-white md:py-2   py-[5px] px-5 md:px-8 rounded-md font-semibold">Go back to home</Link>
            </div>
        </section>

    )
}

export default PageNotFound