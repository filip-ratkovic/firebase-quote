import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { addQuote, getQuoteById, updateQuoteData } from "../../Config/firebase";
import Layout from "../../Containers/Layout";

import { TextField, Button, Box, Typography, useTheme } from "@mui/material";
import Loading from "../Loading/Loading";

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

const Edit = () => {
  const [quote, setQuote] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const theme = useTheme();
  const params = useParams();

  const getQuoteData = () => {
    getQuoteById(params.id)
      .then((data) => {
        setQuote(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getQuoteData();
  }, []);

  const submitEditQuote = async (values) => {
    try {
      await updateQuoteData(params.id, values);
      getQuoteData();
      navigate(`/quote/${quote.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <Layout>
      <Formik
        initialValues={{
          text: quote.text,
          author: quote.author,
          likes: quote.likes,
          isLiked: quote.isLiked,
        }}
        validationSchema={newQuoteSchema}
        onSubmit={(values, actions) => {
          submitEditQuote(values);
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
          <Box style={{ textAlign: "center", width:"450px", maxWidth: "90%"}}>
            <Box my={1}>
              <TextField
              style={{width:"100%"}}
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
              style={{width:"100%"}}
              label="Quote text"
                multiline
                id="outlined-multiline-flexible"
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
              Submit edit.
            </Button>
          </Box>
        )}
      </Formik>
    </Layout>
  );
};

export default Edit;
