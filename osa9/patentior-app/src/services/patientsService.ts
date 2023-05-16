/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientsEntries from '../../data/patients';
import { NewPatientEntry, NoNSensitivePatientsEntry, PatientsEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): PatientsEntry[] => {
    //console.log(dianoseEntries);
  return patientsEntries;
};

const findById = (id: string): PatientsEntry | undefined=> {
  const entry = patientsEntries.find(d => d.id === id);
  return entry;
};

const getNonSensitiveEntries = (): NoNSensitivePatientsEntry[] => {
    return patientsEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
  };

  const addPatient = (entry: NewPatientEntry
    ): PatientsEntry => {
      const id = uuid();

      const newPatientEntry = {
        id: id,
        ...entry
      };
  
      patientsEntries.push(newPatientEntry);
      return newPatientEntry;
  
  };


export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    findById
};
