import React,{useState} from 'react';
import BotMessage from './BotMessage';
import './style.css'

const Chatbot = () => {

  const getLocalData = () => {
        const lists = localStorage.getItem("myMessageList");
      
        if (lists) {
          return JSON.parse(lists);
        } else {
          return [];
        }
  };  

  const [style, setStyle] = useState("content");
  const [items, setItems] = useState(getLocalData());
  const [userInput,setUserInput] = useState("");
  
  const changeStyle = () => {

        if(style==='content'){
            setStyle("content1");
            
        }else{
            setStyle("content");
        }
   };


   const addMessage = (value) => {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        userText: value.toString(),
        userTimeDisplay: getCurrentMessageTime().toString(),
        botText: getBotResponse(value).toString(),
        botTimeDisplay: getCurrentMessageTime().toString(),
        getRandomSeconds: getRandomSeconds(1000,2000),
        deleteItem: deleteItem

      };
      setItems([...items, myNewInputData]);
      
   }

   const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  // remove all the elements
    const removeAll = () => {
        setItems([]);
    };
 

   const getBotResponse = (input) => {
        if (input) {
            return "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, quibusdam.";
        }
        
    }

   const getCurrentMessageTime = () => {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+ minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
   }

   const getRandomSeconds = (min, max) => {
        return Math.random() * (max - min) + min;
   }
  
   const sendMessage = () =>{
        if(userInput){
            addMessage(userInput)
        }
        document.getElementById("chat-bar-bottom").scrollIntoView(true);
   }

  return (
      <>
      <div className="chat-bar-collapsible">
        <button id="chat-button" type="button" className="collapsible" onClick={changeStyle}>
            Let's start a conversation! <i id="chat-icon" style={{color: '#fff'}} className="fa-solid fa-robot" ></i>
        </button>

        <div className={style}>
            <div className="full-chat-block">
                
                {/* <!-- Message Container --> */}
                <div className="outer-container">
                    <div className="chat-container">
                        
                        {/* <!-- Messages --> */}
                        <div id="chatbox">
                            <h5 id="chat-timestamp">{getCurrentMessageTime()}</h5>
                            {/* <p id="botStarterMessage" className="botText"><span>Loading...</span></p> */}
                            {/* <MessageArea MessageList = {items} /> */}

                            {items.map((item)=>{ 
                                console.log(item)
                                return(
                                    <div className='user_message_area' key={item.id} id={item.id}>
                                    <p className='userText'>
                                        <span>{item.userText}</span>
                                        <i className = 'fa fa-fw fa-trash' onClick={()=>deleteItem(item.id)}></i>
                                    </p>
                                    <p className='messageTime'><span>{item.userTimeDisplay}</span></p>

                                     <BotMessage botText={item.botText} botTimeDisplay={item.botTimeDisplay} getRandomSeconds={item.getRandomSeconds} />  

                                    </div>
                                );
                            })}
                        </div>

                        {/* <!-- User input box --> */}
                        <div className="chat-bar-input-block">
                            <div id="userInput">
                                <input id="textInput" className="input-box" type="text" name="msg"
                                    placeholder="Tap 'Enter' to send a message"  
                                    onChange={(e)=>{
                                        setUserInput(e.target.value);
                                    }}
                                    onKeyPress={(e) => {
                                        if(e.key==='Enter')
                                        {
                                            sendMessage();
                                        }
                                    }
                                } />
                                
                                <p></p>
                            </div>

                            <div className="chat-bar-icons">
                                <i id="chat-icon" style={{color: '#333'}} className="fa-solid fa-paper-plane"
                                    onClick={sendMessage}></i>
                                <i id="chat-icon" style={{color: 'crimson'}} className="fa fa-fw fa-trash" 
                                    onClick={removeAll}></i> 
                            </div>
                        </div>

                        <div id="chat-bar-bottom">
                            <p></p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
    </>
    
  )
}

export default Chatbot