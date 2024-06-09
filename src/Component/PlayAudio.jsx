import React, {useRef, useState} from 'react';

const PlayAudio = ({audioProp}) => {
    // State to track the currently playing audio
    const [currentAudio, setCurrentAudio] = useState(null);
    // Ref to store the Audio object for each audio source
    const audioRefs = useRef({});
    const handlePlayAudio = (audioSrc) => {
        if (currentAudio && currentAudio !== audioSrc) {
            // Pause the currently playing audio if it's different from the clicked one
            audioRefs.current[currentAudio].pause() ;
            setCurrentAudio(null);
        }
        if (currentAudio !== audioSrc) {
            // If the clicked audio is not the currently playing one, play it
            audioRefs.current[audioSrc].play();
            setCurrentAudio(audioSrc);
        }
        else {
            // If the clicked audio is the currently playing one, pause it
            audioRefs.current[audioSrc].pause() ;
            setCurrentAudio(null);

        }


    };

    const handleOnEnd= ()=>{
        setCurrentAudio(null);

    }
    return (
        <>
            <div className="flex justify-center items-center ">
                <audio
                    ref={(audio) => (audioRefs.current[audioProp] = audio)}
                    src={audioProp}
                    preload="none"
                    onEnded={ handleOnEnd}
                />
                <button onClick={() => handlePlayAudio(audioProp)} disabled={!currentAudio === null}>
                    {currentAudio === audioProp ? (
                            <img className="w-6 h6" src="/pause-svgrepo-com (3).svg" alt="Pause audio"/>


                    ) : (
                        <img className="w-6 h6" src="/play-play-button-svgrepo-com (2).svg" alt="Play audio" />
                    )}
                </button>
            </div>
        </>
    );
};

export default PlayAudio;