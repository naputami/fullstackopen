import { useState, useImperativeHandle, forwardRef } from "react";

const Toggleable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hiddenWhenVisible = {display: visible? 'none' : ''}
    const showWhenVisible = {display: visible? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, ()=> {
        return {
            toggleVisibility
        }
    })

    return (
        <>
            <div style={hiddenWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </>
    )
})

export default Toggleable