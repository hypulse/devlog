import { BxArrowToTop, LineMdLoadingLoop } from "./icons";

const Loader = ({
  loader,
  loading,
  items,
  lastIndex,
}: {
  loader: React.RefObject<HTMLDivElement>;
  loading: boolean;
  items: any[];
  lastIndex: number;
}) => {
  return (
    <div ref={loader}>
      {!loading && items.length >= lastIndex ? (
        <ScrollToTopButton />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="flex items-center justify-center">
      <button
        className="rounded-full p-tagPaddingY bg-borderColor animate-bounce"
        onClick={scrollToTop}
      >
        <BxArrowToTop className="text-primary text-extra" />
      </button>
    </div>
  );
};

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="rounded-full p-tagPaddingY bg-borderColor">
        <LineMdLoadingLoop className="text-primary text-extra" />
      </div>
    </div>
  );
};

export default Loader;
