import {useEffect, useState} from "react";

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
        console.log( "them is",localStorage.theme)
        console.log("class is ",document.documentElement.classList)


    };


    return (
        <>
            <div className="p-2  dark:bg-gray-700 dark:text-white flex">

                <button
                    className={` w-16 h-8 rounded-full ${
                        isDarkMode ? "bg-gradient-to-r from-green-400" : "bg-gray-200"
                    }`}
                    onClick={toggleDarkMode}
                >
      <span className={`${isDarkMode ? "translate-x-9" : "translate-x-0"} inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform mr-9 mt-1`}></span>
                </button>

            </div>


        </>

    );
};
export default DarkMode;