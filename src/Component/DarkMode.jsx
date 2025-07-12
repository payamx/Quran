import {useEffect, useState} from "react";
import { PiSunDimFill } from "react-icons/pi";
import {FaMoon} from "react-icons/fa";
import {useParams} from "react-router-dom";

const DarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("darkMode"));

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);

        isDarkMode ? localStorage.theme = 'light' : localStorage.theme = 'dark'

        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        console.log("them is", localStorage.theme)
        console.log("class is ", document.documentElement.classList)


    };

    return (
        <>
            <div className=" flex p-2  dark:bg-gray-700 dark:text-white ">
                {
                    window.location.pathname.includes("surah") && <div className="   inline-flex ">pooo</div>

                }


                <button
                    onClick={toggleDarkMode}
                    className="relative w-9 h-9 flex items-center justify-center"
                >
                    {/* Sun Icon */}
                    <div
                        className={`absolute transition-all duration-700 ease-in-out transform ${
                            isDarkMode
                                ? 'opacity-100 rotate-0 scale-110'
                                : 'opacity-0 -rotate-90 scale-75 pointer-events-none'
                        }`}
                    >
                        <PiSunDimFill
                            color="white"
                            className="bg-amber-400 w-8 h-8 rounded-full border-4 border-amber-200"
                        />
                    </div>

                    {/* Moon Icon */}
                    <div
                        className={`absolute transition-all duration-700 ease-in-out transform ${
                            !isDarkMode
                                ? 'opacity-100 rotate-0 scale-110'
                                : 'opacity-0 rotate-90 scale-75 pointer-events-none'
                        }`}
                    >
                        <FaMoon
                            color="white"
                            className="bg-slate-700 w-8 h-8 rounded-full border-4 border-slate-400 p-1"
                        />
                    </div>
                </button>

            </div>


        </>

    );
};
export default DarkMode;