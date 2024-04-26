import { useState, useEffect } from "react";
import Countries from "./components/Countries";
import countryService from "./services/countries.js";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    countryService.getAllCountries().then((res) => {
      setCountries(res);
      // console.log(res);
    });
  }, []);

  const handleCountryChange = (event) => {
    // console.log(event.target.value);
    setSearchVal(event.target.value);
  };

  const handleShowCountry = (country) => {
    setSearchVal(country.name.common);
  };

  return (
    <div>
      find countries
      <input value={searchVal} onChange={handleCountryChange} />
      {/* {console.log(countries)} */}
      <Countries
        countries={countries}
        searchVal={searchVal}
        handleShowCountry={handleShowCountry}
      />
    </div>
  );
};

export default App;
