import { useEffect, useState, useContext } from "react";
import { AppContext } from "./App";

// redux like dependencies
import { recieveAreas } from "../actions/areas";
import { SERVER_URL } from "../utils/config";

function Test(props){
    const [areas, setAreas] = useState([]);

    //useContext
    const recievedAreas = useContext(AppContext);
    console.log(recievedAreas.state);

    useEffect(async ()=>{
        const data = await (await fetch(`${SERVER_URL}/areas`)).json();
        recievedAreas.dispatch(recieveAreas(data));
        setAreas(data);
    }, []);

    return (
        <div style={{
            margin: "60px auto",
            color: "#000",
            textAlign: "center"
        }}>
            {areas.length &&(
                <>
                    <img src={"http://localhost:3001/images/" + areas[0].image} />
                    <div>{areas[0].name}</div>
                </>
            )}
        </div>
    )
}

export default Test;