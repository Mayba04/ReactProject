import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useEffect } from "react";
import { useActions } from "../../../hooks/useActions";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { EditUser, GetUserById } from "../../../store/action-creators/userActions";

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  emailConfirmed: boolean;
  lockedOut: string;
  role: string;
}

const AllUsers = () => {
  const { GetAllUsers, DeleteUsers, SelectdUser } = useActions();
  const { allUsers, user } = useTypedSelector((store) => store.UserReducer);

  
  useEffect(() => {
    GetAllUsers();
  }, []);
  


  const handleEditUser = (users: any) => {
    console.log(users);
    SelectdUser(users)
    //GetUserById(userId);
  };

  const handleDeleteUser = (userId: string) => {
    DeleteUsers(userId);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Surname</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">phone</TableCell>
            <TableCell align="left">lockedOut</TableCell>
            <TableCell align="left">Confirm email</TableCell>
            <TableCell align="left">Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers.map((users: UserData) => (
            <TableRow key={users.email}>
              <TableCell align="left">{users.firstName}</TableCell>
              <TableCell align="left">{users.lastName}</TableCell>
              <TableCell align="left">{users.email}</TableCell>
              <TableCell align="left">{users.phoneNumber}</TableCell>
              <TableCell align="left">
                {users.lockedOut? "True" : "False"}
              </TableCell>
              <TableCell align="left">
                {users.emailConfirmed ? "True" : "False"}
              </TableCell>
              <TableCell align="left">{users.role}</TableCell>
              {user.role === "Administrator" && user.id !== users.id && (
                <TableCell align="left">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteUser(users.id)}
                  >
                    Delete
                  </Button>
                  <Link to="/dashboard/editUsers">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditUser(users)}
                  >
                    Edit
                  </Button></Link>
                </TableCell>
              )} 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllUsers;
