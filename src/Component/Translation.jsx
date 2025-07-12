import React, {memo, useState} from 'react';

const Translation = ({translation,setTranslation}) => {

    // // modify surah translation state
    // const [translation, setTranslation] = useState({arabic:'ar.abdulsamad',
    //     farsi: localStorage.getItem('translationPreference') || 'fa.ghomshei',})

    //handle translation partial update function
    const handleTranslationChange = (property, newValue) => {
        setTranslation((prevTranslation) => ({
            ...prevTranslation,
            [property]: newValue,
        }));
        localStorage.setItem('translationPreference', newValue); // Store the new preference
    };

    return (
        <div>
            <div className="flex justify-center items-center ">


                <select onChange={(e) => handleTranslationChange('farsi', e.target.value)}
                        value={translation.farsi}
                        className="  p-1 rounded-xl font-farsi bg-gradient-to-r from-green-400 to-blue-500 ">
                    <option className="" value="fa.ghomshei">قمشه ای</option>
                    <option className="" value="fa.fooladvand">فولادوند</option>
                    <option className="" value="fa.ansarian">انصاریان</option>
                    <option className="" value="fa.makarem">مکارم</option>
                    <option className="" value="fa.khorramshahi">خرمشاهی</option>
                    <option className="" value="fa.gharaati">قرائتی</option>
                </select>
            </div>
        </div>
    );
};

export default Translation ;
