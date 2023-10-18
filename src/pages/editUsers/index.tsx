import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material";
import { useFormik } from "formik";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { editUser } from "../auth/services/api-user-service";
import { Navigate } from "react-router-dom";

interface FormValues {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phoneNumber: string;
}
const validate = (values: FormValues) => {
  const errors: Partial<FormValues> = {};

  if (!values.firstName) {
    errors.firstName = "Required";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  }

  if (!values.role) {
    errors.role = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

const defaultTheme = createTheme();

const EditUsers = () => {
  const { EditUser } = useActions();
  const { selectedUser } = useTypedSelector((state) => state.UserReducer);
  console.log("selected user" + selectedUser);
  const [ isRedirect, setIsRedirect ] = useState(false);

  const formik = useFormik({
    initialValues: {
      id: selectedUser?.id || "",
      firstName: selectedUser?.firstName || "",
      lastName: selectedUser?.lastName || "",
      role: selectedUser?.role || "",
      email: selectedUser?.email || "",
      phoneNumber: selectedUser?.phoneNumber || "",
    },
    validate,
    onSubmit: (values) => {
      const userData = {
        id: values.id,
        firstName: values.firstName,
        lastName: values.lastName,
        role: values.role,
        email: values.email,
        phoneNumber: values.phoneNumber,
      };

      editUser(userData).then((response) => {
        console.log(response);
        EditUser(response);
        setIsRedirect(true);
      });
    },
  });

  if(isRedirect)
  {
    return <Navigate to="/dashboard/users"/>
  }else
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Edit User
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <TextField
              margin="normal"
              id="id"
              label="ID"
              name="id"
              type="hidden"
              value={formik.values.id}
              onChange={formik.handleChange}
              inputProps={{ style: { display: "none" } }}
            />

            <TextField
              margin="normal"
              id="firstName"
              label="First Name"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              fullWidth
            />

            <TextField
              margin="normal"
              id="lastName"
              label="Last Name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              fullWidth
            />
            <TextField
              margin="normal"
              id="role"
              label="Role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              fullWidth
            />

            <TextField
              margin="normal"
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3, ml: "auto" }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default EditUsers;
