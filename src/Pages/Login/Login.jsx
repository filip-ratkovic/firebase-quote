import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { authSlice } from "../../Store/authSlice";
import Layout from "../../Containers/Layout";

import {
  TextField,
  Button,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { auth, login, resetPassword } from "../../Config/firebase";

const loginSchema = yup.object({
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

const Login = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const submitLogin = async (values) => {
    try{
      await login(values.email, values.password);
    navigate("/");
    } catch (error) {
        setForgotPassword(true)
        alert(error.message)
        alert(error.code)
    }
};

const forgotPasswordHandler = async (data) => {
 try{
 await resetPassword(data)
  alert(data)
 } catch (error) {
  alert(error.message,  "error paswod", error.code)
 }
}

  return (
    <Layout        
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values, actions) => {
          submitLogin(values);
        }}
        style={{backgroundColor: theme.palette.secondary.main}}
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
              Login page
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
                // className="login-input"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
                    {forgotPassword &&
                     (<Typography style={{color:"blue", cursor:"pointer"}} onClick={()=> forgotPasswordHandler(values.email)}>Forgot password ?</Typography>)}

              <Typography variant="body1" color="error">
                {errors.password && touched.password && errors.password}
              </Typography>
            </Box>
            <Button onClick={handleSubmit} type="button" variant="contained">
              Submit
            </Button>
          </div>
        )}
      </Formik>
    </Layout>
  );
};

export default Login;
