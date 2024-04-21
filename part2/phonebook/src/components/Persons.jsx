import React from "react";
import Person from "./Person";

const Persons = ({ peopleToShow }) => {
  return (
    <ul>
      {peopleToShow.map((person) => {
        return <Person key={person.name} person={person} />;
      })}
    </ul>
  );
};

export default Persons;
