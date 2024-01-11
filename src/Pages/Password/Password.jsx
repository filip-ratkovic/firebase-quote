import React, { useState } from "react";
import { auth, updateNewPassword } from "../../Config/firebase";
import { Formik } from "formik";
import * as Yup from "yup";
import Layout from "../../Containers/Layout";

import { current } from "@reduxjs/toolkit";
import {
  TextField,
  Button,
  Box,
  Typography,
  useTheme,
  InputLabel,
  InputAdornment,
  IconButton,
  Input,
  FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const passwordSchema = Yup.object({
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

function Password() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);



  const submitPassword = async (data) => {

    try {
      await updateNewPassword(data.password);
      alert(`Vasa nova lozinka je uspesno promenjena`);
    } catch (err) {
      alert(err)
    }
  };

  return (
    <Layout>
      <Formik
        initialValues={{ password: "", confirm_password: ""}}
        validationSchema={passwordSchema}
        onSubmit={(values, actions) => {
          submitPassword(values);
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
              Change password
            </Typography>

            <Box my={1} style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
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


            </Box>
            <Button
              style={{ marginLeft: "25%" }}
              onClick={handleSubmit}
              type="button"
              variant="contained"
            >
              Submit
            </Button>
          </div>
        )}
      </Formik>
    </Layout>
  );
}

export default Password;
