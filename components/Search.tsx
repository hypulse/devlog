import { HideOnTablet, SearchBox } from "./layouts";

const Search = () => {
  return (
    <HideOnTablet>
      <div className="text-extra">
        <SearchBox />
      </div>
    </HideOnTablet>
  );
};

export default Search;
