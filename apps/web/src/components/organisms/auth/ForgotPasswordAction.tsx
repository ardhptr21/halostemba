"use client";

import { useForgotPasswordStore } from "~/store/auth/forgot-password-store";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";
import VerifyForgotPasswordOTP from "./VerifyForgotPasswordOTP";

export default function ForgotPasswordAction() {
  const store = useForgotPasswordStore();

  return (
    <>
      {!store.email ? <ForgotPasswordForm /> : null}
      {store.email && !store.token ? <VerifyForgotPasswordOTP /> : null}
      {store.email && store.token ? <ResetPasswordForm /> : null}
    </>
  );
}
