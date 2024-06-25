import React, { useContext, useEffect, useState } from 'react'
import { Navbar } from '../TopNavigationTab/navbar'
import { LoginContext } from './context';

export const Main = () => {
    return (
        <>
            <Navbar />
            <br></br>
            <br></br>
            <br></br>
            <br />
            <br />
            <div className='mt-24 bg-red-500 wrapper'>
                <h1 className='text-center text-2xl font-bold '>Learnyst, Making exam taking easy</h1>
                <p className='text-center max-w-xl' style={{fontSize:'20px'}}>
                An online examination portal revolutionizes assessments by offering secure, efficient, and accessible testing solutions for both educators and students.
                </p>

                <br />
                <br />

                <div className='my__container flex gap-10 items-center'>
                    <div className='border border-gray-500 p-4 rounded-lg w-full hero__card'>
                        <h3 className='text-xl'>One stop Online examination portal </h3>
                        <p>An online examination portal also enables practice tests,view your results for the test!!</p>

                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkhFGJtKVeopH9Ln1M2bnI-Mq4desm5WahmQ&s" alt="card-image" />
                    </div>
             

                    <div className='border border-gray-500 p-4 rounded-lg  w-full hero__card'>
                        <h3 className='text-xl'>Advantages!!</h3>
                        <p>A one stop destination to take test from where ever you are !!! </p>

                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkhFGJtKVeopH9Ln1M2bnI-Mq4desm5WahmQ&s" alt="card-image" />
                    </div>

                    <div className='border border-gray-500 p-4 rounded-lg  w-full hero__card'>
                        <h3 className='text-xl'>Results!!</h3>
                        <p>Realtime progress tracking with immediate results!!</p>

                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkhFGJtKVeopH9Ln1M2bnI-Mq4desm5WahmQ&s" alt="card-image" className='' />
                    </div>
                </div>

            </div>
        </>
    )
}
