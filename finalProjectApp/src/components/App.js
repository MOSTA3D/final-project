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
import {SERVER_URL} from "../utils/config"

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

// use reducer dependencies
import currentArea from '../reducers/currentArea';
import areasReducer from "../reducers/areas";
import camerasReducer from '../reducers/cameras';
import { combineDispatches } from "../utils/helper";

import { Route, Routes, Redirect } from "react-router-dom";
import { useState, useEffect, useReducer, createContext } from "react";

// helpers

library.add(faEnvelope, faKey);

// create context

export const AppContext = createContext();

function App() {
  //state
  const [ authed, setAuthed ] = useState(!!document.cookie);
  const [ login, setLogin ] = useState(true);
  
  // Reducer
  const [areaState, areaDispatch] = useReducer(areasReducer, {});
  const [cameraState, cameraDispatch] = useReducer(camerasReducer, []);
  const [currentAreaState, currentAreaDispatch] = useReducer(currentArea, 1);

  const dispatch = combineDispatches(areaDispatch, currentAreaDispatch, cameraDispatch);
  const state = { areaState, currentAreaState, cameraState };

  //effects
  useEffect(async ()=>{
    // const areas = await(await fetch(SERVER_URL + "/areas")).json();
    const ws = new WebSocket("ws://localhost:3001/", "echo-protocol");
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
