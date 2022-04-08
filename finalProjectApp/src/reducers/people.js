import { GET_PEOPLE } from "../actions/people";

function people(state="", action){
    switch(action.type){
        case GET_PEOPLE:
            return action.people;
        default:
            return state;
    }
}

export default people;