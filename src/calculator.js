import  {useState } from 'react';
import './App.css';

export default function Display({res,exp}){
   
    return(
        <>
        <textarea id = "display" rows="2" cols="35" value ={res+"\n"+exp} readOnly>
            
        </textarea>
        </>
    );
}

