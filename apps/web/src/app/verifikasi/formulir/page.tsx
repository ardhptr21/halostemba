"use client";
import React from "react";
import VerificationLayout from "~/components/layouts/VerificationLayout";
import VerifyStudentForm from "~/components/organisms/verification/VerifyStudentForm";

export default function Page() {
  return (
    <VerificationLayout>
      <VerifyStudentForm />
    </VerificationLayout>
  );
}
