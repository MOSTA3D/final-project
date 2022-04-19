import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { AppContext } from "./App"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoCamera, faForward } from '@fortawesome/free-solid-svg-icons';

import { getPeople } from "../actions/people";

function Camera(props){
    // router
    const { id } = useParams();
    const navigate = useNavigate();

    // global state
    const [ {cameraState, ws, people}, dispatch ] = useContext(AppContext);

    // local state
    const [ isSideMenu, setIsSideMenu ] = useState(false);
    const [ currentCamera, setCurrentCamera ] = useState(null);
    const [ persons, setPersons ] = useState("");

    // sideeffects
    useEffect(()=>{
        const testCurrentCamera = cameraState.filter(el=>el.id == id)[0];
        if(testCurrentCamera){
            setCurrentCamera(testCurrentCamera);
        }else{
            navigate("/grid");
        }

        ws.addEventListener("open", ()=>{
            ws.addEventListener("message", (buffer)=>{
                console.log(buffer.data);
                dispatch(getPeople(buffer.data));
            });
        });

        // return ()=>{
        //     ws.close();
        // }
    }, [])

    // handlers
    const onSlideIconClick = (_e)=>{
        setIsSideMenu(!isSideMenu);
    }

    const handleCameraClick = (e)=>{
        setIsSideMenu(false);
        navigate(`/grid/${e.target.dataset.cid}`)

    }

    return (
        currentCamera?(
            <div className="camera">
                <aside className={isSideMenu ? "open":""}>
                    <div className="slide-icon" onClick={onSlideIconClick}>
                        <FontAwesomeIcon style={{transform: isSideMenu ? "rotate(180deg)" : "rotate(0deg)"}} icon={faForward} />
                    </div>
                    <ul>
                        {cameraState.map(el=>
                            <li key={el.id} className={el.id===Number(id)?"active":""} onClick={handleCameraClick} data-cid={el.id}>
                                Camera number {el.id}<FontAwesomeIcon style={{direction: "rtl"}} icon={faVideoCamera} />
                            </li>
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
                            {people}
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