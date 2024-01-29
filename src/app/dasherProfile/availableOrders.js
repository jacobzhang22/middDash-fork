"use client"
import {useState, useEffect} from 'react';
import Order from './orders.js'


export default function AvailableOrders(){
    const [activeOrderList, setActiveOrderList] = useState([
        {id: 0, name: "Hugo", location: "Voter", timestamp: 1230, items: ["Chips", "Drink", "Soda"]},
        {id: 1, name: "Dennis", location: "Starr", timestamp: 110, items: ["Cookie", "Cookie", "Cookie"]},
        {id: 2, name: "Lou", location: "Shannon", timestamp: 1934, items: ["Apple", "Banana", "Pear"]},
    ])

    const [pastOrderList, setPastOrderList] = useState([
        {name: "Brian", location: "Home", timestamp: 1100, items: ["Food", "Drink", "Napkin"]},
        {name: "Peter", location: "Away", timestamp: 1130, items: ["Beer", "Wings", "Burger"]},
        {name: "Lois", location: "Town", timestamp: 1200, items: ["Eggs", "Fruit", "Milk"]}
    ])

    const [currentOrder, setCurrentOrder] = useState(0)

    const handleClick = ({target}) =>{
        if(currentOrder === 0){
            setCurrentOrder(`${target.name} ${target.location} ${target.timestamp} ${target.items}`)
            target.remove()
        }
    }

    const doneClick = () => {
        setPastOrderList((prev) => [currentOrder, ...prev])
        setCurrentOrder(0)
    }

    const unfulfilledClick = () => {
        setPastOrderList((prev) => [currentOrder, ...prev])
        setCurrentOrder(0)
    }

    return (
            <div className = "max-w-md max-h-md mx-auto mt-4 flex flex-col">
                <h2 className = "font-heading text-3xl text-gray-500 text-center">Current Order:</h2>
                    {currentOrder !==0 && <p className = "text-2xl text-black-500 text-center">
                        <div >
                        {currentOrder}
                        <button onClick = {doneClick}>Done</button>
                        <button onClick = {unfulfilledClick}>Unfulfilled</button>
                        </div>
                    </p>}
                    {currentOrder ===0 && <p className = "text-2xl text-black-500 text-center">
                        <div className = "max-w-md max-h-md mx-auto mt-4 flex flex-col">
                            No Active Order!
                        </div>
                    </p>}
                <h2 className = "font-heading text-3xl text-gray-500 text-center">Available Orders:</h2>
                <p onClick = {handleClick}>
                    {activeOrderList.map((order) => (
                    <Order orderName = {order.name} orderLocation = {order.location} orderTime = {order.timestamp} orderItems = {order.items} />
                    ))}
                </p>
                <h2 className = "font-heading text-3xl text-gray-500 text-center">Past Orders:</h2>
                <p> 
                    {pastOrderList.map((order) => (
                    <Order orderName = {order.name} orderLocation = {order.location} orderTime = {order.timestamp} orderItems = {order.items} />
                    ))}
                </p>
            </div>
    )

}