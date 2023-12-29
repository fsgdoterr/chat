import React, { FC, useEffect, useState } from 'react'
import styles from './SidebarChat.module.scss'
import IUser from '../../types/models/IUser'
import IMessage from '../../types/models/IMessage';
import { useFetching } from '../../hooks/useFetching';
import { MessagesApi } from '../../http/MessagesApi';
import dayjs from 'dayjs';
import defaultAvatar from '../../assets/images/default-avatar.jpg';

interface SidebarChatProps {
    chat: IUser;
    selected: boolean;
    onClick: (chat: IUser) =>  void;
}

const SidebarChat: FC<SidebarChatProps> = ({
    chat,
    selected,
    onClick
}) => {

    const [lastMessage, setLastMessage] = useState<IMessage | null>(null);

    const [fetching] = useFetching(async () => {
        const response = await MessagesApi.getLastMessage(chat.id);
        setLastMessage(response.data);
    });

    useEffect(() => {
        fetching();
    }, [])

    const message = lastMessage ? lastMessage.body || `Atachments: ${lastMessage.attachments.length}` : '';
    const viewed = lastMessage ? lastMessage.viewed && lastMessage.receiverId === chat.id : false;

    const currDate = new Date().setHours(0, 0, 0, 0);

    const time = lastMessage
        ? new Date(lastMessage.createdAt).getTime() > currDate 
        ? dayjs(lastMessage.createdAt).format('HH:mm') 
        : dayjs(lastMessage.createdAt).format('DD.MM.YYYY')
        : '';
    
    const chatClasses = [styles.chat];
    if(selected) chatClasses.push(styles.selected);

    return (
        <div className={chatClasses.join(' ')} onClick={() => onClick(chat)}>
            <img 
                src={chat.avatar || defaultAvatar}
                width={50}
                height={50} 
                alt=""
            />
            <div className={styles.body}>
                <div className={styles.name}>{chat.name}</div>
                {lastMessage &&
                    <div className={[styles.message, viewed && styles.viewed].join(' ')}>
                        <div className={styles.messageBody}>{message}</div>
                        <div className={styles.messageTime}>{time}</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default SidebarChat