import { setKeyword } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = event => event.target.value
    
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={(e) => dispatch(setKeyword(handleChange(e))) } />
      </div>
    )
  }
  
  export default Filter