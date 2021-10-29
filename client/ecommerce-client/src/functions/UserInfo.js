import axios from 'axios'

export const CreateOrGetUser = (idTokenResult, endpoint )=> {
    return axios.post(`${process.env.REACT_APP_API}${endpoint}`,
        {}, {
        headers: { authToken: idTokenResult.token }
    })
}

export const GetAdmin = token => {
    return axios.post(`${process.env.REACT_APP_API}/admin`,
        {}, {
        headers: { authToken: token }
    })
}
