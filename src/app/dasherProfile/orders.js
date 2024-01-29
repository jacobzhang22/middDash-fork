'use client'
import {useState} from 'react'

export default function Order({orderId, orderName, orderLocation, orderTime, orderItems}){
    const[name, setName] = useState(orderName)
    const[location, setLocation] = useState(orderLocation)
    const[timestamp, setTimestamp] = useState(orderTime)
    const[items, setItems] = useState(orderItems)
    const [id, setId] = useState(orderId)


    return (
        <div className = 'text-center text-2xl'>
            {name}
            {location}
            {timestamp}
            {items} 
        </div>

    )
}