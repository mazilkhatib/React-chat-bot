import { useState,useEffect } from 'react'

import React from 'react'

function BotMessage({botText,botTimeDisplay,getRandomSeconds}) {

  const [showComponent,setShowComponent] = useState(false)
 
  useEffect(()=>{
    setInterval(()=>{
      setShowComponent(true);
    }, getRandomSeconds);
  },[])

  document.getElementById("chat-bar-bottom").scrollIntoView(true);

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