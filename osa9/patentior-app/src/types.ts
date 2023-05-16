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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}


export interface PatientsEntry {
    id: string
        name: string,
        dateOfBirth: string,
        ssn: string,
        gender: Gender,
        occupation: string,
        entries: Entry[]
}

export type NoNSensitivePatientsEntry = Omit<PatientsEntry, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<PatientsEntry, 'id'>;