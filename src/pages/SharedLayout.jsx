
import DarkMode from "../Component/DarkMode.jsx";
import {Outlet} from "react-router-dom";


const SharedLayout = () => {
    return (
        <div className="">
            <DarkMode />
            <Outlet/>

        </div>
    );
};

export default SharedLayout;
