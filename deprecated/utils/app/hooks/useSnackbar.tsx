"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

type SnackBarType = "success" | "error";

interface SnackBarContextProps {
  open: boolean;
  message: string;
  type: SnackBarType;
  showSnackBar: (message: string, type: SnackBarType) => void;
  hideSnackBar: () => void;
}

const SnackBarContext = createContext<SnackBarContextProps | undefined>(
  undefined
);

interface SnackBarProviderProps {
  children: ReactNode;
}

const SnackBarProvider: React.FC<SnackBarProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<SnackBarType>("success");

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      hideSnackBar();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [open]);

  const showSnackBar = (msg: string, type: SnackBarType = "success") => {
    setMessage(msg);
    setType(type);
    setOpen(true);
  };

  const hideSnackBar = () => {
    setOpen(false);
  };

  return (
    <SnackBarContext.Provider
      value={{ open, message, type, showSnackBar, hideSnackBar }}
    >
      {children}
    </SnackBarContext.Provider>
  );
};

const useSnackBar = () => {
  const context = useContext(SnackBarContext);
  if (!context) {
    throw new Error("useSnackBar must be used within a SnackBarProvider");
  }
  return context;
};

export default useSnackBar;
export { SnackBarProvider };
