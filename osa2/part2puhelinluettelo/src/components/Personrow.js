import React from 'react';

const Person = ({ person, deletePersonFromPhonebook }) => (
  //console.log(person)

  <li>
    {person.name} {person.number}
    <button onClick={() => deletePersonFromPhonebook(person.id)}>Delete</button>
  </li>
)

export default Person;