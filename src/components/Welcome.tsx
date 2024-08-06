"use client";

import React from 'react'
import './style.css'

const Welcome = () => {
    return (
        <div className='blurModal flex items-center justify-center'>
            <div className='flex flex-col items-center mx-5 gap-2 bg-blue-400 text-white px-6 py-8 rounded-lg'>
                <h1 className='text-2xl text-center'>Bienvenido a ATC Dream Match</h1>
                <h2 className='text-1xl text-center'>Arma un partido de fútbol en donde se enfrenten tus jugadores favoritos</h2>
            </div>
        </div>
    )
}

export default Welcome