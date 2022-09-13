import store from "../Store/ReduxStore"

const adminReducer = (
    state = { adminData: null, loading: false, error: false },
    action

) => {

    switch (action.type) {
        case "ADMIN_START":
            return { ...state, uploading: true, error: false }
        case "ADMIN_SUCCESS":
            
            return {
                ...state, adminData: action.data, loading: false, error: false,

                uploading: false, error: false
            }

        case "ADMIN_FAIL":
            return { ...state, uploading: false, error: true }
        
        // case "LOGOUT":
        //     localStorage.removeItem(store.adminData)
        //     return { ...state, adminData: null, loading: false, error: false }    

        default:
            return state
    }

}

export default adminReducer 