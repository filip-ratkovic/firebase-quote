import React, { useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import {useNavigate } from "react-router-dom";
import { addQuote, auth } from "../../Config/firebase";
import Layout from "../../Containers/Layout";

import {
  TextField,
  Button,
  Box,
  Typography,
  useTheme,
} from "@mui/material";

const newQuoteSchema = yup.object({
  text: yup
    .string()
    .required("text je obavezno polje")
    .min(6, "text mora da ima najmanje 6 karaktera")
    .max(300, "text mora da ima najvise 200 karaktera"),
  author: yup
    .string()
    .required("Author je obavezno polje")
    .min(2, "Author mora da ima najmanje 2 karaktera")
    .max(50, "Author mora da ima najvise 50 karaktera"),
});

const AddQuote = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const userEmail = auth?.currentUser?.email;

  const submitAddQuote = async (values) => {
    try {
      await addQuote(values);
      alert("Uspesno !")
      navigate("/")
    } catch(err) {
      console.error(err)
    }
  }

 useEffect(()=> {
  if (!userEmail) {
    navigate("/");
    alert("nemate pristup");
  }
 })
  return (
    <Layout>
      <Formik
        initialValues={{
          text: "",
          author: "",
          likes: 0,
          isLiked: false
        }}
        validationSchema={newQuoteSchema}
        onSubmit={(values, actions) => {
          submitAddQuote(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Box sx={{textAlign:"center"}}>
            <Box my={1}>
              <TextField
                variant="outlined"
                label="Author name"
                type="text"
                name="author"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.author}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
              <Typography variant="body1" color="error">
                {errors.author && touched.author && errors.author}
              </Typography>
            </Box>

            <Box my={1}>
              <TextField
                variant="outlined"
                label="Quote text"
                type="text"
                name="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.text}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
              <Typography variant="body1" color="error">
                {errors.text && touched.text && errors.text}
              </Typography>
            </Box>
            <Button onClick={handleSubmit} type="button" variant="contained">
              Add Quote
            </Button>
          </Box>
        )}
      </Formik>
    </Layout>
    
  );
};

export default AddQuote;
