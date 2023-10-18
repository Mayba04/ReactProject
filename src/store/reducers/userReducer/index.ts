import { UserState, UserActions, UserActionTypes } from "./types";

const initialState: UserState = {
  user: {},
  message: null,
  loading: false,
  error: null,
  isAuth: false,
  selectedUser: null,
  allUsers: [],
  allRoles: [],
};

const UserReducer = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case UserActionTypes.START_REQUEST:
      return { ...state, loading: true };
    case UserActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: action.payload.decodedToken,
        message: action.payload.message,
      };
    case UserActionTypes.FINISHED_REQUEST:
      return { ...state, loading: false };
    case UserActionTypes.LOGIN_USER_ERROR:
      return { ...state, loading: false, message: action.payload.message };
    case UserActionTypes.SERVER_ERROR:
      return { ...state, loading: false };
    case UserActionTypes.ADD_USER:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: action.payload.decodedToken,
        message: action.payload.message,
      };
    case UserActionTypes.DELETE_USER:
      return {
        ...state,
        user: {},
        message: null,
        loading: false,
        error: null,
        isAuth: false,
        selectedUser: null,
      };
    case UserActionTypes.ROLES_LIST:
      return { ...state, loading: false, allRoles: action.payload.allRoles };
    case UserActionTypes.LOGOUT_USER:
      return {
        user: {},
        message: null,
        loading: false,
        error: null,
        isAuth: false,
        selectedUser: null,
        allUsers: [],
        allRoles: [],
      };
    case UserActionTypes.USERS_LIST:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        allUsers: action.payload.allUser,
      };
    case UserActionTypes.EDIT_USER:
      return {
        ...state,
        loading: false,
        selectedUser: action.payload.updatedUser,
        message: action.payload.message,
      };
    case UserActionTypes.GETBYID_USER:
      return { ...state, selectedUser: action.payload.selectedUser };

    case UserActionTypes.SELECTED_USER:
      return { ...state, loading: false, selectedUser: action.payload.selectedUser };
    default:
      return state;
  }
};

export default UserReducer;
