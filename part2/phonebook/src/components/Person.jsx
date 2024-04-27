const Person = ({ person, handleDelete }) => {
  return (
    <li key={person.name}>
      {person.name} {person.number}
      <button onClick={handleDelete}>delete</button>
    </li>
  );
};

export default Person;
