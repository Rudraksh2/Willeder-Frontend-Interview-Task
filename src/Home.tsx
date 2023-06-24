/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import LogoutButton from './Logout';
import useLazyLoad from './useLazyLoad';
import clsx from "clsx";

import './Home.css';

const NUM_PER_PAGE = 6;
const TOTAL_PAGES = 3;
const API  = "https://api.instantwebtools.net/v1/passenger?page=0&size=10";

const Home = () => {

    const triggerRef = useRef(null);
    const onGrabData = (currentPage: number) => {
        // This would be where you'll call your API
        return new Promise((resolve) => {
        setTimeout(() => {
            const data = apiData.slice(
            ((currentPage - 1)%TOTAL_PAGES) * NUM_PER_PAGE,
            NUM_PER_PAGE * (currentPage%TOTAL_PAGES)
            );
            console.log(data);
            resolve(data);
        }, 3000);
        });
    };
    const options = {};
    const { data, loading } = useLazyLoad({ triggerRef, onGrabData, options });

    const [isLoading, setIsLoading] = useState(true);
    const [apiData,setData] = useState<any[]>([]);

    const fetchApiData = async(url: string) => {
        try {
            const res = await fetch(url);
            const newData = await res.json();
            setData(newData.data);
            setIsLoading(false);
            
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        fetchApiData(API);
    },[])

    if(isLoading)
    {
        return (
            <div>
                <h1>Loading ...</h1>
            </div>
        )
    }

    return (
        <div>
            <LogoutButton />
            <div className='div-style'><h1>Home Page</h1></div>
            <>{data.map((ele: { _id: string; name: string }) => {
                return (
                    <div className='div-style'>
                        <h2>{ele._id} - {ele.name}</h2>
                    </div>
                )
            } )}</>
            <div ref={triggerRef} className={clsx("trigger", { visible: loading })}>
                <div className='div-style'> <h2>Loading ...</h2></div>
            </div>
        </div>
    )
}

export default Home;
