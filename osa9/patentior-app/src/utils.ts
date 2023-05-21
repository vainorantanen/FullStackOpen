import { DianoseEntry, EntryWithoutId, Gender, NewPatientEntry,
 BaseEntryWihtoutId, 
 Discharge,
 SickLeave,
 HealthCheckRating} from './types';

import diagnoseService from './services/diagnoseService';


const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
  
    return name;
  };
  

  const isString = (text: unknown): text is string => {
    return typeof text === 'string';
   };

   const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
  const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

  const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing ssn');
    }
  
    return ssn;
  };

  const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
    }
  
    return gender;
  };

  const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
  };

  const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation');
    }
  
    return occupation;
  };

  function checkItemsExistInArray(array1: unknown, array2: string[]): boolean {
    console.log("1 ", array1);
    console.log("2 ", array2);
    if (!Array.isArray(array1)) {
      return false;
    }
  
    for (const item of array1) {
      if (typeof item !== 'string' || !array2.includes(item)) {
        return false;
      }
    }
  
    return true;
  }

  const parseDiagnosisCodes = (object: unknown): Array<DianoseEntry['code']> =>  {
    // haetaan olemassa olevat diagnosikoodit
    const codes = diagnoseService.getEntries().map(a => {
      return a.code;
    });
    console.log("Olemassa olevat: ", codes);
    console.log("obj: ", object);
    if (!object || typeof object !== 'object' || !checkItemsExistInArray(object, codes)) {
      // we will just trust the data to be in correct form
      //return [] as Array<DianoseEntry['code']>;
      throw new Error('Incorrect or missing diagnosis codes');
    }
  
    return object as Array<DianoseEntry['code']>;
  };

  const parseDischarge = (object: unknown): Discharge => {
    if (!object || typeof object !== 'object' || !('date' in object) ||
    !('criteria' in object)) {
      return {} as Discharge;
    }
  
    return object as Discharge;
  };

  const parseSickLeave = (object: unknown): SickLeave => {
    if (!object ||  typeof object !== 'object' || !('startDate' in object)
    || !('endDate' in object)) {
      return {} as SickLeave;
    }

    return object as SickLeave;
  };

  const parseHealthCheckRating = (object: unknown): HealthCheckRating => {
    console.log(object);
    if (!object || typeof object !== "number" || object < 0 || object > 3) {
      throw new Error('Incorrect or missing healthrating');
    }

    return object;
  };

  export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if ( !object || typeof object !== 'object' ) {
      throw new Error('Incorrect or missing data');
    }
  
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object 
    && 'gender' in object && 'occupation' in object)  {
      const newEntry: NewPatientEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: []
      };
    
      return newEntry;
    }
  
    throw new Error('Incorrect data: some fields are missing');
  };
 
  export const toNewEntryAdd = (object: unknown): EntryWithoutId => {
    if (!object || typeof object !== 'object') {
      throw new Error('Incorrect or missing data');
    }
  
    if (
      'description' in object &&
      'date' in object &&
      'specialist' in object &&
      'type' in object
    ) {
      const baseEntry: BaseEntryWihtoutId = {
        description: parseName(object.description),
        date: parseDate(object.date),
        specialist: parseName(object.specialist),
      };
  
      if ('diagnosisCodes' in object) {
        baseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
      }
  
      let entry: EntryWithoutId;
  
      switch (object.type) {
        case 'Hospital':
          if ('discharge' in object) {
            entry = {
              ...baseEntry,
              type: 'Hospital',
              discharge: parseDischarge(object.discharge),
            };
          } else {
            throw new Error('Incorrect data: discharge field is missing for Hospital entry');
          }
          break;
  
        case 'OccupationalHealthcare':
          if ('employerName' in object) {
            entry = {
              ...baseEntry,
              type: 'OccupationalHealthcare',
              employerName: parseName(object.employerName),
            };
  
            if ('sickLeave' in object) {
              entry.sickLeave = parseSickLeave(object.sickLeave);
            }
          } else {
            throw new Error('Incorrect data: employerName field is missing for OccupationalHealthcare entry');
          }
          break;
  
        case 'HealthCheck':
          if ('healthCheckRating' in object) {
            entry = {
              ...baseEntry,
              type: 'HealthCheck',
              healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
            };
          } else {
            throw new Error('Incorrect data: healthCheckRating field is missing for HealthCheck entry');
          }
          break;
  
        default:
          throw new Error('Incorrect data: unknown entry type');
      }
  
      return entry;
    }
  
    throw new Error('Incorrect data: some fields are missing');
  };
  