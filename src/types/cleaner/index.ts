export type PersonalDetails = {
  // Define the structure of your personal details here, e.g.
  firstname: string;
  lastname: string;
  gender: "male" | "female";
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  // ... other personal details
};

export type CleaningDetails = {
  // Define the structure of your cleaning details here, e.g.
  servicesProvided: string[];
  experience: number;
  // ... other cleaning details
};

export type CleanerPayload = {
  // Define the structure of a cleaner object, e.g.
  id: string;
  personalDetails: PersonalDetails;
  cleaningDetails: CleaningDetails;
  // ... other cleaner attributes
};

export type ErrorPayload = {
  message: string;
};

