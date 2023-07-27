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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return <div className="flex items-center justify-center"></div>;
};

const LoadingSpinner = () => {
  return <div className="flex items-center justify-center"></div>;
};

export default Loader;
