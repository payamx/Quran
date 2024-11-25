import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchArApi} from "../redux/ArApiSlice.jsx";
import {Link, useParams} from "react-router-dom";
import PlayAudio from "./PlayAudio.jsx";
import ToggleButton from "./ToggleButton.jsx";
import CopyToClipboard from "./CopyToClipboard.jsx";
import Loading from "./Loading.jsx";

const Surah = () => {
    const {number, arabic, farsi} = useParams();
    const dispatch = useDispatch();
    const {data, isLoading, error} = useSelector((state) => state.arabic);
    const [show, setShow] = useState({faShow: true, arShow: true})
    // Fa Ar Translation toggling
    const [translation, setTranslation] = useState({arabic:'ar.alafasy',farsi:'fa.ghomshei'})
    const handleTranslationChange = (property, newValue) => {
        setTranslation((prevTranslation) => ({
            ...prevTranslation,
            [property]: newValue,
        }));
    };
    const toggleShow = (button) => {
        setShow((prevState) => ({...prevState, [button]: !prevState[button]}));
    };


    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(fetchArApi({number, arabic: translation.arabic, farsi: translation.farsi}));
        }, 500);
        return () => clearTimeout(timeout);
    }, [number,translation]);

    console.log(data, "arabic log")

    return (
        <>

            <div className=" inline-flex  dark:bg-gray-700  absolute   left-2 top-2 items-start w-8 h-8 ">
                <Link to={`/`} target={"_parent"}> <img src="/back.svg"/></Link>
            </div>
            <div className="flex justify-start items-center">
                <select onChange={(e) => handleTranslationChange('farsi', e.target.value)}>
                    <option className="" value="fa.ghomshei"  >قمشه ای</option>
                    <option className="" value="fa.fooladvand">فولادوند</option>
                    <option className="" value="fa.ansarian">انصاریان</option>
                    <option className=""value="fa.makarem">مکارم</option>
                    <option className=""value="fa.khorramshahi">خرمشاهی</option>
                    <option className=""value="fa.gharaati">قرائتی</option>
                </select>
            </div>

            {/*loading component*/}
            {isLoading ? <Loading/> :

                <div className=" dark:bg-gray-700 dark:text-white  ">

                    <div className="flex justify-around items-center py-10  ">

                        {/*languages toggle buttons */}

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
                    <div
                        className=" relative flex justify-center items-center   text-center font-arabic  text-gray-950 bg-transparent">
                        <img src="/png/pngegg.png"
                             className=" bg-transparent text-center w-3/4 h-3/4 md:w-1/4 md:h-1/4 " alt="surah"/>
                        <strong
                            className=" absolute mt-2 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:text-white ">
                            {data && data.data[0]?.name}</strong>

                    </div>

                    <div className=" flex-col justify-start items-center text-start mx-6 ">

                        {data && (
                            data.data[0]?.ayahs?.map((item, index) => (
                                <article key={index} className=" flex-col   mb-8 mx-3  drop-shadow-lg
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

                                                <PlayAudio audioProp={item}/>
                                            </div>

                                        </div>
                                    )}

                                    {/* Conditionally render Farsi response */}
                                    {show.faShow && (
                                        <blockquote
                                            className="p-4 font-farsi leading-8 text-sm text-gray-500 dark:text-white">
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

export default Surah;
