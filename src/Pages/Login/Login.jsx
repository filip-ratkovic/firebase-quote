import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Containers/Layout";

import {
  TextField,
  Button,
  Box,
  Typography,
  useTheme,
  Container,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { login, resetPassword, signInWithGoogle } from "../../Config/firebase";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const signInWithGoogleHandler = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  const submitLogin = async (values) => {
    try {
      await login(values.email, values.password);
      navigate("/");
    } catch (error) {
      setForgotPassword(true);
      alert(error.message);
    }
  };

  const forgotPasswordHandler = async (data) => {
    try {
      await resetPassword(data);
      alert(`We sent a password reset email on ${data}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Layout>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values, actions) => {
          submitLogin(values);
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
          <Container
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
               maxWidth:"100%"
            }}
            
          >
            <Typography variant="h3" color="primary" gutterBottom mb={5}>
              Log in
            </Typography>
            <Box my={1} style={{maxWidth:"100%"}}>
              <TextField
                variant="standard"
                label="Email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                style={{ width: "400px", maxWidth:"100%"}}
                sx={{
                  "& label": {
                    color: "grey",
                  },

                  // "& .MuiFormLabel-root.Mui-focused": {
                  //     color: 'blue'
                  // },
                }}
              />
              <Typography variant="body2" color="error">
                {errors.email && touched.email && `* ${errors.email}`}
              </Typography>
            </Box>
            <Box my={1} style={{maxWidth:"100%"}}>
              <FormControl variant="standard" style={{width:"100%"}} >
                <InputLabel
                style={{width:"100%"}}
                  htmlFor="standard-adornment-password"
                  sx={{ color: "grey" }}
                >
                  Password
                </InputLabel>
                <Input
                style={{ width: "400px",maxWidth:"100%" }}
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  sx={{
                    "& label": {
                      color: "grey",
                    },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        sx={{ color: "grey" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Typography variant="body2" color="error">
                {errors.password && touched.password && `* ${errors.password}`}
              </Typography>

              {forgotPassword && (
                <Typography
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => forgotPasswordHandler(values.email)}
                >
                  Forgot password ?
                </Typography>
              )}
            </Box>
            <Box
              mt={5}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "410px",
                gap: "30px",
                maxWidth:"100%"
              }}
            >
              <Button
                onClick={handleSubmit}
                type="button"
                variant="contained"
                style={{ width: "50%" }}
              >
                Log in
              </Button>

              <Button
                onClick={signInWithGoogleHandler}
                type="button"
                variant="contained"
                style={{
                  width: "50%",
                  backgroundColor: theme.palette.text.primary,
                  color: theme.palette.background,
                }}
              >
                Log in with Google
              </Button>
            </Box>
            <Link
              to={"/signup"}
              className="link"
              style={{ color: theme.palette.text.secondary }}
            >
              Don't have an account? <span>Sign up</span>
            </Link>
          </Container>
        )}
      </Formik>
    </Layout>
  );
};

export default Login;
