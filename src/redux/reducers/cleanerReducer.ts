import { UPDATE_CLEANER_PERSONAL_DATA } from "../actions";

const initialCleanerState = {
  personalDetails: {
    username: null,
    password: null, // Note: Never store actual passwords in the frontend state.
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    dateOfBirth: null,
  },
  cleaningDetails: {
    cleaningExperience: null,
    cleaningSpecialty: null,
    daysAvailable: null,
    hourlyRate: null,
  },
  documents: null,
  account: null,
  loading: false,
  error: null,
};

export const cleanerReducer = (state = initialCleanerState, action: any) => {
  switch (action.type) {
    case UPDATE_CLEANER_PERSONAL_DATA:
      return {
        ...state,
        personalDetails: {
          ...state.personalDetails,
          ...action.payload,
        },
      };
    case "UPDATE_CLEANING_DETAILS":
      return {
        ...state,
        cleaningDetails: {
          ...state.cleaningDetails,
          ...action.payload,
        },
      };
    case "UPDATE_CLEANER_DOCUMENTS": 
      return {
        ...state,
        documents: action.payload
      }
    case "REGISTER_CLEANER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "REGISTER_CLEANER_SUCCESS":
      return {
        ...state,
        loading: false,
        cleaner: action.payload,
        error: null,
      };
    case "REGISTER_CLEANER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default cleanerReducer;
