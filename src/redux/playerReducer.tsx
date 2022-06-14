

const initialState:player = {
    avatarUrl: "",
    birthday: "",
    height: null,
    id: null,
    name: '',
    number: null,
    position: "",
    team: null,
    teamName: "",
    weight: null
}
interface player {
    avatarUrl: string,
    birthday: string,
    height: number,
    id: number,
    name: string,
    number: number,
    position: string,
    team: number,
    teamName:string,
    weight: number
}

interface Action {
    type: string;
    payload: player
  }

function playerReducer(state:player = initialState, action:Action): player {
    
    if (action.type === "player/set") {
        return {
            ...state, 
            ...action.payload
        }
    } 
    // else if (action.type === 'auth/logout') {
    //     return {
    //         ...state,
    //         ...action.payload
            
    //     }
    // }

    return state
}


export default playerReducer