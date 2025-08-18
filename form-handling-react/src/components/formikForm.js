import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// validation schema with Yup
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const FormikForm = () => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      const result = await response.json();
      console.log("User registered (Formik):", result);
      alert("User registered successfully with Formik!");
      resetForm();
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="p-4 border rounded shadow-md max-w-md mx-auto mt-6">
          <h2 className="text-xl font-bold mb-4">Formik Form</h2>

          <Field
            type="text"
            name="username"
            placeholder="Username"
            className="border p-2 w-full mb-2"
          />
          <ErrorMessage
            name="username"
            component="div"
            className="text-red-500"
          />

          <Field
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2 w-full mb-2"
          />
          <ErrorMessage name="email" component="div" className="text-red-500" />

          <Field
            type="password"
            name="password"
            placeholder="Password"
            className="border p-2 w-full mb-2"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500"
          />

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
