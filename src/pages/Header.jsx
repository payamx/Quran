import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="  ">

            <ul className=" flex justify-start items-center md:gap-10 gap-4 border-b-2  rounded-full bg-amber-300 p-1 px-3  " id="meneu">
                <li className="">
                    <Link to="/">صفحه اصلی</Link>

                </li>

                <li className="">
                    <Link to="/list">فهرست</Link>

                    </li>
                <li className="">
                    <Link to="/estekhareh">استخاره</Link>

                    </li>
                <li className="">
                    <Link to="/search">جستجو</Link>

                </li>


            </ul>
        </div>
    );
};

export default Header;
