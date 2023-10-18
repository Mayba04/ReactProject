import axios from "axios"

const instance = axios.create({
    baseURL: "https://localhost:5001/api/User",
    headers: {
        "Content-Type" : "application/json"
    }
})

instance.interceptors.request.use(
    (config: any) => {
      const token = getAccessToken();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (err.response) {
        // Validation failed, ...
        if (err.response.status === 400 && err.response.data) {
          return Promise.reject(err.response.data);
        }
        // Access Token was expired
        if (
          err.response.status === 401 &&
          !originalConfig._retry &&
          getAccessToken() != null
        ) {
          originalConfig._retry = true;
          try {
            const rs = await refreshAccessToken();
            const { accessToken, refreshToken } = rs.data;
            setRefreshToken(refreshToken);
            setAccessToken(accessToken);
            instance.defaults.headers.common["Authorization"] =
              "Bearer " + accessToken;
            return instance(originalConfig);
          } catch (_error: any) {
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data);
            }
            return Promise.reject(_error);
          }
        }
        if (err.response.status === 403 && err.response.data) {
          return Promise.reject(err.response.data);
        }
        if (err.response.status === 404) {
          if (axios.isAxiosError(err)) {
            return Promise.reject(err.response.data);
          }
          return;
        }
      }
      return Promise.reject(err);
    }
  );

const responseBody: any = (response: any) => response.data;

const requests = {
    get: (url: string) => instance.get(url).then().then(responseBody),
    post: (url: string, body?: any) => instance.post(url, body).then().then(responseBody)
}

const User = {
    login: (user: any) => requests.post(`/Login`, user),
    logout: (userId: string) => requests.get(`/LogOut?userId=` + userId),
    getAll: ()=> requests.get('/GetAll'),
    getById: (userId: string)=> requests.get('/getUserById?userId=' + userId),
    adduser: (user: any) => requests.post(`/CreatUser`, user),
    deleteuser: (userId: string) => requests.post(`/DeleteUser`, userId),
    getAllRoles: ()=> requests.get('GetAllRoles'),
    editUser: (user: any) => requests.post(`/EditUser`, user),
}

export async function login(user: any){
    const data = await User.login(user)
    .then((response) => {
        console.log("Response from API:", response.data);
        return {
            response
        }
    })
    .catch((error) => {
        console.error("Error during login:", error);
        return error.response
    } )
    return data
}

export async function logout(userId: string){
  removeTokens();
    const data = await User.logout(userId)
    .then((response) => {
        return {
            response
        }
    })
    .catch((error) => {
        return error.response
    } )
    return data
}

export async function GetAll (){
  const data = await User.getAll()
  .then((response) => {
      return {
          response
      }
  })
  .catch((error) => {
      return error.response
  } )
  return data
}

export async function GetById (userId: string){
  const data = await User.getById(userId)
  .then((response) => {
      return {
          response
      }
  })
  .catch((error) => {
      return error.response
  } )
  return data
}

export async function getAllRoles (){
  const data = await User.getAllRoles()
  .then((response) => {
      return {
          response
      }
  })
  .catch((error) => {
      return error.response
  } )
  return data
}


export async function deleteuser(userId: string){
    const data = await User.deleteuser(userId)
    .then((response) => {
        return {
            response
        }
    })
    .catch((error) => {
        return error.response
    } )
    return data
}

export async function adduser(user: any) {
  const data = await User.adduser(user)
  .then((response) => {
      console.log("Response from API:", response.data);
      return {
          response
      }
  })
  .catch((error) => {
      console.error("Error during add user:", error);
      return error.response
  } )
  return data
}


export async function editUser(user: any){
  console.log(user);
  const data = await User.editUser(user)
  .then((response) => {
      console.log("Response from API:", response.data);
      return {
          response
      }
  })
  .catch((error) => {
      console.error("Error during login:", error);
      return error.response
  } )
  return data
}

export function setSelectedUser(user: any) {
  user = JSON.stringify(user);
  window.localStorage.setItem("selectedUser", user);
}

export function getSelectedUser() {
  let selectedUser: any = window.localStorage.getItem("selectedUser");
  selectedUser = JSON.parse(selectedUser);
  return selectedUser;
}

function refreshAccessToken() {
    console.log("refreshAccessToken");
    return instance.post("/RefreshToken", {
      token: getAccessToken(),
      refreshToken: getRefreshToken(),
    });
  }

export function setAccessToken(token: string){
    window.localStorage.setItem("accessToken", token)
}

export function setRefreshToken(refreshToken: string){
    window.localStorage.setItem("refreshToken", refreshToken)
}

export function getAccessToken(): null | string{
    const token = window.localStorage.getItem("accessToken")
    return token;
}

export function getRefreshToken(): null | string{
    const token = window.localStorage.getItem("refreshToken")
    return token;
}

export function removeTokens(){
    window.localStorage.removeItem("accessToken")
    window.localStorage.removeItem("refreshToken")
    window.localStorage.removeItem("selectedUser")
}

