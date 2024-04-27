import Person from "./Person";

const Persons = ({ peopleToShow, handleDelete }) => {
  return (
    <ul>
      {peopleToShow.map((person) => {
        return (
          <Person
            key={person.name}
            person={person}
            handleDelete={() => handleDelete(person.id)}
          />
        );
      })}
    </ul>
  );
};

export default Persons;
