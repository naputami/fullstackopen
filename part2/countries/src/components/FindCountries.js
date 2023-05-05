import React from "react";

const FindCountries = ({keyword, handleFindCountries}) =>  <div>filter shown with: <input value={keyword} onChange={handleFindCountries} /></div>

export default FindCountries