import { useContext, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { AppContext } from "./App"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoCamera, faForward } from '@fortawesome/free-solid-svg-icons';

import { getCrime, setSafe } from "../actions/crime";
import crime from "../reducers/crime";

function Camera(props){
    // router
    const { id } = useParams();
    const navigate = useNavigate();

    // global state
    const [ {cameraState, ws, crimes}, dispatch ] = useContext(AppContext);

    // local state
    const [ isSideMenu, setIsSideMenu ] = useState(false);
    const [ currentCamera, setCurrentCamera ] = useState(null);
    let suspects = useRef([]);
    // const [ persons, setPersons ] = useState("");

    console.group("suspects");
    for(const crime of crimes){
        if(crime.camId == id){
            suspects = crime.suspects;
            console.log("suspects are ", suspects);
            break;
        }
    }
    console.groupEnd();


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
        setIsSideMenu(false);
        navigate(`/grid/${e.target.dataset.cid}`)
    }

    const handleSetSafe = (e)=>{
        dispatch(setSafe(id));
    }

    return (
        currentCamera?(
            <div className="camera">
                <aside className={isSideMenu ? "open":""}>
                    <div className="slide-icon" onClick={onSlideIconClick}>
                        <FontAwesomeIcon style={{transform: isSideMenu ? "rotate(180deg)" : "rotate(0deg)"}} icon={faForward} />
                    </div>
                    <ul>
                        {cameraState.map(el=>{
                            let setAlert = false;
                            for(const crime of crimes){
                                if(crime.camId == el.id && el.id != id){
                                    setAlert = true;
                                    break;
                                }
                            }
                            return(
                            <li key={el.id} className={(el.id===Number(id)?"active":"") + (setAlert ? "alert" : "")} onClick={handleCameraClick} data-cid={el.id}>
                                Camera number {el.id}<FontAwesomeIcon style={{direction: "rtl"}} icon={faVideoCamera} />
                            </li>
                            )}
                        )}
                    </ul>
                </aside>
                <div className="reserver"></div>
                <main className="camera-main">
                    <main>
                            <video src={currentCamera.url} controls>

                            </video>
                    </main>
                    <aside>
                            {suspects.length && suspects.map((image, i)=><img key={i} src={image} alt="suspect" />)}
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
                    </footer>
                    <div className="controller">
                        <button className="safe" onClick={handleSetSafe}>
                            Mark as Safe
                        </button>
                        <button>
                            Generate report
                        </button>
                    </div>
                </main>
            </div>
        ):(
            <div>
                waiting
            </div>
        )
    )
}

export default Camera;