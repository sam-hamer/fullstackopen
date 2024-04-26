const CountryInfo = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <h3>Languages:</h3>
      <ul>
        {Object.entries(country.languages).map((language) => {
          return <li key={language[0]}>{language[1]}</li>;
        })}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </>
  );
};

export default CountryInfo;
