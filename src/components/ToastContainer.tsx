"use client";

import { ToastContainer as ToastContainerLib } from "react-toastify";

// criamos componente para fazer controle da quantidade de toasts
// e também porque o NextJS não sabe que ele deve ser client component
export function ToastContainer() {
  return <ToastContainerLib />;
}
