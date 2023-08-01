import { createContext, useReducer, useContext } from 'react'

const notifReducer = (state, action) => {
    switch(action.type) {
      case 'SHOW_NOTIF':
        return action.payload
      case 'REMOVE_NOTIF':
        return ''
      default:
        return state
    }
}

const NotifContext = createContext()

export const NotifContextProvider = (props) => {
    const [notifContent, notifDispatch] = useReducer(notifReducer, '')

    return (
        <NotifContext.Provider value={[notifContent, notifDispatch]}>
            {props.children}
        </NotifContext.Provider>
    )
}

export const useNotifContent = () => {
    const notifAndDispatch = useContext(NotifContext)
    return notifAndDispatch[0]
}

export const useNotifDispatch = () => {
    const notifAndDispatch = useContext(NotifContext)
    return notifAndDispatch[1]
}

export default NotifContext