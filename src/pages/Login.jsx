import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { instance } from "../instance";
import Cookies from "js-cookie";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const res = await instance({
        method: "POST",
        url: "/login",
        data: {
          email: values.email,
          password: values.password,
        },
      }).catch((err) => {
        if (err.response.data.success === false) {
          alert(err.response.data.message);
        }
      });
      if (res.data.success === false) {
        alert(res.data.message);
      }
      if (res.data.success === true) {
        Cookies.set("user", res.data.token);
        dispatch(authActions.login());
      }
    },
  });

  return (
    <div className="login-container">
      <form onSubmit={formik.handleSubmit}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            window.location.href = "/register";
          }}
        >
          Register
        </Button>
        <h1>Login</h1>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
