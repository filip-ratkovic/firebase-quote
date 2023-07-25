import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { authSlice } from "../../Store/authSlice";
import Layout from "../../Containers/Layout";

import { auth, googleProvider, logout, signUp } from "../../Config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { TextField, Button, Box, Typography, useTheme, Container } from "@mui/material";
import { authSlice } from "../../Store/authSlice";
import { store } from "../../Store/store";
import "./signUp.css"
const SignUpSchema = yup.object({
  email: yup
    .string()
    .required("Email je obavezno polje, unesite email")
    .email("Email format nije dobar"),
  password: yup
    .string()
    .required("Sifra je obavezno polje, unesite sifru")
    .min(6, "Sifra mora da ima najmanje 6 karaktera")
    .max(50, "Sifra mora da ima najvise 50 karaktera"),
});

const SignUp = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const signUpSubmit = async (values) => {
    try {
      await signUp(values.email, values.password)
    } catch (error) {
      alert(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      alert(error);
    }
  };

  const HandleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      alert(error);
    }  };

  return (
    <Layout>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignUpSchema}
        onSubmit={(values, actions) => {
          signUpSubmit(values);
        }}
        style={{ backgroundColor: theme.palette.secondary.main }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Container style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
            <Typography variant="h4" color="primary" gutterBottom>
              Sign in
            </Typography>
            <Box my={1} >
              <TextField
              style={{width:"400px"}}
                variant="standard"
                label="Email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                  width:"500px"
                }}
              />
              <Typography variant="body1" color="error">
                {errors.email && touched.email && errors.email}
              </Typography>
            </Box>
            <Box my={1}>
              <TextField
                style={{width:"400px"}}
                variant="standard"
                label="Password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
              <Typography variant="body1" color="error">
                {errors.password && touched.password && errors.password}
              </Typography>
            </Box>
            <Button onClick={handleSubmit} type="button" variant="contained"               style={{width:"400px"}}
>
              Sign in
            </Button>

            <Button
              onClick={signInWithGoogle}
              type="button"
              variant="contained"
              style={{width:"400px"}}

            >
              Sign in with Google
            </Button>

            <Button onClick={HandleLogout} type="button" variant="contained"               style={{width:"400px"}}
>
              Logout
            </Button>
          </Container>
        )}
      </Formik>
    </Layout>
  );
};

export default SignUp;
