import {memo, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchArApi} from "../redux/ArApiSlice.jsx";
import {Link, useParams} from "react-router-dom";
import PlayAudio from "./PlayAudio.jsx";
import ToggleButton from "./ToggleButton.jsx";
import CopyToClipboard from "./CopyToClipboard.jsx";
import Loading from "./Loading.jsx";
import Translation from "./Translation.jsx";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import {IoIosSettings} from "react-icons/io";


const Surah = () => {

    const {number, arabic, farsi} = useParams();
    const dispatch = useDispatch();
    const {data, isLoading, error} = useSelector((state) => state.arabic);


    // Fa-Ar Translation toggling
    const [show, setShow] = useState({faShow: true, arShow: true})

    //audio states
    const audioRef = useRef(new Audio());
    const [currentAudio, setCurrentAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // modify surah translation state
    const [translation, setTranslation] = useState({
        arabic: 'ar.alafasy',
        farsi: localStorage.getItem('translationPreference') || 'fa.ghomshei',
    })

    //toggle button update to hide/show translation
    const toggleShow = (button) => {
        setShow((prevState) => ({...prevState, [button]: !prevState[button]}));
    };

    // تنظیمات سوره
    const contentRef = useRef(null);
    const handleToggle = () => {
        contentRef.current&&
        contentRef.current.style.display === "none"?
            contentRef.current.style.display = "block":
            contentRef.current.style.display = "none";

    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(fetchArApi({number, arabic: translation.arabic, farsi: translation.farsi}));
        }, 500);
        return () => clearTimeout(timeout);
    }, [number, translation]);



    return (
        <>
            <div className="dark:bg-gray-700 dark:text-white min-h-full flex flex-col ">

                {/*back button*/}
                <div className=" inline-flex  dark:bg-gray-700  absolute   left-2 top-2 items-start w-8 h-8 ">
                    <Link to={`/`} target={"_parent"}> <img src="/back.svg"/> </Link>
                </div>

                <div className="">

                    <button
                        onClick={handleToggle}
                        className="  text-xl px-4 py-2 rounded-md top-2 absolute left-1/2 transform -translate-x-1/2 mb-2 ">
                    <span className="flex justify-between items-center w-8 h-8">
                            <IoIosSettings/>
                    </span>

                    </button>
                    {/*wrapping setting*/}
                    <div className=" m-8  " style={{display: "none", marginTop: "10px"}} ref={contentRef}>
                        {/*Ar audio & Fa Text selection*/}
                        <div className="flex justify-center items-center ">
                            <Translation translation={translation} setTranslation={setTranslation}/>
                        </div>

                        {/*loading component*/}

                        <div className=" dark:bg-gray-700 dark:text-white  ">

                            <div className="flex justify-around items-center py-10  ">

                                {/*Ar-Fa Display toggle buttons */}

                                <span className=" flex justify-center items-center ">
                      <span className="inline m-2"> فارسی </span>
                        <ToggleButton onToggle={() => toggleShow('faShow')} isActive={show.faShow}/>
                    </span>

                                <span className="flex justify-center items-center  ">
                   <span className="inline p-2">  عربی </span>
                    <ToggleButton onToggle={() => toggleShow('arShow')} isActive={show.arShow}/>
                </span>

                            </div>
                        </div>

                    </div>


                    {/*Surah name*/}
                    <div
                        className=" relative flex justify-center items-center   text-center font-arabic  text-gray-950 bg-transparent">
                        <img src="/png/pngegg.png"
                             className=" bg-transparent text-center w-3/4 h-3/4 md:w-1/4 md:h-1/4 " alt="surah"/>
                        <strong
                            className=" absolute mt-2 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:text-white ">
                            {data && data.data[0]?.name}</strong>

                    </div>

                    <div className=" flex-col justify-start items-center text-start mx-6 ">

                        {data && (data.data[0]?.ayahs?.map((item, index) => (<article key={index} className=" flex-col   mb-8 mx-3  drop-shadow-lg
                        rounded-xl bg-white dark:bg-gray-900 ">

                                    {show.arShow && (<div className="flex items-center justify-between ">

                                        {/*arabic text*/}
                                        <p className=" p-4 text-gray-800  font-arabic leading-9 w-fit text-sm  dark:text-white">{item?.text}</p>

                                        {/*ayah numbers and audio*/}
                                        <div className="  xs:flex-col md:flex justify-center items-center

                                              m-2 min-w-10 text-center   ">

                                            {/*ayah sign*/}
                                            <div className="relative   ">
                                                <img src="/star-badge-svgrepo-com%20(4).svg"
                                                     className="h-12 w-12 text-xs "
                                                     alt="ayah"/>
                                                <span
                                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-center ">
                                                    {new Intl.NumberFormat('ar-EG').format(item?.numberInSurah)}</span>
                                            </div>

                                            {/* Button to copy both Arabic and Farsi text */}
                                            <div className=" flex justify-center items-center m-2 ">
                                                <CopyToClipboard arText={item?.text} index={index}
                                                                 faText={data.data[1]?.ayahs[index]?.text}
                                                                 surahNumber={item?.numberInSurah}/>
                                            </div>

                                            <PlayAudio audiolist={data.data[0]?.ayahs}
                                                       index={index}
                                                       audioRef={audioRef}
                                                       setCurrentAudio={setCurrentAudio}
                                                       currentAudio={currentAudio}
                                                       setIsPlaying={setIsPlaying}
                                                       isPlaying={isPlaying}
                                            />
                                            {/*<AudioPlayer audioSrc={item}/>*/}
                                        </div>

                                    </div>)}

                                    {/* Conditionally render Farsi response */}
                                    {show.faShow && (<blockquote
                                            className="p-4 font-farsi leading-8 text-sm text-gray-500 dark:text-white">
                                            <p>{data.data[1]?.ayahs[index]?.text}</p>
                                        </blockquote>

                                    )}

                                </article>


                            ))

                        )}
                    </div>
                    {/*{data && <div>*/}
                    {/*        <AudioPlayer src={data.data[0]?.ayahs} autoPlay={true}  ref={audioRef}/>*/}
                    {/*    </div>}*/}

                </div>

            </div>
        </>
    );
};

export default memo(Surah);
