const initialState:team = {
    name: "",
    foundationYear: null,
    division: '',
    conference: '',
    imageUrl: '',
    id: null
}
interface team {
    name: string,
    foundationYear: number,
    division: string,
    conference: string,
    imageUrl: string,
    id: number
}

interface Action {
    type: string;
    payload: team
  }

function teamReducer(state:team  = initialState, action:Action): team {
    
    if (action.type === "team/set") {
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


export default teamReducer