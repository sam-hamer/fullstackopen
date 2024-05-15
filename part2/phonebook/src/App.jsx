import Filter from "./components/Filter";
import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons.js";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState({
    message: null,
    type: null,
  });

  useEffect(() => {
    personService.getAll().then((res) => {
      setPersons(res);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const person = persons.find((person) => person.name === newName);
    const changedPerson = { ...person, number: newNumber };
    if (person) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(person.id, changedPerson)
          .then((res) => {
            setPersons(persons.map((p) => (p.id === res.id ? res : p)));
            setNotificationMessage({
              message: `Updated ${res.name}'s number`,
              type: "success",
            });
            setTimeout(() => {
              setNotificationMessage({ message: null, type: null });
            }, 3000);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setNotificationMessage({
              message: `Information of ${person.name} has already been removed from the server`,
              type: "error",
            });
            setTimeout(() => {
              setNotificationMessage({ message: null, type: null });
            }, 3000);
            setPersons(persons.filter((n) => n.id !== person.id));
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(newPerson)
        .then((res) => {
          setPersons(persons.concat(res));
          setNotificationMessage({
            message: `Added ${res.name}`,
            type: "success",
          });
          setTimeout(() => {
            setNotificationMessage({ message: null, type: null });
          }, 3000);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setNotificationMessage({
            message: error.response.data.error,
            type: "error",
          });
          setTimeout(() => {
            setNotificationMessage({ message: null, type: null });
          }, 3000);
        });
    }
  };

  const handleDelete = (id) => {
    const person = persons.find((n) => n.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((n) => n.id !== id));
        })
        .catch((error) => {
          setNotificationMessage({
            message: `Information of ${person.name} has already been removed from the server`,
            type: "error",
          });
          setTimeout(() => {
            setNotificationMessage({ message: null, type: null });
          }, 3000);
          setPersons(persons.filter((n) => n.id !== id));
        });
    }
  };

  const peopleToShow =
    filter === ""
      ? persons
      : persons.filter(
          (person) =>
            person.name.toLowerCase().search(filter.toLocaleLowerCase()) !== -1
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage.message}
        type={notificationMessage.type}
      />
      <Filter filter={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons peopleToShow={peopleToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
