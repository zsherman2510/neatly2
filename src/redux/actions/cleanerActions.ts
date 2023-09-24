import { UPDATE_CLEANER_PERSONAL_DATA, UPDATE_CLEANER_DETAILS } from ".";
import { PersonalDetails, CleaningDetails } from "../../types/cleaner";

export const updateCleanerPersonalData = (userData: PersonalDetails) => ({
  type: UPDATE_CLEANER_PERSONAL_DATA,
  payload: userData
});

export const updateCleanerSpeciality = (userData: CleaningDetails) => ({
  type: UPDATE_CLEANER_DETAILS,
  payload: userData
});