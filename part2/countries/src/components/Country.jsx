const Country = ({ country, handleShowCountry }) => {
  //   console.log(country);
  return (
    <li>
      {country.name.common}
      <button onClick={() => handleShowCountry(country)}>show</button>
    </li>
  );
};

export default Country;
