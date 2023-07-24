import React from 'react'
import { auth, updateNewPassword } from '../../Config/firebase';
import { Formik } from "formik";
import * as yup from "yup";
import Layout from "../../Containers/Layout";

import {
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { useTheme } from '@emotion/react';
import { current } from '@reduxjs/toolkit';

const passwordSchema = yup.object({
    password: yup
      .string()
      .required("Sifra je obavezno polje, unesite sifru")
      .min(6, "Sifra mora da ima najmanje 6 karaktera")
      .max(50, "Sifra mora da ima najvise 50 karaktera"),
  });

function Password() {
    const theme = useTheme()
    console.log(auth?.currentUser)

    const submitPassword = async (data) => {
     try {
        await  updateNewPassword(auth?.currentUser, data);
        console.log(data)
     } catch(err) {
        alert(`Vasa nova lozinka ${data} je uspesno promenjena`)
    }
    }

  return (
<Layout        
    >
      <Formik
        initialValues={{password: "" }}
        validationSchema={passwordSchema}
        onSubmit={(values, actions) => {
            submitPassword(values);
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
Change password            </Typography>
            
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
                  
            </Box>
            <Button onClick={handleSubmit} type="button" variant="contained">
              Submit
            </Button>
          </div>
        )}
      </Formik>
    </Layout>  )
}

export default Password