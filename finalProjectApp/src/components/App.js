import '../App.scss';
import Welcome from "./Welcome";
import Footer from "./Footer";
import SNav from './SNav';
import CamGrid from "./CamGrid";
import NotFound from './NotFound';
import Signup from "./Signup";
import Camera from './Camera';
import Test from "./Test";

// configuration

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

// use reducer dependencies
import currentArea from '../reducers/currentArea';
import areasReducer from "../reducers/areas";
import camerasReducer from '../reducers/cameras';
import peopleReducer from "../reducers/people";
import { combineDispatches } from "../utils/helper";

import { Route, Routes } from "react-router-dom";
import { useState, useEffect, useReducer, createContext, useRef } from "react";

// helpers

library.add(faEnvelope, faKey);

// create context

export const AppContext = createContext();

// global variables
const ws = new WebSocket("ws://192.168.1.4:3001/", "echo-protocol");

function App() {
  //state
  const [ authed, setAuthed ] = useState(!!document.cookie);
  const [ login, setLogin ] = useState(true);

  // web socket


  // Reducer
  const [areaState, areaDispatch] = useReducer(areasReducer, {});
  const [cameraState, cameraDispatch] = useReducer(camerasReducer, []);
  const [currentAreaState, currentAreaDispatch] = useReducer(currentArea, 1);
  const [people, peopleDispatch] = useReducer(peopleReducer, "");

  // const [user, userDispatch] = useReducer(userReducer, document.cookie.split(";")[0].split("=")[1]);
  const user = useRef(document.cookie.split(";")[0].split("=")[1]);

  const dispatch = combineDispatches(areaDispatch, currentAreaDispatch, cameraDispatch, peopleDispatch);
  const state = { areaState, currentAreaState, cameraState, user, ws, people };

  //effects
  useEffect(async ()=>{
    // const areas = await(await fetch(SERVER_URL + "/areas")).json();
    // ws.addEventListener("open", ()=>{
    //   // ws.send("ya hala b elserver.");
    //   ws.addEventListener("message", (buffer)=>{
    //     console.log("the message from the web socket server", buffer);
    //   })
    // });
    ws.addEventListener("close", ()=>{
      ws.send("closed");
    })
    return ()=>{
      ws.close();
    }
  }, []);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {console.log("the state is", state)}
      <div className="App">
        <header className="App-header">
          <SNav {...{authed, setAuthed}} />
        </header>

        {authed?(
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/grid" element={<CamGrid />} />
            <Route path="/grid/:id" element={<Camera />} />
            <Route path="/test" element={<Test />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        ):(
          <Signup { ...{login, setAuthed, setLogin } }/>
        )}
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
