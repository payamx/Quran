import {memo, useEffect, useRef, useState} from "react";

const PlayAudio = ({index, audiolist, audioRef, currentAudio, setCurrentAudio, isPlaying, setIsPlaying}) => {

    // Function to set the current audio
    const handlePlayAudio = (selectedIndex) => {
        if (currentAudio === selectedIndex) {
            // Toggle play/pause
            setIsPlaying((prev) => !prev);
        } else {
            // Switch to a new audio
            setCurrentAudio(selectedIndex);
            setIsPlaying(true);
        }
    };

    // Effect to handle playing, pausing, and source updates
    useEffect(() => {
        if (currentAudio !== null) {
            // Stop previous audio
            audioRef.current?.pause();
            audioRef.current.currentTime = 0;

            // Set new source and play/pause
            audioRef.current.src = audiolist[currentAudio].audio;
            audioRef.current.load();

            if (isPlaying) {
                audioRef.current.play();
                console.log(`▶️ Playing audio at index ${currentAudio}`);
            }
        }
    }, [currentAudio, isPlaying, audiolist]);

    // Effect to handle autoplay of next audio
    useEffect(() => {
        const handleEnded = () => {
            console.log(`🎬 Audio at index ${currentAudio} ended.`);
            if (currentAudio < audiolist.length - 1) {
                setCurrentAudio(currentAudio + 1);
                setIsPlaying(true);
            } else {
                setIsPlaying(false);
                setCurrentAudio(null);
            }
        };

        audioRef.current.addEventListener("ended", handleEnded);
        return () => {
            audioRef.current.removeEventListener("ended", handleEnded);
        };
    }, [currentAudio, audiolist]);

    return (
        <div className="flex justify-center items-center">
            <button onClick={() => handlePlayAudio(index)} className="play">
                {currentAudio === index && isPlaying ? (
                    <img className="w-6 h-6" src="/pause-svgrepo-com (3).svg" alt="Pause audio"/>
                ) : (
                    <img className="w-6 h-6" src="/play-play-button-svgrepo-com (2).svg" alt="Play audio"/>
                )}
            </button>
        </div>
    );
};

export default memo(PlayAudio) ;
