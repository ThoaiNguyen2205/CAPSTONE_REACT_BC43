import React from "react";
import ModalSearch from "../pages/Modals/ModalSearch";
import Search from "../pages/Search/Search";

const SearchModal = new ModalSearch(Search);
export default function HOC() {
  return (
    <div className="container">
      <SearchModal component={Search} />
    </div>
  );
}
