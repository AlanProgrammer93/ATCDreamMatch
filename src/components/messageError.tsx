import React from 'react'
import { BiError } from 'react-icons/bi'
import './style.css'

interface Props {
    setMsg: (value: string) => void;
    msg: string
}

const MessageError = ({ msg, setMsg }: Props) => {
    return (
        <div className='blurModal'>
            <div className='msgErrorContainer'>
                <div className='msgErrorBackground'>
                    <BiError />
                </div>
                <p>{msg}</p>
                <button className="hover:bg-red-500 rounded-lg text-white bg-red-400 px-5 py-1 mt-4" onClick={() => setMsg('')}>Aceptar</button>
            </div>
        </div>
    )
}

export default MessageError