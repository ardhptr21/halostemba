import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="noise absolute inset-0 -z-10 select-none"></div>
      {children}
    </>
  );
}
