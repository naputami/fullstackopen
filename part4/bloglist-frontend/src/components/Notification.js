import PropTypes from 'prop-types'
const Notification = ({ message, type }) => {
  if(message === null) {
    return null
  }

  return (
    <div className={type}>
      <h2>{message}</h2>
    </div>
  )
}

Notification.propTypes = {
  type : PropTypes.string.isRequired
}

export default Notification