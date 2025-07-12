// import {useEffect, useRef, useState} from 'react';
//
// const PlayAudio = ({index, audiolist}) => {
//
//
//     // State to track the currently playing audio
//     const [currentAudio, setCurrentAudio] = useState(null);
//     const [IsPlaying, setIsPlaying] = useState(false)
//     // Ref to store the Audio object for each audio source
//     const audioRefs = useRef(null);
//     // Handle play/pause functionality
//     const handlePlayAudio = (index) => {
//         console.log("audiolist", audiolist)
//         var selected = audiolist[index]
//
//
//
//         // if (currentAudio && currentAudio === index) {
//         //     // Pause the previously playing audio
//         //     audioRefs.current.pause();
//         //     audioRefs.current.currentTime = 0; // Reset to start
//         //     setCurrentAudio(null);
//         // }
//         //
//         // if (currentAudio === index) {
//         //     // Pause the current audio if clicked again
//         //     audioRefs.current?.pause();
//         //     setCurrentAudio(null);
//         // } else {
//         //     // Play the clicked audio
//         //     if (currentAudio) {
//         //         audioRefs.current.pause();
//         //         audioRefs.current?.pause();
//         //         audioRefs.current.currentTime = 0; // Reset to start
//         //     }
//         //     audioRefs.current?.play();
//         //     setCurrentAudio(index);
//         //     // console.log(audioRefs.current[audioSrc.audio],'list audio')
//         //
//         //     console.log(currentAudio, 'curent audio');
//         //
//         // }
//     };
//
//
//     const handleOnEnd = () => {
//         const nextIndex = currentAudio + 1;
//         if (nextIndex <= audiolist.length - 1) {
//             console.log(currentAudio)
//             audioRefs.current.src = audiolist[nextIndex].audio;
//             audioRefs.current.play();
//             // audioRefs.current[audiolist.audio].currentTime =0;
//             setCurrentAudio(nextIndex);
//             // console.log(  audioRefs.current[audiolist.audio],'ayah end')
//         } else {
//             // Handle reaching the end of the playlist (e.g., stop, loop)
//             console.log("Playlist finished!");
//             setCurrentAudio(null);
//         }
//     };
//
//
//     return (<>
//         <div className="flex justify-center items-center ">
//             <audio
//                 key={index}
//                 ref={(audio) => (audioRefs.current = audio)}
//                 src={audiolist?.audio}
//                 preload="none"
//                 onEnded={handleOnEnd}
//             />
//             <button onClick={() => handlePlayAudio(index)} className="play">
//                 {currentAudio === index ? (
//                     <img className="w-6 h6" src="/pause-svgrepo-com (3).svg" alt="Pause audio"/>
//
//
//                 ) : (<img className="w-6 h6" src="/play-play-button-svgrepo-com (2).svg" alt="Play audio"/>)}
//             </button>
//         </div>
//     </>);
// };
//
// export default PlayAudio;