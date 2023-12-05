import React, { useCallback, useEffect, useState, useRef } from 'react'
import style from './chat.module.css'
import Contacts from './Contacts'
import Message from './Message'

import { USER_MESSAGES } from '../../constants/contactConstants'
import { generateUniqueBotName, prepareBotConversation } from '../../utils/botUtils'

const Chat = () => {

    const [userChatHistory, setUserChatHistory] = useState(USER_MESSAGES);
    const [currentUserChat, setCurrentUserChat] = useState(null);
    const [currentBots, setCurrentBots] = useState([]);

    const chatContainerRef = useRef(null);

    const handleSendMessage = (message) => {
        const newConversation = { message: message, userId:0};
        const botMessage = prepareBotConversation(currentUserChat.userId);
        setCurrentUserChat({...currentUserChat, chatHistory:[...currentUserChat.chatHistory, { message:message, userId:0}, botMessage]});
    }

    const handleCreateBot = () => {
        const botInformation = {}
        botInformation["username"] = generateUniqueBotName();
        botInformation["userId"] = currentBots.length + 1;
        botInformation["chatHistory"] = [];
        botInformation["userType"] = 'bot';

        setCurrentBots([...currentBots, botInformation]);
    }

    const handleRemoveChatHistory = useCallback(() => {
        if(currentUserChat.userType === 'bot'){
            const updatedBots = currentBots.filter(bot => bot.userId !== currentUserChat.userId)
            setCurrentBots(updatedBots)
            setCurrentUserChat(null)
        }else{
            const updatedChatHistory = userChatHistory.filter(chatHistory => chatHistory.userId !== currentUserChat.userId)
            setUserChatHistory(updatedChatHistory)
            setCurrentUserChat(null)
        }
    },[currentUserChat])

    useEffect(()=>{
        if(currentUserChat){
            if(chatContainerRef){
                chatContainerRef.current.scrollBy({ behavior: "auto", top: 500 })
            }
            if(currentUserChat.userType === 'bot'){
                let updateBost = []
                currentBots.forEach(bot =>{
                    if(bot.userId === currentUserChat.userId){
                        bot.chatHistory = currentUserChat.chatHistory
                    }
                    updateBost.push(bot);
                })

                setCurrentBots(updateBost)
            }else{
                let updateUserConversation = []
                userChatHistory.forEach(user =>{
                    if(user.userId === currentUserChat.userId){
                        user.chatHistory = currentUserChat.chatHistory
                    }
                    updateUserConversation.push(user);
                })

                setUserChatHistory(updateUserConversation)
            }
        }
    },[currentUserChat])

    return (
        <div className={style.chat_container}>
            <Contacts
                userChatHistory={userChatHistory}
                currentUserChat={currentUserChat} 
                setCurrentUserChat={setCurrentUserChat}
                currentBots={currentBots}

                handleCreateBot={handleCreateBot}
            />
            <Message 
                currentUserChat={currentUserChat}
                handleSendMessage={handleSendMessage}
                handleRemoveChatHistory={handleRemoveChatHistory}
                chatContainerRef={chatContainerRef}
            />
        </div>
    )
}

export default Chat