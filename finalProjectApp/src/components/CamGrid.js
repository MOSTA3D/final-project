import { useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./App";
import { postData } from "../utils/helper";
import { SERVER_URL } from "../utils/config";

// global state dependencies
import { getCameras } from "../actions/cameras";


// assets
import video from "./assets/final.mp4";


// general declarations
const elarr = [];
    for(let i = 0; i<10; i++){
        elarr.push(

            <div key={i} className='loading'>
                <span>
                </span>
            </div>
        );
    }

function CamGrid() {
    const wrapperRef = useRef(null);

    // context
    const [{cameraState, currentAreaState}, dispatch ] = useContext(AppContext);
    // sideEffects
    useEffect(async ()=>{
        try{
            const cameras = await postData(`${SERVER_URL}/cameras`, {
                areaId: currentAreaState
            });
            if(!cameras){
                throw cameras;
            }
            dispatch(getCameras(cameras));
        }catch(err){
            console.log(err);
        }

    }, [currentAreaState]);

    // handlers
    const handleMouseEnter = e=>{
        e.target.previousSibling.play();
    };
    const handleMouseLeave = e=>{
        e.target.previousSibling.pause();
    }

    return(
        <main className="cam-grid">
            {cameraState.length?(
                cameraState.map(el=>(
                    <div key={el.id} className='something'>
                        <span>
                            <Link to={`/grid/${el.id}`}>
                                <video src={el.url} muted={true}></video>
                                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="video-wrapper"></div>
                            </Link>
                        </span>
                    </div>
                ))
            ):(
                elarr
            )}
        </main>
    )
}

export default CamGrid;