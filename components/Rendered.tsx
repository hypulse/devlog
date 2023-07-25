"use client";

import { useEffect } from "react";

const Rendered = () => {
  useEffect(() => {
    document.body.classList.add("rendered");
  }, []);

  return null;
};

export default Rendered;
