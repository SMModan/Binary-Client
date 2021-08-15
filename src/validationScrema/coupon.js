import * as Yup from "yup";
const CreateCouponSchema = Yup.object().shape({
  name: Yup.string().required("Coupon name required"),
  code: Yup.string().required("Coupon code required"),
  duration: Yup.object().required("Coupon duration required"),
  amount_off: Yup.string().required("Coupon off amount required"),
});
export { CreateCouponSchema };
