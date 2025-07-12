import React, {useState} from 'react';

const CopyToClipboard = ({arText,surahNumber,faText,index}) => {

    const [copiedIndexes, setCopiedIndexes] = useState([]);

    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                    setCopiedIndexes([...copiedIndexes, index]);
                    setTimeout(() => {
                        setCopiedIndexes(copiedIndexes.filter(i => i !== index));
                    }, 1000); // Remove index from copiedIndexes after 2 seconds
                }
            )

            .catch((error) => console.error('Failed to copy text: ', error));
    };

    const isItemCopied = (index) => {
        return copiedIndexes.includes(index);
    };



    return (
        <div>
            <button
                onClick={() => copyToClipboard(`${arText}\n${surahNumber}\n${faText}`, index)}
                className=" ">
                {isItemCopied(index) ?
                    <img src="/copied.svg" className="w-6 h-6" alt="copied"/>
                    :
                    <img src="/copy.svg" className="w-6 h-6" alt="copy"/>
                }

            </button>
        </div>
    );
};

export default CopyToClipboard;