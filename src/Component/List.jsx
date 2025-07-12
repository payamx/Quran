import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchList} from "../redux/ListSlice.jsx";
import SurahItems from "./SurahItems.jsx";

const List = () => {
    const dispatch = useDispatch()
    const {data, isLoading, error} = useSelector((state) => state.list)
    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(fetchList())
        }, 1000)
        return () => {
            clearTimeout(timeout)
        }
    }, []);
    const leftColumnData = data.slice(0, Math.ceil(data.length / 2));
    const rightColumnData = data.slice(Math.ceil(data.length / 2));

    // {'\uFD3E '}
    return (
        <>
            <div className="mx-auto bg-gray-50 dark:bg-gray-700 dark:text-white">
                {/* Mobile View */}
                <div className="sm:hidden">
                    {data?.map((item, index) => (
                        <SurahItems item={item} index={index} key={index}/>
                    ))}
                </div>
                {/* Desktop View */}
                <div className="hidden md:block">
                    <div className="grid grid-cols-2 gap-1 text-start font-arabic">
                        {[leftColumnData, rightColumnData].map((columnData, colIndex) => (
                            <div key={colIndex} className="col-span-1 mx-auto">
                                {columnData?.map((item, index) => (
                                    <SurahItems item={item} index={index} key={index}/>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );

};

export default List;
