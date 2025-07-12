import {Link, useNavigate} from "react-router-dom";

const SurahItems = ({item, index}) => {


    return (
        <div className=" min-w-64">
            <div key={index} className="flex-col justify-center items-center text-center  m-3  ">

                <div className=" inline-flex justify-center items-center shadow-lg   rounded-2xl
                 dark:bg-gray-800 dark:text-white min-w-80">

                    <div className="relative flex justify-center items-center mr-3 py-1 ">
                        <img src="starr.svg" className="h-16 w-16 relative " alt="ayah"/>
                        <span
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-800 text-xs">
                                    {new Intl.NumberFormat('ar-EG').format(item?.number)}
                                </span>

                    </div>
                    <div className="inline-flex font-arabic pe-4 justify-start items-center min-w-24">
                        <Link to={`/surah/${item?.number}` } target={"_parent"} >
                            <p className=" p-1  ">{item?.name?.slice(7)}</p>
                        </Link>

                    </div>

                    <div className="  flex justify-start  items-center mx-1">
                        {item?.revelationType === "Meccan" ?
                            <img src="kaaba1.svg" className="h-7 w-7  " alt="مکی"/>
                            :
                            <img src="medinahgreen.svg" className="h-7 w-7  " alt="مدنی"/>

                        }
                    </div>
                    <div className=" text-xs  flex font-farsi mx-2">
                        <p className="inline-flex xs:px-2 min-w-10 justify-center"> تعداد آیات </p>
                        <p className="inline-flex   min-w-10 justify-center">  {new Intl.NumberFormat('ar-EG').format(item?.numberOfAyahs)}  </p>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default SurahItems;