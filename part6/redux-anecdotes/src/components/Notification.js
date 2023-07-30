import { useSelector } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'


const Notification = () => {
  const dispatch = useDispatch()
  const notif = useSelector(({notification}) => notification)

  useEffect(() => {
    if (notif) {
      const timer = setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notif, dispatch]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
   <div>
      {notif && (
        <div style={style}>
          <p>{notif}</p>
        </div>
      )}
   </div>
  )
}

export default Notification