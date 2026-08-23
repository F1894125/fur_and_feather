// src/data/adoptersData.ts

export type AdoptionStatus = "Active" | "Pending" | "Completed";

export type ApprovalStatus = "Approved" | "Pending" | "Rejected";

export interface Adopter {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;

  applications: number;

  adoptionStatus: AdoptionStatus;
  approval: ApprovalStatus;

  lastActive: string;

  // Details
  profileImage: string;
  dateOfBirth: string;
  gender: "Male" | "Female" | "Others";
  occupation: string;
  maritalStatus: string;

  ownedPetsBefore: "Yes" | "No";
  currentPet: string;
  currentPets: string;

  address: string;
  residenceType: string;

  livingWithFamily: "Yes" | "No";
  householdSupport: "Yes" | "No";
  financiallyPrepared: "Yes" | "No";

  hoursAlone: string;
  caretakerDuringTravel: string;

  adoptionReason: string;

  governmentIdVerified: boolean;
  addressProofVerified: boolean;

  adoptionCount: number;
  applicationCount: number;
  acceptedCount: number;
  rejectedCount: number;
  wishlistCount: number;
}

export const adoptersData: Adopter[] = [
  {
    id: "ADO-001",
    name: "Emily Chan",
    email: "emily.c@email.com",
    phone: "+0028069728",
    location: "Kolkata, India",

    applications: 2,

    adoptionStatus: "Active",
    approval: "Approved",
    lastActive: "Today",

    profileImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",

    dateOfBirth: "07/08/1993",
    gender: "Female",

    occupation: "Government Service",

    maritalStatus: "Single",

    ownedPetsBefore: "No",
    currentPet: "No",
    currentPets: "No",

    address:
      "Emily Chan\n45, Rafi Ahmed Kidwai Road, Taltala,\nKolkata, West Bengal 700016\nIndia",

    residenceType: "Independent house",

    livingWithFamily: "Yes",
    householdSupport: "Yes",
    financiallyPrepared: "Yes",

    hoursAlone: "8 Hours",

    caretakerDuringTravel: "Parents",

    adoptionReason:
      "I want to adopt a pet to provide a loving, safe, and permanent home. I'm committed to caring for their physical and emotional well-being and giving them the love and attention they deserve.",

    governmentIdVerified: true,
    addressProofVerified: true,

    adoptionCount: 0,
    applicationCount: 2,
    acceptedCount: 1,
    rejectedCount: 0,
    wishlistCount: 3,
  },

  {
    id: "ADO-002",
    name: "Michale Chen",
    email: "michale.c@email.com",
    phone: "+0028069718",
    location: "Darjeeling, India",

    applications: 1,

    adoptionStatus: "Active",
    approval: "Approved",
    lastActive: "Yesterday",

    profileImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",

    dateOfBirth: "12/04/1991",
    gender: "Male",

    occupation: "Software Engineer",
    maritalStatus: "Married",

    ownedPetsBefore: "Yes",
    currentPet: "Dog",
    currentPets: "1",

    address: "Darjeeling, West Bengal, India",

    residenceType: "Independent house",

    livingWithFamily: "Yes",
    householdSupport: "Yes",
    financiallyPrepared: "Yes",

    hoursAlone: "5 Hours",

    caretakerDuringTravel: "Spouse",

    adoptionReason: "I would like to provide a safe and loving home to a pet.",

    governmentIdVerified: true,
    addressProofVerified: true,

    adoptionCount: 1,
    applicationCount: 1,
    acceptedCount: 1,
    rejectedCount: 0,
    wishlistCount: 2,
  },

  {
    id: "ADO-003",
    name: "Jessica Brown",
    email: "jessica.b@email.com",
    phone: "+0028067728",
    location: "Nadia, India",

    applications: 3,

    adoptionStatus: "Pending",
    approval: "Pending",
    lastActive: "2 days ago",

    profileImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",

    dateOfBirth: "21/11/1995",
    gender: "Female",

    occupation: "Teacher",
    maritalStatus: "Single",

    ownedPetsBefore: "No",
    currentPet: "No",
    currentPets: "No",

    address: "Nadia, West Bengal, India",

    residenceType: "Apartment",

    livingWithFamily: "Yes",
    householdSupport: "Yes",
    financiallyPrepared: "Yes",

    hoursAlone: "6 Hours",

    caretakerDuringTravel: "Parents",

    adoptionReason:
      "I have always loved animals and would like to adopt a companion.",

    governmentIdVerified: true,
    addressProofVerified: false,

    adoptionCount: 0,
    applicationCount: 3,
    acceptedCount: 0,
    rejectedCount: 0,
    wishlistCount: 4,
  },

  {
    id: "ADO-004",
    name: "David Brown",
    email: "david.b@email.com",
    phone: "+0128069728",
    location: "Kolkata, India",

    applications: 1,

    adoptionStatus: "Completed",
    approval: "Approved",
    lastActive: "5 days ago",

    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",

    dateOfBirth: "18/02/1988",
    gender: "Male",

    occupation: "Business Owner",
    maritalStatus: "Married",

    ownedPetsBefore: "Yes",
    currentPet: "Dog",
    currentPets: "1",

    address: "Kolkata, West Bengal, India",

    residenceType: "Independent house",

    livingWithFamily: "Yes",
    householdSupport: "Yes",
    financiallyPrepared: "Yes",

    hoursAlone: "4 Hours",

    caretakerDuringTravel: "Spouse",

    adoptionReason: "Looking for a companion for my family.",

    governmentIdVerified: true,
    addressProofVerified: true,

    adoptionCount: 1,
    applicationCount: 1,
    acceptedCount: 1,
    rejectedCount: 0,
    wishlistCount: 1,
  },

  {
    id: "ADO-005",
    name: "Emily Thompson",
    email: "emily.t@email.com",
    phone: "+0028059728",
    location: "Kolkata, India",

    applications: 2,

    adoptionStatus: "Active",
    approval: "Approved",
    lastActive: "Today",

    profileImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",

    dateOfBirth: "03/06/1994",
    gender: "Female",

    occupation: "Designer",
    maritalStatus: "Single",

    ownedPetsBefore: "Yes",
    currentPet: "Cat",
    currentPets: "1",

    address: "Kolkata, West Bengal, India",

    residenceType: "Apartment",

    livingWithFamily: "No",
    householdSupport: "Yes",
    financiallyPrepared: "Yes",

    hoursAlone: "7 Hours",

    caretakerDuringTravel: "Friend",

    adoptionReason: "I want to give another pet a loving home.",

    governmentIdVerified: true,
    addressProofVerified: true,

    adoptionCount: 0,
    applicationCount: 2,
    acceptedCount: 1,
    rejectedCount: 0,
    wishlistCount: 3,
  },
];
