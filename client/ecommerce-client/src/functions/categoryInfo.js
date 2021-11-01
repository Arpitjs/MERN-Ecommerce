import axios from 'axios'

//categories
export const getCategories = () => axios.get(`${process.env.REACT_APP_API}/categories`)

export const getCategory = slug => axios.get(`${process.env.REACT_APP_API}/category/${slug}`)

export const createCategory = (token, data) => {
    return axios.post(`${process.env.REACT_APP_API}/category`,
    data, {
    headers: { authToken: token }
})
}

export const modifyCategory = (token, data, slug, method) => {
    return axios({
        method,
        url: `${process.env.REACT_APP_API}/category/${slug}`,
        data,
        headers: { authToken: token }
      })
}


//sub categories
export const getSubs = () => axios.get(`${process.env.REACT_APP_API}/subs`)

export const getSub = slug => axios.get(`${process.env.REACT_APP_API}/sub/${slug}`)

export const createSub = (token, data) => {
    return axios.post(`${process.env.REACT_APP_API}/sub`,
    data, {
    headers: { authToken: token }
})
}

export const modifySub = (token, data, slug, method) => {
    return axios({
        method,
        url: `${process.env.REACT_APP_API}/sub/${slug}`,
        data,
        headers: { authToken: token }
      })
}