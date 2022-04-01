import { SERVER_URL } from "../utils/config";

function SideCard(props){
    const { name, image, show } = props;
    return(
        <>
            {name&&(
                <div className={"side-card" + (show?" open":"")}>
                    {name?(
                        <>
                            <img src={SERVER_URL+"/images/"+image} alt={name} />
                            <h2>{name}</h2>
                        </>
                    ):(
                        <>
                            <div> loading </div>
                        </>
                    )}
                </div>
            )}
        </>
    )
}

export default SideCard;