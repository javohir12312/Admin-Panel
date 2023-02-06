import axios from "axios";
axios.defaults.baseURL = 'http://18.216.178.179/api/v1'

axios.interceptors.request.use(config => {
    const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGUxYmU1MjNiNWZhYmM1YjUxYjc5ZCIsImlhdCI6MTY3NTYwNTUyMywiZXhwIjoxNjgzMzgxNTIzfQ.pEUX_SAIUZ2qjmPLpKz4TvXCOuyln_O84hXyNWQpn_c"
    const authorization = jwt ? `Bearer ${jwt}` : ""
    config.headers.authorization = authorization
    return config
})

export default axios