import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchArApi} from "../redux/ArApiSlice.jsx";
import {useParams} from "react-router-dom";
import PlayAudio from "./PlayAudio.jsx";
import ToggleButton from "./ToggleButton.jsx";
import CopyToClipboard from "./CopyToClipboard.jsx";
import Loading from "./Loading.jsx";

const ArabicSurah = () => {
    const {number, arabic, farsi} = useParams();
    const dispatch = useDispatch();
    const {data, isLoading, error} = useSelector((state) => state.arabic);
    const [show, setShow] = useState({faShow: true, arShow: true})

    // Fa Ar Translation toggling

    const toggleShow = (button) => {
        setShow((prevState) => ({...prevState, [button]: !prevState[button]}));
    };


    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(fetchArApi({number, arabic: 'ar.alafasy', farsi: 'fa.ghomshei'}));
        }, 1000);
        return () => clearTimeout(timeout);
    }, [number]);

    console.log(data, "arabic log")

    return (
        <>
            {isLoading ? <Loading/> :

                <div className="  ">

                <div className="flex justify-around items-center py-10  ">

                <span className=" flex justify-center items-center ">
                      <span className="inline m-2"> فارسی </span>
                        <ToggleButton onToggle={() => toggleShow('faShow')} isActive={show.faShow}/>
                    </span>

                    <span className="flex justify-center items-center  ">
                   <span className="inline p-2">  عربی </span>
                    <ToggleButton onToggle={() => toggleShow('arShow')} isActive={show.arShow}/>
                </span>

                </div>

                    {/*Surah name*/}
                <div className=" relative flex justify-center items-center   text-center font-arabic  ">
                    <img src="/public/png/pngegg.png"
                         className=" bg-white text-center w-3/4 h-3/4 md:w-1/4 md:h-1/4"  alt="surah"/>
                    <strong className=" absolute top-3/5 left-1/2 -translate-x-1/2 -translate-y-1/2  ">
                        {data && data.data[0]?.name}</strong>

                </div>

                <div className=" flex-col justify-start items-center text-start mx-6 ">

                    {data && (
                        data.data[0]?.ayahs?.map((item, index) => (
                            <article key={index} className=" flex-col border-4 mb-8 mx-3 shadow-indigo-700 shadow-lg
                        rounded-xl bg-white ">

                                {show.arShow && (<div className="flex items-center justify-between ">

                                        {/*arabic text*/}
                                        <p className=" p-4 text-gray-800  font-arabic leading-9 w-fit text-sm ">{item?.text}</p>

                                        {/*ayah numbers and audio*/}
                                        <div
                                            className="  xs:flex-col md:flex justify-center items-center   m-2 min-w-10  ">

                                            {/*ayah sign*/}
                                            <div className="relative   ">
                                                <img src="/public/rec-svgrepo-com (13).svg" className="h-9 w-9  "
                                                     alt="ayah"/>
                                                <span
                                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs ">
                                                    {new Intl.NumberFormat('ar-EG').format(item?.numberInSurah)}</span>
                                            </div>

                                            {/* Button to copy both Arabic and Farsi text */}
                                            <div className=" flex justify-center items-center m-2">
                                                <CopyToClipboard arText={item?.text} index={index}
                                                                 faText={data.data[1]?.ayahs[index]?.text}
                                                                 surahNumber={item?.numberInSurah}/>
                                            </div>

                                            <PlayAudio audioProp={item}/>
                                        </div>

                                    </div>
                                )}

                                {/* Conditionally render Farsi response */}
                                {show.faShow && (
                                    <blockquote className="p-4 font-farsi leading-8 text-sm text-gray-500">
                                        <p>{data.data[1]?.ayahs[index]?.text}</p>
                                    </blockquote>
                                )}
                            </article>
                        ))
                    )}
                </div>

    </div>
            }
        </>
    );
};

export default ArabicSurah;
