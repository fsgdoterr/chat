import React, { useEffect, useState } from 'react'
import styles from './Search.module.scss';
import Input from '../UI/Input/Input';
import searchSVG from '../../assets/images/search.svg';
import { ReactSVG } from 'react-svg';
import { useDebounce } from '../../hooks/useDebounce';
import { useDebounceFetching } from '../../hooks/useDebouceFetching';
import { useSearch } from '../../hooks/useSearch';
import { UserApi } from '../../http/UserApi';

const Search = () => {

    const {search, setSearch, setChats, setLoading} = useSearch();
    
    const [fetching, isDebounceLoading, isLoading] = useDebounceFetching(async () => {
        if(search) {
            const response = await UserApi.search(search);
            console.log(123);
            setChats(response.data);
        }
    }, search, 1000);

    useEffect(() => {
        setLoading(isDebounceLoading)
    }, [isDebounceLoading]);

    return (
        <div className={styles.search}>
            <Input 
                beforeInput={<ReactSVG src={searchSVG}/>}
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
        </div>
    )
}

export default Search