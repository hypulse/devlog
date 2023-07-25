import { LoadingSpinner, ScrollToTopButton } from "./layouts";

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

export default Loader;
