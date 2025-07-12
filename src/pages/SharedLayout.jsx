
import DarkMode from "../Component/DarkMode.jsx";
import {Outlet} from "react-router-dom";
import Header from "./Header.jsx";


const SharedLayout = () => {
    return (
        <div className="  bg-gray-50 dark:bg-gray-700 ">
            <div className="flex justify-start md:justify-center items-center md:px-2 py-4">
                <div>
                    <DarkMode/>

                </div>
                <div className=" md:mx-auto">
                    <Header/>

                </div>

            </div>






            <Outlet/>

        </div>
    );
};

export default SharedLayout;
