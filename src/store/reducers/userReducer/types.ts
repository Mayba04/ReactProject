export interface UserState{
    user: any,
    message: null | string,
    loading: boolean,
    error: null | string,
    isAuth: boolean,
    selectedUser: any,
    allUsers: [],
    allRoles: [],
}

export enum UserActionTypes {
    START_REQUEST = "START_REQUEST",
    FINISHED_REQUEST = "FINISHED_REQUEST",
    LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS",
    LOGIN_USER_ERROR = "LOGIN_USER_ERROR",
    SERVER_ERROR = "SERVER_ERROR",
    LOGOUT_USER = "LOGOUT_USER",
    USERS_LIST = "USERS_LIST",
    ADD_USER = "ADD_USER",
    DELETE_USER = "DELETE_USER",
    ROLES_LIST = "ROLES_LIST",
    EDIT_USER = "EDIT_USER",
    GETBYID_USER = "GETBYID_USER",
    SELECTED_USER = "SELECTED_USER"
}

interface StartRequestAction {
    type: UserActionTypes.START_REQUEST
}

interface LogoutUserAction {
    type: UserActionTypes.LOGOUT_USER;
  }

interface FinishRequestAction {
    type: UserActionTypes.FINISHED_REQUEST
}

interface LoginUserSuccessAction{
    type: UserActionTypes.LOGIN_USER_SUCCESS,
    payload: any
}

interface LoginUserErrorAction{
    type: UserActionTypes.LOGIN_USER_ERROR,
    payload: any
}

interface ServerErrorAction{
    type: UserActionTypes.SERVER_ERROR,
    payload: any
}

interface UserListAction{
    type: UserActionTypes.USERS_LIST,
    payload: any
}

interface RolesListAction{
    type: UserActionTypes.ROLES_LIST,
    payload: any
}

interface AddUserAction{
    type: UserActionTypes.ADD_USER,
    payload: any
}

interface DeleteUserAction{
    type: UserActionTypes.DELETE_USER,
    payload: any
}

interface EditUserAction {
    type: UserActionTypes.EDIT_USER;
    payload: any
  }

  interface GetUserByIdUserAction {
    type: UserActionTypes.GETBYID_USER;
    payload: any
  }

interface SelectdUser {
    type: UserActionTypes.SELECTED_USER;
    payload: any
}
  

export type UserActions = SelectdUser | GetUserByIdUserAction | EditUserAction| RolesListAction | DeleteUserAction | AddUserAction | UserListAction | LogoutUserAction | StartRequestAction | FinishRequestAction | LoginUserSuccessAction | LoginUserErrorAction | ServerErrorAction