import image from "./assets/logo_transparent.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer(){
    const supportEmail = "support@detectors.com";
    return(
        <footer className="main-footer">
            <a href={"https://"+supportEmail}>
                <FontAwesomeIcon icon="envelope" />&nbsp;
                {supportEmail}</a>
            <div className="logo">
                <img className="logo" src={image} />
            </div>
        </footer>
    )
}

export default Footer;