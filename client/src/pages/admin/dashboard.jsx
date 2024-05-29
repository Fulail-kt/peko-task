import React from 'react'
import Navbar from '../../components/navbar'

const Dashboard = () => {
  return (
    <>
    <div className='w-full min-h-screen'>
    <Navbar/>
      <div className='w-full h-full flex justify-center items-center'><p>This is admin Dashboard</p></div>
    </div>
    </>
  )
}

export default Dashboard
