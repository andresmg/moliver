import axios from "axios"

const http = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
})

http.interceptors.response.use(
    function (response) {
        return response.data
    },
    function (error) {
        if (error.response?.status === 401) {
            localStorage.clear()
            window.location.assign("/login")
        }

        return Promise.reject(error)
    }
)

//admin.routes
export const getAllbiopsies = () => http.get('/biopsies')

//user.routes
export const login = ({email, password}) =>
    http.post("/login", {email, password})
export const logOut = () => http.post("/logout")
export const activateUser = (token) => http.get(`/activate/${token}`)

//biopsy.routes
export const dropBiopsy = (id) => http.get(`/biopsy/${id}/delete`)
export const updateBiopsy = (id) => http.patch(`/biopsy/${id}/delete`)

//crud.routes
export const register = ({name, email, password, dni}) =>
    http.post("/register", {name, email, password, dni})

export const updateUser = ({
    name,
    role,
    address,
    phone,
    city,
    zipcode,
    id,
    quote,
    services,
    disciplines,
}) =>
    http.patch(`/user-profile/${id}/edit`, {
        name,
        role,
        address,
        phone,
        city,
        zipcode,
        id,
        quote,
        services,
        disciplines,
    })

export const updateUserAvatar = (data, id) => {
    let fd = new FormData()
    fd.append("file", data)

    const config = {headers: {"Content-Type": "multipart/form-data"}}
    return http.post(`/user-profile/${id}/edit-avatar`, fd, config)
}

export const updatePassword = ({password, newpassword, id}) =>
    http.post(`/update-password/${id}`, {password, newpassword})

export const deleteUser = (id) => http.get(`/user/${id}/delete`)

