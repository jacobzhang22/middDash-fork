"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";

export default function ApplicationForm({ data }) {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  return (
    <div>
      {!hasSubmitted ? (
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
              })
                .then((res) => res.json())
                .then((res) => {
                  if (res.status === "success") {
                    toast.success(`Application submitted`);
                    setHasSubmitted(true);
                  }
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
              <div> Grad Year </div>
              <Field type="text" name="year" />
              <ErrorMessage name="year" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <div className="text-center  ">
          <div className="text-[20px] py-3 ">Thanks for submitting!</div>
          <div className="text-[15px]">
            Your application is now under review. Please expect your application
            to be processed within 2-5 days{" "}
          </div>
        </div>
      )}
    </div>
  );
}
