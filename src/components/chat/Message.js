import React, { useMemo, useState } from 'react'
import style from './chat.module.css'
import BackIcon from '../../assets/back.svg'
import DeleteIcon from '../../assets/delete.svg'
import SendIcon from '../../assets/send.svg'

const HeaderButton = ({icon, text, onClick}) => {
    return (
        <div className={style.message_button_container} onClick={onClick}>
            <img src={icon} alt="" />
            <span>{text}</span>
        </div>
    )
}


const MessageTile = ({chat,indx, currentUserChat}) => {

    const isSelf = chat.userId == 0
    const showProfileImage = useMemo(()=>{
        return (indx==0) || (currentUserChat?.chatHistory[indx]?.userId !== currentUserChat?.chatHistory[indx-1]?.userId)
    },[chat, indx, currentUserChat])

    return (
        <div className={isSelf ? style.self_message : style.user_message}>
            <img className={`${style.chat_tile_img} ${!showProfileImage && style.pad_message}`} src={currentUserChat.profile_img} alt="" />
            <span className={`${isSelf ? style.self_message_text: style.user_message_text}`}>{chat.message}</span>
        </div>
    )
}

const Message = ({currentUserChat,handleSendMessage,handleRemoveChatHistory, chatContainerRef}) => {

    const [currentMessage, setCurrentMessage] = useState('');
    const handleSendCurrentMessage = () => {
        handleSendMessage(currentMessage)
        setCurrentMessage('')
    }

    return (
        <div className={style.message_container}>
            {currentUserChat && <div className={style.message_header}>
                <div className={style.message_user_info}>
                    <img className={style.chat_tile_img} src={currentUserChat.profile_img} alt="" />
                    <span>{currentUserChat.username}</span>
                </div>
                <div className={style.message_buttons}>
                    <HeaderButton icon={BackIcon} text={"Back"}/>
                    <HeaderButton icon={DeleteIcon} text={"Delete"} onClick={handleRemoveChatHistory}/>
                </div>
            </div>}
            {currentUserChat && <div className={style.message_chat_container}>
                <section className={style.message_chat_history}  ref={chatContainerRef}>
                    {currentUserChat.chatHistory.map((chat,indx)=>{
                        return (
                            <MessageTile chat={chat} indx={indx} currentUserChat={currentUserChat}/>
                        )
                    })}
                </section>
                <section className={style.message_chat_input_container}>
                    <input type="text"  className={style.message_chat_input} onChange={(e)=>setCurrentMessage(e.target.value)} value={currentMessage}/>
                    <img  className={style.message_chat_send} src={SendIcon} alt="" onClick={handleSendCurrentMessage}/>
                </section>
            </div> }
            {!currentUserChat && <h1 className={style.no_conversation}>No Conversation</h1> }
        </div>
    )
}

export default Message