import axios from "axios"
const baseUrl = "/api/persons"

const getAllPersons = () => axios.get(baseUrl)

const createPersonObj = (newPerson) => axios.post(baseUrl, newPerson)

const deletePersonObj = (id) => axios.delete(`${baseUrl}/${id}`)

const editPersonObj = (id, obj) => axios.put(`${baseUrl}/${id}`, obj)

export default {getAllPersons, createPersonObj, deletePersonObj, editPersonObj}