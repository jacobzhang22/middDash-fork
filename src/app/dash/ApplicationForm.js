import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function ApplicationForm({ data }) {
  return (
    <div>
      <Formik
        initialValues={{ email: data.email, year: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            fetch("/api/applications", {
              method: "POST",
              body: JSON.stringify({
                year: values.year,
              }),
            });
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form>
            <div> Email </div>
            <Field type="email" name="email" disabled />
            <ErrorMessage name="email" component="div" />
            <div> Year </div>
            <Field type="text" name="year" />
            <ErrorMessage name="year" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
