import image from "./assets/logo_vector.svg";
import { useRef, useState } from "react";

import { postData } from "../utils/helper";

// global declarations
const dErrShdw = "0 0 3px 2px rgb(230 73 53)";
const nameRegex = /^[a-zA-Z]+$/;
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

//helper functions
const checkRegex = (e, condition)=>{
    if(condition){
        e.target.style.boxShadow = "none";
    }else{
        e.target.style.boxShadow = dErrShdw;
    }
}

function Signup(props){

    const [ firstname, setFirstname ] = useState("");
    const [ lastname, setLastname ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ cpassword, setCpassword ] = useState("");

    // destructring props

    const { setAuthed, login, setLogin } = props;

    // refs

    const myRef = useRef(null);

    // validation

    const validatePassword = ()=>{

    }

    const onSubmitClick = async (e)=>{
        e.preventDefault();
        const data = login? {email, password} : {firstname, lastname, email, password};

        // todo-validation

        if(!login){
            if(!(firstname.match(nameRegex)&&lastname.match(nameRegex)&&email.match(emailRegex)&&password.match(passordRegex)&&cpassword===password)){
                return;
            }
        }


        try{
            const token = await postData("http://localhost:3001/" + (login? "signin" : "signup"), data);
            if(token.message){
                throw token.message;
            }

            document.cookie = `token=${token}`;
            console.log(token);
            setAuthed(true);
        }catch(err){
            myRef.current.innerHTML = err;
            // myRef.current.style.display = "block";

            (new Promise((acc, rej)=>{
                myRef.current.style.display = "block";
                acc();
            })).then(()=>{
                myRef.current.classList.add("active");
            })

            // myRef.current.classList.add("active");
            setTimeout(()=>{
                myRef.current.classList.remove("active");
                setTimeout(()=>myRef.current.style.display = "none", 200)
            }, 1000)
            console.error(err);
        }


    }

    const onFirstnameChange = (e)=>{
        const tgtVal = e.target.value;
        setFirstname(tgtVal);
        checkRegex(e, tgtVal.match(nameRegex));
    }

    const onLastnameChange = (e)=>{
        const tgtVal = e.target.value;
        setLastname(tgtVal);
        checkRegex(e, tgtVal.match(nameRegex));
    }

    const onEmailChange = (e)=>{
        const tgtVal = e.target.value;
        setEmail(tgtVal);

        if(login){
            return;
        }

        checkRegex(e, tgtVal.match(emailRegex));
    }

    const onPasswordChange = (e)=>{
        const tgtVal = e.target.value;
        setPassword(tgtVal);

        if(login){
            return;
        }

        checkRegex(e, tgtVal.match(passordRegex));
    }

    const onCpasswordChange = (e)=>{
        const tgtVal = e.target.value;
        setCpassword(tgtVal);
        checkRegex(e, password === tgtVal)
    }

    const onRegisterClick = (e)=>{
        e.preventDefault();
        setLogin(!login);
    }

    return (
        <div className={"signup " + (login ? "signin" : "")}>
            <div className="message" ref={myRef}>
            </div>
            <div className="main-logo">
                <img src={image} />
            </div>
            <form className={"signup " + (login?"signin":"")} action={"http://localhost:3001/" + login? "signin" : "signup"} method="POST">
                { !login && (
                    <div className="name">
                        <input type="text" placeholder="Firstname" name="firstname" value={firstname} onChange = {onFirstnameChange} />
                        <input type="text" placeholder="Lastname" name="lastname" value={lastname} onChange = {onLastnameChange} />
                    </div>
                ) }
                <input type="text" placeholder="Email" name="email" value={email} onChange = {onEmailChange} />
                <input type="password" placeholder="Password" name="passord" value={password} onChange = {onPasswordChange} />
                { !login && (<input type="password" placeholder="Confirm Password" name="cpassord" value={cpassword} onChange = {onCpasswordChange} /> )}
                <input type="submit" onClick={onSubmitClick} value={login?"Signin":"Signup"} />
                <hr />
                <button className="register" onClick={onRegisterClick} >{!login?"Signin":"Register"}</button>
            </form>
        </div>
    )
}

export default Signup;