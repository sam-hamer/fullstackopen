const Country = ({ country, handleShowCountry }) => {
  return (
    <li>
      {country.name.common}
      <button onClick={() => handleShowCountry(country)}>show</button>
    </li>
  );
};

export default Country;
