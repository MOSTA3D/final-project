import { useContext } from "react";

import { AppContext } from "./App";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faHouse, faFaceGrinWide} from "@fortawesome/free-solid-svg-icons";

// import { grid } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

function SideMenu (props){

    const { sideMenu, setAuthed } = props;

    const [{user}] = useContext(AppContext);

    // handlers
    const logoutHandler = (e)=>{
        user.current = "";
        document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC";
        setAuthed(false);
    };

    return(
        <div className={"side-menu" + (sideMenu ? " open":"")}>
            <Link to="/home">
                <span>
                    <FontAwesomeIcon icon={faHouse} />
                    <br />
                    <h6>Home</h6>
                </span>
            </Link>
            <Link to="/grid">
                <span>
                    <FontAwesomeIcon icon={faFaceGrinWide} />
                    <br />
                    <h6>Grid</h6>
                </span>
            </Link>
            <hr style={{width: "70%"}}/>
            <Link to="/">
                <span onClick={logoutHandler}>
                    <FontAwesomeIcon icon={faDoorOpen} /> <br />
                    <h6>logout</h6>
                </span>
            </Link>
        </div>
    );
}

export default SideMenu;