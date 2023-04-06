import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="mb-[80px] mt-[calc(72px+40px)]">{children}</main>
      <Footer />
    </>
  );
}
