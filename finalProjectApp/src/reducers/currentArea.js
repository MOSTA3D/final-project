import { SET_CURRENT_AREA } from "../actions/currentArea";

function currentArea(state={}, action){
    switch(action.type){
        case SET_CURRENT_AREA:
            return action.currentArea;
        default:
            return state;
    }
}

export default currentArea;