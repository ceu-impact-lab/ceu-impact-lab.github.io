import type { Metadata } from "next";
import { Suspense } from "react";
import { ClientSlides } from "./ClientSlides";

export const metadata: Metadata = {
  title: "Presentación Reto 03",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RetoIaOperacionesPresentation() {
  return (
    <Suspense>
      <ClientSlides />
    </Suspense>
  );
}
