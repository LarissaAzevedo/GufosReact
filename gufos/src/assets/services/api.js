import Axios from 'axios'
// axios trata requisições http

const api = Axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type" : "application/json",
        // bearer + token
        "Authorization" : "Bearer " + localStorage.getItem("usuario-gufos")
    }
})

export default api