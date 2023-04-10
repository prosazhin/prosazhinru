/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";
import { useAppContext } from "@/lib/context";

export default function Layout({ children }) {
  const { setIsActiveMenu } = useAppContext();

  useEffect(() => {
    setIsActiveMenu(false);
  }, []);

  return (
    <>
      <Header />
      <main className="mb-[80px] mt-[calc(72px+40px)]">{children}</main>
      <Footer />
      <MobileMenu />
    </>
  );
}
