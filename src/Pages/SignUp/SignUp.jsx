import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Containers/Layout";
import "./signUp.css"

import { signInWithGoogle, signUp } from "../../Config/firebase";

import {
  TextField,
  Button,
  Box,
  Typography,
  useTheme,
  Container,
  InputLabel,
  InputAdornment,
  IconButton,
  Input,
  FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSelector } from "react-redux";

const SignUpSchema = Yup.object({
  email: Yup
    .string()
    .required("Email je obavezno polje, unesite email")
    .email("Email format nije dobar"),
  password: Yup
    .string()
    .required("Sifra je obavezno polje, unesite sifru")
    .min(6, "Sifra mora da ima najmanje 6 karaktera")
    .max(50, "Sifra mora da ima najvise 50 karaktera"),
  confirm_password: Yup
    .string()
    .label("confirm password")
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')});

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth)
  console.log(authState, "authState")

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const signUpSubmit = async (values) => {
    try {
      await signUp(values.email, values.password);
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  const signInWithGoogleHandler = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Layout>
      <Formik
        initialValues={{ email: "", password: "", confirm_password: "" }}
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
          <Container
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h3" color="primary" gutterBottom mb={5}>
              Sign up
            </Typography>
            <Box my={1}>
              <TextField
                variant="standard"
                label="Email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                style={{ width: "400px" }}
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
            <Box my={1}>
              <FormControl variant="standard">
                <InputLabel
                  sx={{ color: "grey" }}
                >
                  Password
                </InputLabel>
                <Input
                  style={{ width: "400px" }}
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
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
            </Box>

            <Box my={1}>
              <FormControl variant="standard">
                <InputLabel
                  htmlFor="standard-adornment-password"
                  sx={{ color: "grey" }}
                >
                  Confirm Password
                </InputLabel>
                <Input
                  style={{ width: "400px" }}
                  label="Confirm password"
                  name="confirm_password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirm_password}
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
                {errors.confirm_password && touched.confirm_password && `* ${errors.confirm_password}`}
              </Typography>
            </Box>

            <Box
              mt={5}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "410px",
                gap: "30px",
              }}
            >
              <Button
                onClick={handleSubmit}
                type="button"
                variant="contained"
                style={{ width: "50%" }}
              >
                Sign up
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
                Sign up with Google
              </Button>
            </Box>
            <Link
              to={"/login"}
              className="link"
              style={{ color: theme.palette.text.secondary }}
            >
              Have an account already? <span>Log in</span>
            </Link>
          </Container>
        )}
      </Formik>
    </Layout>
  );
};

export default SignUp;
