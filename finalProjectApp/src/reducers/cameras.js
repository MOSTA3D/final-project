import { GET_CAMERAS } from "../actions/cameras";

const camerasReducer = (state={}, action)=>{
    switch(action.type){
        case GET_CAMERAS:
            return action.cameras;
        default:
            return state;
    }
}

export default camerasReducer;