import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

import { apiBaseUrl } from "../constants";

export const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(
    `${apiBaseUrl}/diaries`
  );

  return data;
};

export const create = async (object: NewDiaryEntry) => {
  const { data } = await axios.post<DiaryEntry>(
    `${apiBaseUrl}/diaries`,
    object
  );

  return data;
  
};