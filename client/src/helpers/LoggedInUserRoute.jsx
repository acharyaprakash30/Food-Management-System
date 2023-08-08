import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MainLoader from '../animations/MainLoader'

const LoggedInUserRoute = ({ children }) => {

    const { userData } = useSelector(state => state.currUser)
    const navigate = useNavigate('/')
    const token = localStorage.getItem('userToken')

    useEffect(() => {


        if (!token && !userData) {
            setTimeout(() => {
                navigate('/')
            }, 300);
        }


    }, [userData, navigate, token])



    if ((!userData && !token))
        return (

            <div className='w-screen h-screen bg-gradient-to-b from-purple-100  to-gray-50 '>
                <MainLoader />
            </div>

        )

    if (!token && !userData)
        return (

            <div className='w-screen h-screen bg-gradient-to-b from-purple-100  to-gray-50 '>
                <MainLoader />
            </div>

        )

    return (

        <>
            {children}

        </>

    )
}

export default LoggedInUserRoute