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
  confirm_password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Register = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      const res = await instance({
        method: "POST",
        url: "/register",
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
            window.location.href = "/login";
          }}
        >
          Login
        </Button>
        <h1>Register</h1>
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
        <TextField
          fullWidth
          id="confirm_password"
          name="confirm_password"
          label="Confirm Password"
          type="password"
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirm_password &&
            Boolean(formik.errors.confirm_password)
          }
          helperText={
            formik.touched.confirm_password && formik.errors.confirm_password
          }
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Register;
