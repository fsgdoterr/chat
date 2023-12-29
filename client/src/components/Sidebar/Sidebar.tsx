import React from 'react'
import styles from './Sidebar.module.scss';
import Button from '../UI/Button/Button';
import menuSVG from '../../assets/images/menu.svg';
import { ReactSVG } from 'react-svg';
import Search from '../Search/Search';
import { useSearch } from '../../hooks/useSearch';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import SidebarChat from '../SidebarChat/SidebarChat';
import IUser from '../../types/models/IUser';
import { setSelected } from '../../store/slices/chat.slice';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const {search, searchedChats} = useSearch();
    const chats = useAppSelector(state => state.account.user?.chats);
    const selectedChat = useAppSelector(state => state.chat.selected);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const sidebarChats = search ? searchedChats : chats || [];

    const selectChat = (chat: IUser) => {
        dispatch(setSelected(chat.id));
        navigate(chat.id);
    }

    return (
        <div className={styles.sidebar}>
            <header className={styles.sidebarHeader}>
                <Button 
                    onClick={() => console.log('open')}
                    transparent
                >
                    <ReactSVG src={menuSVG} />
                </Button>
                <Search />
            </header>
            <section className={styles.chats}>
                {sidebarChats.map(chat => 
                    <SidebarChat 
                        key={chat.id} 
                        chat={chat} 
                        selected={selectedChat === chat.id} 
                        onClick={selectChat}
                    />
                )}
            </section>
        </div>
    )
}

export default Sidebar