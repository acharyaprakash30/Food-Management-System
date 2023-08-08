import React from 'react'
import DBLeft from './DBLeft'
import DBRight from './DBRight'

const Dashboard = () => {


    return (

        <div className='w-screen h-screen flex bg-[rgb(55,65,81)]'>

            <DBLeft />
            <DBRight />

        </div>


    )
}

export default Dashboard