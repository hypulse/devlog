import { SVGProps } from "react";

export function MdiLoading(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8Z"
      ></path>
    </svg>
  );
}

export function MdiArrowCollapseUp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M4.08 11.92L12 4l7.92 7.92l-1.42 1.41l-5.5-5.5V22h-2V7.83l-5.5 5.5l-1.42-1.41M12 4h10V2H2v2h10Z"
      ></path>
    </svg>
  );
}

const ScrollToTopButton = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="rounded-full p-buttonSpacingY bg-cardColor text-secondary animate-bounce">
        <MdiArrowCollapseUp />
      </div>
    </div>
  );
};

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="rounded-full p-buttonSpacingY bg-cardColor text-secondary animate-spin">
        <MdiLoading />
      </div>
    </div>
  );
};

export { ScrollToTopButton, LoadingSpinner };
