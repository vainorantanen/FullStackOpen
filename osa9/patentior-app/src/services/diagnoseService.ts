import dianoseEntries from '../../data/diagnoses';
import { DianoseEntry } from '../types';


const getEntries = (): DianoseEntry[] => {
    //console.log(dianoseEntries);
  return dianoseEntries;
};

export default {
    getEntries
};
