import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios';

export default function Test() {
    const api_url = "http://localhost:8001/get_all_songs";
    // const [text, setText] = useState('Initial');
    const [data, setData] = useState();
    const trackRef = useRef(null);
    useEffect(() => {
        // axios.get(api_url, {
        //     params: {
        //         name: 'DRUMS',
        //     },
        // }).then((res) => {
        //     console.log(res.data.path);
        //     setData(res.data.path)
        // })
        axios.get(api_url).then((res) => {
            console.log(res.data);
            setData(res.data);
        })
    }, [])
    const logTracks = (tracks) => {
        // console.log(tracks);
        for (let t in tracks) {
            console.log(tracks[t]);
        }
    }

    return (
        <div>
            {/* <div>{data}</div> */}
            <button onClick={() => logTracks(data)}>log data</button>
            <audio  controls className="audio" id="audio" ref={trackRef} >
                <source src='https://github.com/LidorAmitay/audioFiles/blob/main/DRUMS.mp3?raw=true' />
            </audio>
        </div>
    )
}
