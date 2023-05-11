export interface DianoseEntry {
    code: string,
    name: string,
    latin?: string
}

export interface PatientsEntry {
    id: string
        name: string,
        dateOfBirth: string,
        ssn: string,
        gender: string,
        occupation: string
}

export type NoNSensitivePatientsEntry = Omit<PatientsEntry, 'ssn'>;