import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useEffect } from "react";
import { useActions } from "../../../hooks/useActions";



import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface UserData {
  id: string,
  firstName: string,
  lastName : string,
  email: string,
  emailConfirmed: boolean,
  lockedOut: string,
  role: string
}


const AllUsers = () => {
  
  // const { GetAllUsers } = useActions(); // Initialize a state variable
 
  // useEffect(() => {
  //   GetAllUsers()
  // }, []);
  // const { allUsers } = useTypedSelector((store) => store.UserReducer);
  // const rows = allUsers;

  // console.log( "allUsers: " +  allUsers)

  // for( let i =0; i<= allUsers.length; i++)
  // {
  //   console.log( "AllUsers " + allUsers[i]);
  // }
  

  const { GetAllUsers } = useActions();

  useEffect(() => {
    GetAllUsers();
  }, []);

  const { allUsers } = useTypedSelector((store) => store.UserReducer);



  return (
    <TableContainer component={Paper}>
       <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell align="left">Name</TableCell>
        <TableCell align="left">Surname</TableCell>
        <TableCell align="left">Email</TableCell>
        <TableCell align="left">lockedOut</TableCell>
        <TableCell align="left">Confirm email</TableCell>
        <TableCell align="left">Role</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {allUsers.map((user: UserData) => (
        <TableRow key={user.email}>
          <TableCell align="left">{user.firstName}</TableCell>
          <TableCell align="left">{user.lastName}</TableCell>
          <TableCell align="left">{user.email}</TableCell>
          <TableCell align="left">{user.lockedOut}</TableCell>
          <TableCell align="left">{user.emailConfirmed  ? "True" : "False"}</TableCell>
          <TableCell align="left">{user.role}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
      </TableContainer>
  );
};

export default AllUsers;