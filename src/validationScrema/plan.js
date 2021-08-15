import * as Yup from "yup";
const CreatePlanSchema = Yup.object().shape({
  product_id: Yup.number().required("Product ID Required"),
  name: Yup.string().required("Plan Name Required"),
  description: Yup.string().nullable(),
  amount: Yup.number().required("Plan Amount Required"),
  plan_interval:  Yup.string().required("Plan Interval Required"),
  interval_count:  Yup.number().required("Plan Interval Count Required"),
});
export { CreatePlanSchema };
