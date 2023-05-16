/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatientEntry, toNewEntryAdd } from '../utils';
//import toNewEntryAdd from '../utils';


const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientsService.findById(req.params.id);
  
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    console.log("TÄSÄ", req.body);
    
    const entry = toNewEntryAdd(req.body);
    const patient = patientsService.findById(req.params.id);
    
    console.log("entry patientissa: ", entry);
     
    if (!patient) {
      res.status(404).json({ error: 'Patient not found' });
    } else {
      const patientId = patient.id;
      const addedEntryToPatient = patientsService.addNewEntry(entry, patientId);
      res.json(addedEntryToPatient);
    }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;