import React from "react";

const FilterPerson = ({filterName, handleFilterInput}) =>  <div>filter shown with: <input value={filterName} onChange={handleFilterInput} /></div>

export default FilterPerson