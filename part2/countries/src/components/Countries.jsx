import Country from "./Country";
import CountryInfo from "./CountryInfo";

const Countries = ({ countries, searchVal, handleShowCountry }) => {
  const countryNames = countries.filter(
    (country) =>
      country.name.common.toLowerCase().search(searchVal.toLowerCase()) !== -1
  );
  console.log(countryNames);
  if (countryNames.length === 1) {
    return <CountryInfo country={countryNames[0]} />;
  }
  if (countryNames.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  return (
    <ul>
      {countryNames.map((country) => {
        return (
          <Country
            key={country.name.common}
            country={country}
            handleShowCountry={handleShowCountry}
          />
        );
      })}
    </ul>
  );
};

export default Countries;
