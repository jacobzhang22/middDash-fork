"use client"
import {useState} from 'react';
import PastOrders from './pastOrders';
import AvailableOrders from './availableOrders';
import Link from "next/link";


export default function dasherProfile(){
    const[notify, setNotify] = useState(false)

    const handleNotify = () =>{
        setNotify(!notify)
    }

    return(
        <div>
            <div>
                <h1 className = "font-heading text-5xl text-gray-500 text-center"> Welcome Back Dasher! </h1>
            </div>
                <AvailableOrders />
            <div className = "max-w-md max-h-md mx-auto mt-4 flex flex-col">
                <h2 className = "font-heading text-3xl text-gray-500 text-center">
                <button>Update Payment Information</button>
                </h2>
            </div>
            <div>
                <p className = "font-heading text-3xl text-gray-500 text-center">Contact Me About New Orders:</p>
                <div className = "max-w-md max-h-md mx-auto mt-4 flex flex-col">
                    <input type="checkbox" onClick = {handleNotify}></input>
                </div>
            </div>
            <div className = "max-w-md max-h-md mx-auto mt-4 flex flex-col">
                <button>
                <Link className = "font-heading text-4xl text-red-5000" href= {"/reportConcern"}> Report A Concern </Link>
                </button>
            </div>
        </div>
    )
}
