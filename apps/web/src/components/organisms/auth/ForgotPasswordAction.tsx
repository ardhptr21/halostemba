"use client";

import { useForgotPasswordStore } from "~/store/auth/forgot-password-store";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";
import VerifyOTP from "./VerifyForgotPasswordOTP";

export default function ForgotPasswordAction() {
  const store = useForgotPasswordStore();

  return (
    <>
      {!store.email ? <ForgotPasswordForm /> : null}
      {store.email && !store.token ? <VerifyOTP /> : null}
      {store.email && store.token ? <ResetPasswordForm /> : null}
    </>
  );
}
