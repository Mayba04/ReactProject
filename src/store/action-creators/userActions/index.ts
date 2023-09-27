import { UserActionTypes, UserActions } from "../../reducers/userReducer/types";
import { Dispatch } from "redux"
import { toast } from "react-toastify"

// Import services
import { login } from "../../../pages/auth/services/api-user-service";

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
               console.log("accessToken ", accessToken, " refreshToken ", refreshToken)
            }
         }
         catch(e){
            dispatch({type: UserActionTypes.SERVER_ERROR, payload: "Unknown error!"})
         }
    }
}