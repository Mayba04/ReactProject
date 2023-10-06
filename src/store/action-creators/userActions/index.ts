import { UserActionTypes, UserActions } from "../../reducers/userReducer/types";
import { Dispatch } from "redux"
import { toast } from "react-toastify"
import jwtDecode from "jwt-decode"
// Import services
import { login, logout, removeTokens, setAccessToken, setRefreshToken, GetAll } from "../../../pages/auth/services/api-user-service";

export const LoginUser = (user : any) => {
    return async(dispatch: Dispatch<UserActions>) => {
         try{
            dispatch({type: UserActionTypes.START_REQUEST});
            const data = await login(user);
            const { response } = data;
            if(!response.success){
               dispatch({type: UserActionTypes.LOGIN_USER_ERROR, payload: response.message})
               toast.error(response.message)
            }
            else{
               toast.success(response.message)
               const { accessToken, refreshToken, message } = response;
               //console.log("accessToken ", accessToken, " refreshToken ", refreshToken)
               setAccessToken(accessToken);
               setRefreshToken(refreshToken);
               AuthUser(accessToken, message, dispatch);
            }
         }
         catch(e){
            dispatch({type: UserActionTypes.SERVER_ERROR, payload: "Unknown error!"})
         }
    }
}

export const LogOut = (id: string) => {
   return async (dispatch: Dispatch<UserActions>) => {
     const data = await logout(id);
     console.log("LogOut " + data)
     const { response } = data;
     if (response.success) {
       removeTokens();
       dispatch({
         type: UserActionTypes.LOGOUT_USER,
       });
     }
   };
 };

 export const GetAllUsers = () => {
   return async (dispatch: Dispatch<UserActions>) => {
      const { response } = await GetAll();
      const data = response;
      console.log( "Get" +  response) 
     if (response.success) {
       dispatch({
         type: UserActionTypes.USERS_LIST, payload: {allUser: response.payload, message:response.message}
       });
     }
     }
   };
 

export const AuthUser = (token: string, message: string, dispatch: Dispatch<UserActions>) => {
   const decodedToken = jwtDecode(token) as any;
   dispatch({type: UserActionTypes.LOGIN_USER_SUCCESS, payload: {message, decodedToken}})
} 