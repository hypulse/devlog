import { useEffect } from "react";

const AppRendered = () => {
  useEffect(() => {
    document.body.classList.add("rendered");
  }, []);

  return null;
};

export default AppRendered;
