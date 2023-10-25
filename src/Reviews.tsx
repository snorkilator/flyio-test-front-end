// This file contains all the customer reviews
// It is linked to in the menu bar and route to using react-router-dom

import {useEffect} from "react"

function Reviews(){
    useEffect(()=>console.log(localStorage.getItem("form")),[])
    return(<h1>Reviews page</h1>)
}

export default Reviews