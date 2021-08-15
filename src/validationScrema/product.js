import * as Yup from "yup";
const CreateProductSchema = Yup.object().shape({
  title: Yup.string().required("Title Required"),
});
export { CreateProductSchema };
