import {useEffect} from "react";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {fetchList} from "../redux/ListSlice.jsx";
import SurahList from "./SurahList.jsx";

const List = () => {
    const dispatch = useDispatch()
    const {data, isLoading, error} = useSelector((state) => state.list)
    const navigate = useNavigate();
    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(fetchList())
        }, 1000)
        return () => {
            clearTimeout(timeout)
        }
    }, []);
    console.log(data, "list surah")
    const leftColumnData = data.slice(0, Math.ceil(data.length / 2));
    const rightColumnData = data.slice(Math.ceil(data.length / 2));

    // {'\uFD3E '}
    return (
        <>

            <div className="mx-auto">
                <div className="  bg-gray-50  ">

                    <div className="  sm:hidden ">

                        {data && data?.map((item, index) => (
                            <SurahList item={item} index={index} key={index}/>
                        ))}
                    </div>

                    <div className="hidden md:block">
                        <div className="    grid grid-cols-2 gap-1  text-start  font-arabic">
                            <div className="col-span-1 ">
                                {leftColumnData?.map((item, index) => (
                                    <SurahList item={item} index={index} key={index}/>

                                ))}
                            </div>
                            <div className="col-span-1 mx-auto">
                                {rightColumnData?.map((item, index) => (
                                    <SurahList item={item} index={index} key={index}/>

                                ))}
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </>
    );

};

export default List;
