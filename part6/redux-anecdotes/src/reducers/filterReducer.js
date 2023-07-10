

const initialState = {filter:''}

export const createChangeFilterAction = (newFilter) => {
    return{
        type:'CHANGE_FILTER',
        payload:newFilter
    }
}

const filterReducer = (state = initialState,action) => {
    console.log({action})
    switch(action.type){
        case 'CHANGE_FILTER':
            return {...state,filter:action.payload}
        default:
            return state
    }
}

export default filterReducer

