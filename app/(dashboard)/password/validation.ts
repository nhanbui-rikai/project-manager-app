import Joi from "joi";

const validation = Joi.object({
  oldPassword: Joi.string(),
  newPassword: Joi.string()
    .min(6)
    .pattern(new RegExp("(?=.*[a-z])")) // Chữ cái thường
    .pattern(new RegExp("(?=.*[A-Z])")) // Chữ cái hoa
    .pattern(new RegExp("(?=.*\\d)")) // Số
    .pattern(new RegExp("(?=.*[!@#$%^&*])")) // Ký tự đặc biệt
    .required()
    .label("new password")
    .messages({
      "string.pattern.base":
        "Password must include at least one lowercase letter, one uppercase letter, one number, and one special character.",
    }),
  confirmPassword: Joi.any()
    .equal(Joi.ref("newPassword"))
    .required()
    .label("confirm password")
    .messages({ "any.only": "Password and confirm password must match" }),
});

export default validation;
