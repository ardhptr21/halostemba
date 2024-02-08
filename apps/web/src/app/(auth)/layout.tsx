import Image from "next/image";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="noise absolute inset-0 -z-10 select-none"></div>
      <main
        className="flex flex-col items-center justify-center h-screen px-5 py-12 bg-center bg-cover"
        style={{
          backgroundImage: "url(/assets/images/svg/grid-pattern.svg)",
        }}
      >
        <Image
          src="/assets/images/logo.png"
          width={315}
          height={63}
          alt="Logo halostemba"
          className="mb-12 w-64 xl:w-80"
        />
        {children}
      </main>
    </>
  );
}
