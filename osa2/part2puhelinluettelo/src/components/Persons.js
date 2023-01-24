import React from 'react';
import Person from './Personrow';

const Persons = ({ persons, deletePersonFromPhonebook }) => {
  return (
    <div>
      <ul>
        {persons
          .map(person => 
            <Person
              key={person.id}
              person={person}
              deletePersonFromPhonebook={deletePersonFromPhonebook}
            />
        )}
      </ul>
    </div>
  )
}

export default Persons;