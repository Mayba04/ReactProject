
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material";
import { useFormik } from "formik";
import { adduser } from "../../pages/auth/services/api-user-service";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Loader from "../../components/loader/loader";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import React, { useEffect } from "react";
interface FormValues {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  password: string;
  confirmPassword: string;
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

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Must be 6 characters or more";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

const defaultTheme = createTheme();

const AddUser = () => {
  const { AddUsers, GetAllRoles } = useActions();
  const [ isRedirect, setIsRedirect ] = useState(false);



  useEffect(() => {
    GetAllRoles();
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      role: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      const userData = {
        firstName: values.firstName,
        lastName: values.lastName,
        role: values.role,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword
      };

      adduser(userData).then((response) => {
        console.log(response);
        AddUsers(response);
        setIsRedirect(true);
      });
    },
  });

  const { allRoles } = useTypedSelector((store) => store.UserReducer);

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
                marginTop: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography component="h1" variant="h5">
                Create User
            </Typography>
            <Box
                component="form"
                onSubmit={formik.handleSubmit}
                noValidate
                sx={{ mt: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
            >
                <TextField
                    margin="normal"
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    sx={{ mr: 1, flex: 1 }}
                />
                <TextField
                    margin="normal"
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    sx={{ ml: 1, flex: 1 }}
                />
                <TextField
                    margin="normal"
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    fullWidth
                />
                <TextField
                    margin="normal"
                    id="role"
                    label="Role"
                    name="role"
                    select
                    SelectProps={{
                        native: true,
                    }}
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.role && Boolean(formik.errors.role)}
                    helperText={formik.touched.role && formik.errors.role}
                    fullWidth
                >
                    <option value=""></option>
                    {allRoles.map((option: any) => (
                      <option key={option.id} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                </TextField>
                <TextField
                    margin="normal"
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    fullWidth
                />
                <TextField
                    margin="normal"
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    autoComplete="new-password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.confirmPassword &&
                        Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                        formik.touched.confirmPassword && formik.errors.confirmPassword
                    }
                    fullWidth
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 1, ml: 'auto' }}
                >
                    CreateUser
                </Button>
            </Box>
        </Box>
    </Container>
</ThemeProvider>
  );
};

export default AddUser;
