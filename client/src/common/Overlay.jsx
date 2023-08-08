import React, { useEffect } from 'react';

const Overlay = ({ children, onClick }) => (

    <>
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-black opacity-80  w-screen h-screen " onClick={onClick}></div>

        {children}


    </>

);
export default Overlay


export const CartOverlay = ({ children, onClick }) => {
    useEffect(() => {
        document.querySelector('html').style.overflow = 'hidden'

        return () => {
            document.querySelector('html').style.overflow = 'auto'
        }



    }, [])


    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-40 bg-black opacity-40  w-screen h-screen " onClick={onClick}></div>

            {children}
        </>

    )
}




