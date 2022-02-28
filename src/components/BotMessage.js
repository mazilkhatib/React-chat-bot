import { useState,useEffect } from 'react'

import React from 'react'

function BotMessage({botText,botTimeDisplay,getRandomSeconds,ScrollUp}) {

  const [showComponent,setShowComponent] = useState(false)
 
  useEffect(()=>{
    setInterval(()=>{
      setShowComponent(true);
    }, getRandomSeconds);
  },[])

  ScrollUp();

  return <>
      { 
        showComponent && 
        <div>
          <p className='botText'><span>{botText}</span></p>
          <p className='botMessageTime'><span>{botTimeDisplay}</span></p>
        </div> 
      }
      </>
}

export default BotMessage