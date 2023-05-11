import patientsEntries from '../../data/patients';
import { NoNSensitivePatientsEntry, PatientsEntry } from '../types';


const getEntries = (): PatientsEntry[] => {
    //console.log(dianoseEntries);
  return patientsEntries;
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

export default {
    getEntries,
    getNonSensitiveEntries
};
