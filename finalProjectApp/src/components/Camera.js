import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { AppContext } from "./App"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoCamera, faBackward } from '@fortawesome/free-solid-svg-icons';

function Camera(props){
    // router
    const { id } = useParams();
    const navigate = useNavigate();

    // global state
    const [ {cameraState} ] = useContext(AppContext);

    // local state
    const [ isSideMenu, setIsSideMenu ] = useState(false);
    const [ currentCamera, setCurrentCamera ] = useState(null);

    // sideeffects
    useEffect(()=>{
        const testCurrentCamera = cameraState.filter(el=>el.id == id)[0];
        if(testCurrentCamera){
            setCurrentCamera(testCurrentCamera);
        }else{
            navigate("/grid");
        }
    }, [])

    // handlers
    const onSlideIconClick = (_e)=>{
        setIsSideMenu(!isSideMenu);
    }

    const handleCameraClick = (e)=>{
        navigate(`/grid/${e.target.dataset.cid}`)
    }

    return (
        currentCamera?(
            <div className="camera">
                <main className="camera-main">
                    <main>
                            <video src={currentCamera.url} controls>

                            </video>
                    </main>
                    <aside>

                    </aside>
                    <footer>
                    <div>
                        <h3>
                            Summary
                        </h3>
                        <hr />
                        <br />
                        <ul>
                            <li>somthing</li>
                            <li>went</li>
                            <li>wrong</li>
                        </ul>
                    </div>
                    <div className="controller">
                        <button>
                            Generate report
                        </button>
                    </div>
                </footer>

                </main>
                <aside className={isSideMenu ? "open":""}>
                    <div className="slide-icon" onClick={onSlideIconClick}>
                        <FontAwesomeIcon style={{transform: isSideMenu ? "rotate(180deg)" : "rotate(0deg)"}} icon={faBackward} />
                    </div>
                    <ul>
                        {cameraState.map(el=>
                            <li key={el.id} className={el.id===Number(id)?"active":""} onClick={handleCameraClick} data-cid={el.id}>
                                Camera number {el.id}<FontAwesomeIcon style={{direction: "rtl"}} icon={faVideoCamera} />
                            </li>
                        )}
                    </ul>
                </aside>
            </div>
        ):(
            <div>
                waiting
            </div>
        )
    )
}

export default Camera;