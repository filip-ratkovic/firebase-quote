import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
// import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
// import { authSlice } from "../../Store/authSlice";
import Layout from "../../Containers/Layout";

import { auth, googleProvider, logout, signUp } from "../../Config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { TextField, Button, Box, Typography, useTheme } from "@mui/material";
import { authSlice } from "../../Store/authSlice";
import { store } from "../../Store/store";

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
    await signUp(values.email, values.password)
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleLogout = async () => {
    await logout()
  };

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
          <div>
            <Typography variant="h4" color="primary" gutterBottom>
              Sign in
            </Typography>
            <Box my={1}>
              <TextField
                variant="outlined"
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
                }}
              />
              <Typography variant="body1" color="error">
                {errors.email && touched.email && errors.email}
              </Typography>
            </Box>
            <Box my={1}>
              <TextField
                variant="outlined"
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
            <Button onClick={handleSubmit} type="button" variant="contained">
              Sign in
            </Button>

            <Button
              onClick={signInWithGoogle}
              type="button"
              variant="contained"
            >
              Sign in with Google
            </Button>

            <Button onClick={HandleLogout} type="button" variant="contained">
              Logout
            </Button>
          </div>
        )}
      </Formik>
    </Layout>
  );
};

export default SignUp;
