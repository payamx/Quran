
const ToggleButton = ({ onToggle, isActive  }) => {


    const buttonClasses = `
    w-14 h-7 rounded-full
    ${isActive ? `bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500` : `bg-gray-700`}
  `;

    const toggleClasses = `
    inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform mr-9 mt-1
    ${isActive ? 'translate-x-8' : 'translate-x-0'}
  `;

    return (
        <div>
            <button className={buttonClasses} onClick={onToggle} >
                <span className={toggleClasses} />
            </button>
        </div>
    );
};

export default ToggleButton;
