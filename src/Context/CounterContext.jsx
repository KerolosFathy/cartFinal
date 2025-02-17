import { createContext } from "react";
import { useState } from "react";
export let CounterContext = createContext()

export default function CounterContextprovider(props){
        const [counter,setcounter] =useState(0)
        function changecounter(){
            setcounter(Math.random())
        }

    return <CounterContext.Provider value={{counter,changecounter}}>
            {props.children}
         </CounterContext.Provider>
    
}