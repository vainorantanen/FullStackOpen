export interface DianoseEntry {
    code: string,
    name: string,
    latin?: string
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface PatientsEntry {
    id: string
        name: string,
        dateOfBirth: string,
        ssn: string,
        gender: Gender,
        occupation: string
}

export type NoNSensitivePatientsEntry = Omit<PatientsEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientsEntry, 'id'>;