/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientsEntries from '../../data/patients';
import { Entry, EntryWithoutId, NewPatientEntry, NoNSensitivePatientsEntry, PatientsEntry } from '../types';
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
  
  const addNewEntry = (entry: EntryWithoutId, patientId: string
    ): Entry => {
      const entryId = uuid();

      const newEntry = {
        id: entryId,
        ...entry
      };
  
      patientsEntries.find(p => p.id === patientId)?.entries.push(newEntry);
      return newEntry;
  
  };


export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    addNewEntry,
    findById
};
