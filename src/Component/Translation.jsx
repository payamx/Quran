import React, {useEffect, useState} from 'react';
import {FetchApi} from "../Axios.jsx";

const Translation = () => {

    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await FetchApi.get("/edition/language/fa");
            setData(response.data)
            console.log(response?.data ,"tanslattion");
        } catch (error) {
            // Handle error
            console.error(error, "tanslattion component error");
        }
    };

    useEffect(() => {
        fetchData()
    }, []);






    return (
        <div>

        </div>
    );
};

export default Translation;
