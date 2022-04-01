import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import Clock from "./Clock";
import FlipIcon from "./FlipIcon";
import SideMenu from "./SideMenu";
import AreasMenu from "./AreasMenu";


//global declarations

function SNav(props){
    const [ flipped, setFlipped ] = useState(false);
    const [ sideMenu, setSideMenu ] = useState(false);
    const [ isShowAreas, setIsShowAreas ] = useState(false);

    const navigator = useNavigate();

    // destructing props
    const { authed, setAuthed } = props;

    // console.log(history);

    const showAreas = ()=>{
        setIsShowAreas(!isShowAreas);
        return;
    }

    function onFlipIconClick(e){
        setFlipped(!flipped);
        setSideMenu(!sideMenu);

        return;
    }


    // effects

    // useEffect(()=>{
    //     areasRef.current.style.display = "none";
    // }, []);

    return(
        <nav className="s-nav">
            {/* <span onClick={()=>navigator(-1)}>
                goback
            </span> */}
            {authed && (
                <FontAwesomeIcon className="icon-left-angle" icon={faAngleLeft} onClick={()=> navigator(-1)} />
            )}
            <span className="nav-title">
                City Security System
                <Clock />
            </span>
            {authed && (
                <>
                    <AreasMenu {...{isShowAreas, showAreas}} />
                    <FlipIcon {...{flipped, onFlipIconClick}} />
                    <SideMenu {...{sideMenu, setAuthed}} />
                </>
            )}
        </nav>
    )
}


export default SNav;