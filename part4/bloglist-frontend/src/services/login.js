import axios from "axios";
const baseUrl = '/api/login'

const login = async credential => {
    const response = await axios.post(baseUrl, credential)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {login}