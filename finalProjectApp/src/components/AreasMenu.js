import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components
import SideCard from "./SideCard";

// useReducer things
import { AppContext } from "./App";
import { setCurrentArea } from "../actions/currentArea";
import { recieveAreas } from "../actions/areas";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

// configuration
import { SERVER_URL } from "../utils/config";


function AreasMenu(props){
    // destructing props
    const { isShowAreas, showAreas } = props;

    // local state
    const [currentCard, setCurrentCard] = useState(null);
    const [isSideCard, setIsSideCard] = useState(false);

    // useContext
    const [{ areaState, user }, dispatch] = useContext(AppContext);
    const areas = areaState;

    // react router
    const navigate = useNavigate();

    useEffect(async ()=>{
        try{
            let data = await (await fetch(`${SERVER_URL}/areas`,{
                headers:{
                    'Authorization': `Bearer ${user.current}`
                }
            })).json();
            if(data.message){
                throw data;
            }
            data = data.map(el => {
                const image = new Image();
                image.src = `${SERVER_URL}/images/${el.image}`;
                image.crossOrigin = "Anonymous";
                image.onload = ()=>{
                    const canv = document.createElement("canvas");
                    canv.width = image.width;
                    canv.height = image.height;
                    const ctx = canv.getContext("2d");
                    ctx.drawImage(image, 0, 0);
                    canv.toBlob((blob)=>{
                        el.image = URL.createObjectURL(blob);
                    })
                }

                return el;
            });
            dispatch(recieveAreas(data));
        }catch(err){
            console.error(err);
        }
    }, []);

    // handlers
    const handleMouseEnter = (e)=>{
        setIsSideCard(true);
        setCurrentCard(areas[e.target.dataset.index-1]);
    }

    const handleMouseLeave = (e)=>{
        setIsSideCard(false);
        // setCurrentCard(null);
    }

    const handleAreaClick = (e)=>{
        const tgt = e.target.dataset.index;
        if(tgt){
            dispatch(setCurrentArea(tgt));
            navigate("/grid");
        }
    }

    const areasElements = areas.length?areas.map((el, i)=>
        <li key={el.id}
            data-index={el.id}>
            {el.name}
        </li>):[];

    return(
        <div onClick={showAreas}>
            <span>
                Areas <br />
                <FontAwesomeIcon icon={faAngleDown} />
            </span>
            <div className={"areas" + (isShowAreas? " open":"")}>
                <ul onMouseOver={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleAreaClick}>
                    {areasElements}
                </ul>
                <SideCard {...currentCard} show={isSideCard} />
            </div>
        </div>
    )
}

export default AreasMenu;