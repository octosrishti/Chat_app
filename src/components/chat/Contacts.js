import React, { useMemo } from 'react'
import style from './chat.module.css'
import ChatIcon from '../../assets/chat.svg'
import AddIcon from '../../assets/add.svg'

const ChatTile = ({chartTileData, currentUserChat, setCurrentUserChat}) => {

    const chatHistoryLength = useMemo(()=>{
        return chartTileData.chatHistory.length
    },[chartTileData])

    const isActiveChat = useMemo(()=>{
        return ( currentUserChat?.userId === chartTileData.userId ) && ( currentUserChat?.userType === chartTileData.userType )
    },[currentUserChat, chartTileData])

    return (
        <div key={chartTileData.userId} className={`${style.chat_tile_container} ${isActiveChat ? style.chat_tile_selected: ''}`}  onClick={()=>setCurrentUserChat(chartTileData)}>
            <img className={style.chat_tile_img} src={chartTileData.profile_img} alt="" />
            <div className={style.chat_tile_content}>
                <span className={style.chat_tile_user}>{chartTileData.username}</span>
                {chatHistoryLength > 0 && <span className={style.chat_tile_message}>{chartTileData.chatHistory[chatHistoryLength-1].message}</span>}
            </div>
        </div>
    )
}

const Contacts = ({userChatHistory,currentUserChat,setCurrentUserChat,currentBots,handleCreateBot}) => {
  return (
    <div className={style.contacts_container}>
        <span className={style.contact_header}>All Your Chats</span>
        <div className={style.contact_chat_images}>
            <img src={ChatIcon} alt="" />
            <span>Chat Images : ON</span>
        </div>
        <span className={style.contact_chat_subheading}>When a bot sends you images, you will be charged one secondary image</span>
        {userChatHistory && <div className={style.chat_history}>
            {userChatHistory.map(userChat => {
                return (
                    <ChatTile key={userChat.userId} chartTileData={userChat} currentUserChat={currentUserChat} setCurrentUserChat={setCurrentUserChat} />
                )
            })}
        </div>}

        <div className={style.divider}></div>

        <span onClick={handleCreateBot} className={style.create_bot_button}>
            <img src={AddIcon} alt="" />
            Create New Bot
        </span>
        {currentBots && <div className={style.chat_history}>
            {currentBots.map(bot => {
                return <ChatTile key={bot.userId} chartTileData={bot}  currentUserChat={currentUserChat} setCurrentUserChat={setCurrentUserChat}/>
            })}
        </div>}
    </div>
  )
}

export default Contacts