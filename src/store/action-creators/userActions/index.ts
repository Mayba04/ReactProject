import { UserActionTypes, UserActions } from "../../reducers/userReducer/types";
import { Dispatch } from "redux";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

// Import services
import {
  login,
  logout,
  removeTokens,
  setAccessToken,
  setRefreshToken,
  GetAll,
  adduser,
  deleteuser,
  getAllRoles,
  editUser,
  GetById,
  setSelectedUser,
  getSelectedUser,
} from "../../../pages/auth/services/api-user-service";

export const LoginUser = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await login(user);
      const { response } = data;
      if (!response.success) {
        dispatch({
          type: UserActionTypes.LOGIN_USER_ERROR,
          payload: response.message,
        });
        toast.error(response.message);
      } else {
        toast.success(response.message);
        const { accessToken, refreshToken, message } = response;
        //console.log("accessToken ", accessToken, " refreshToken ", refreshToken)
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        AuthUser(accessToken, message, dispatch);
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_ERROR,
        payload: "Unknown error!",
      });
    }
  };
};

export const LogOut = (id: string) => {
  return async (dispatch: Dispatch<UserActions>) => {
    const data = await logout(id);
    console.log("LogOut " + data);
    if (data && data.response && data.response.success) {
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
    console.log("Get" + response);
    if (response.success) {
      dispatch({
        type: UserActionTypes.USERS_LIST,
        payload: { allUser: response.payload, message: response.message },
      });
    }
  };
};

export const GetAllRoles = () => {
  return async (dispatch: Dispatch<UserActions>) => {
    const { response } = await getAllRoles();
    console.log("Get" + response);
    if (response.success) {
      dispatch({
        type: UserActionTypes.ROLES_LIST,
        payload: { allRoles: response.payload, message: response.message },
      });
    }
  };
};

export const DeleteUsers = (userId: string) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      const data = await deleteuser(userId);
      const { response } = data;
      if (response.success) {
        toast.success(response.message);

        GetAllUsers()(dispatch);
      } else {
        toast.error(response.message);
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const AddUsers = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await adduser(user);
      const { response } = data;
      if (!response.isSuccess) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        dispatch({
          type: UserActionTypes.ADD_USER,
          payload: response.message,
        });
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const EditUser = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      const data = await editUser(user);
      const { response } = data;
      if (response.success) {
        toast.success(response.message);
        dispatch({
          type: UserActionTypes.EDIT_USER,
          payload: { selectedUser: user, message: response.message },
        });
        GetAllUsers()(dispatch);
      } else {
        toast.error(response.message);
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const GetUserById = (userId: string) => {
  return async (dispatch: Dispatch<UserActions>) => {
    console.log("GetID" + userId);
    const data = await GetById(userId);
    const { response } = data;
    console.log("Get", response);
    if (response.success) {
      dispatch({
        type: UserActionTypes.GETBYID_USER,
        payload: { selectedUser: response.payload },
      });
    }
  };
};



export const editUserAction = (updatedUser: any, message: string) => {
  return {
    type: UserActionTypes.EDIT_USER,
    payload: { updatedUser, message },
  };
};

export const AuthUser = (
  token: string,
  message: string,
  dispatch: Dispatch<UserActions>
) => {
  const decodedToken = jwtDecode(token) as any;
  dispatch({
    type: UserActionTypes.LOGIN_USER_SUCCESS,
    payload: { message, decodedToken },
  });
};

export const SelectdUser = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
      dispatch({ type: UserActionTypes.GETBYID_USER, payload: {selectedUser: user} });
      setSelectedUser(user);
  };
};

export const SelectUser = (selectedUser: any, dispatch: Dispatch<UserActions> ) => {
  dispatch({ type: UserActionTypes.GETBYID_USER, payload: {selectedUser: selectedUser} });
};

export const GetSelectedUserInfo = () => {
  return async (dispatch: Dispatch<UserActions>) => {
      const selecteduser = getSelectedUser();
      dispatch({
          type: UserActionTypes.GETBYID_USER, payload: { selectedUser: selecteduser }
      });
  }
}