"use client";

import useSnackBar from "@/utils/app/hooks/useSnackbar";
import {
  IconamoonCloseThin,
  MaterialSymbolsCheckCircleOutlineRounded,
  BxError,
} from "./icons";

const SnackBar = () => {
  const { open, message, type, hideSnackBar } = useSnackBar();

  return (
    <div
      className="fixed bottom-0 left-0 z-50"
      style={{
        transform: open ? "translateX(0)" : "translateX(-100%)",
      }}
    >
      <div
        className={`flex items-center max-w-xs border-l-4 shadow px-tagPaddingX py-buttonPaddingY bg-cardColor border-borderColor m-cardPadding ${
          type === "success" ? "border-l-successColor" : "border-l-errorColor"
        }`}
      >
        <span className="text-extra mr-rowGap">
          {type === "success" ? (
            <MaterialSymbolsCheckCircleOutlineRounded className="text-successColor" />
          ) : (
            <BxError className="text-errorColor" />
          )}
        </span>
        <span className="text-caption mr-columnGap">{message}</span>
        <button onClick={hideSnackBar} className="p-tagPaddingY">
          <IconamoonCloseThin className="text-textSecondaryColor text-extra" />
        </button>
      </div>
    </div>
  );
};

export default SnackBar;
