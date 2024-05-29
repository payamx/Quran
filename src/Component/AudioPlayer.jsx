import {useRef, useEffect, useState} from 'react';
import { classNames } from 'tailwindcss/lib'; // Import classNames for dynamic class generation

const AudioPlayer = ({ audioSrc }) => {
    const audioRef = useRef(null);
    const { isPlaying, setIsPlaying } = useState(false); // Get state from context

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null; // Clean up previous audio object
            }
        };
    }, [audioSrc]);

    const playAudio = () => {
        if (!isPlaying) {
            audioRef.current = new Audio(audioSrc);
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch((error) => {
                console.error('Audio play error:', error);
            });
        }
    };

    return (
        <div className="audio-player flex items-center py-2">
            <button
                className={classNames(
                    'audio-player__button p-2 rounded-full focus:outline-none',
                    isPlaying ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                )}
                onClick={playAudio}
            >
                {isPlaying ? (
                    <svg
                        className="w-6 h-6 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M14 8V4l2.67 2h-2.67zM6 16h12V8H6v8zM10 14l6 6v-12l-6 6z" />
                    </svg>
                ) : (
                    <svg
                        className="w-6 h-6 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M8 5v14L11 12l-3-3z" />
                    </svg>
                )}
            </button>
            <audio ref={audioRef} controls={false} preload="none" src={audioSrc} className="audio-player__audio w-full" />
        </div>
    );
};

export default AudioPlayer;
