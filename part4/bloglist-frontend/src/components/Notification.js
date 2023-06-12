const Notification = ({message, type}) => {
    if(message == null) {
        return null
    }

    return (
        <div className={type}>
            <h2>{message}</h2>
        </div>
    )
}

export default Notification