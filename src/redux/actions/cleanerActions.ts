import { UPDATE_CLEANER_DETAILS } from ".";
import { PersonalDetails } from "../../types/cleaner";

export const updateCleanerDetails = (userData: PersonalDetails) => ({
  type: UPDATE_CLEANER_DETAILS,
  payload: userData
});