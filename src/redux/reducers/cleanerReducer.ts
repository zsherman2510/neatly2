import { UPDATE_CLEANER_DETAILS } from "../actions";

const initialCleanerState = {
    username: null,
    password: null, // Just a note: Never store actual passwords in the frontend state, even if it's hashed.
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    cleaningExperience: null,
    cleaningSpecialty: null,
    daysAvailable: null,
    hourlyRate: null,
    loading: false,
    error: null
  };
  

export const cleanerReducer = (state = initialCleanerState, action: any) => {
  switch(action.type) {
      case UPDATE_CLEANER_DETAILS:
          return {
              ...state,
              personalDetails: action.payload
          };
      case "UPDATE_CLEANING_DETAILS":
          return {
              ...state,
              cleaningDetails: action.payload
          };
      // ... similarly handle other cleaner-specific actions
      case "UPDATE_CLEANING_AVAILABILITY":
          return {
            ...state,
            availability: action.payload
          }
      case "UPDATE_CLEANING_DOCUMENTS":
          return {
            ...state,
            documents: action.payload
          }
      case "UPDATE_CLEANING_ACCOUNT":
          return {
            ...state,
            account: action.payload
          }
      case "REGISTER_CLEANER_REQUEST":
          return {
              ...state,
              loading: true
          };
      case "REGISTER_CLEANER_SUCCESS":
          return {
              ...state,
              loading: false,
              cleaner: action.payload,
              error: null
          };
      case "REGISTER_CLEANER_FAILURE":
          return {
              ...state,
              loading: false,
              error: action.payload
          };
      default:
          return state;
  }
}
export default cleanerReducer