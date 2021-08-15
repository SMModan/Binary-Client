import * as Yup from "yup";
function equalTo(ref, msg) {
  return Yup.mixed().test({
    name: "equalTo",
    exclusive: false,
    message: msg || "${path} must be the same as ${reference}",
    params: {
      reference: ref.path,
    },
    test: function (value) {
      return value === this.resolve(ref);
    },
  });
}
Yup.addMethod(Yup.string, "equalTo", equalTo);
const SignupSchema = Yup.object().shape({
  first_name: Yup.string().max(50, "Too Long!").required("Required"),
  last_name: Yup.string().max(50, "Too Long!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .equalTo(Yup.ref("password"), "Passwords must match")
    .required("Required"),
});
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is Required"),
  password: Yup.string().required("Password is required"),
});
const ResetPaaswordSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .equalTo(Yup.ref("password"), "Passwords must match")
    .required("Required"),
});
const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is Required"),
});
export { SignupSchema, LoginSchema, ForgotPasswordSchema, ResetPaaswordSchema };
