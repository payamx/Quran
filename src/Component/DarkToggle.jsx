import {useEffect, useState} from "react";

const DarkToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(null);
    useEffect(() => {

        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.body.classList.add('dark')
            setIsDarkMode(true);

        } else {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);

        }
    }, []);


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

    const darkModeHandler = () => {
        setIsDarkMode(!isDarkMode)
        document.body.classList.toggle("dark");
    }

    return (
        <>
            <div className="">

                <button
                    className={` w-20 h-10 rounded-full ${
                        isDarkMode ? "bg-green-600" : "bg-gray-700"
                    }`}
                    onClick={toggleDarkMode}
                >
      <span
          className={`${
              isDarkMode ? "translate-x-8" : "translate-x-0"
          } inline-block w-7 h-7 bg-white rounded-full shadow transform transition-transform mr-9 mt-1`}
      ></span>
                </button>

            </div>


        </>

    );
};
export default DarkToggle;