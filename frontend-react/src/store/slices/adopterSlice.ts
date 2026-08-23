import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import api from "../../api/api";

export interface Adopter {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;

  applications: number;

  adoptionStatus: "Active" | "Pending" | "Completed";

  approval: "Approved" | "Pending" | "Rejected";

  lastActive: string;

  profileImage: string;

  dateOfBirth: string;

  gender: "Male" | "Female" | "Others";

  occupation: string;

  maritalStatus:
    | "Single"
    | "Married"
    | "Engaged"
    | "Divorced"
    | "Widowed"
    | "Prefer not to say";

  ownedPetsBefore: "Yes" | "No";

  currentPet: string;

  currentPets: string;

  phoneNumber?: string;

  address: string;

  residenceType: "Apartment" | "Independent house" | "Others";

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
interface AdopterState {
  adopters: Adopter[];

  selectedAdopter: Adopter | null;

  editDialogOpen: boolean;

  activeFilter: string;

  searchQuery: string;

  loading: boolean;

  error: string | null;

  updateLoading: boolean;

  updateError: string | null;

  updateSuccess: boolean;
}

const initialState: AdopterState = {
  adopters: [],

  selectedAdopter: null,

  editDialogOpen: false,

  activeFilter: "All Adopters",

  searchQuery: "",

  loading: false,

  error: null,

  updateLoading: false,

  updateError: null,

  updateSuccess: false,
};

/* =========================================
   UPDATE ADOPTER API
========================================= */

export const updateAdopter = createAsyncThunk(
  "adopter/updateAdopter",

  async (
    {
      adopterId,
      data,
    }: {
      adopterId: string;
      data: Partial<Adopter>;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.put(`/api/adopters/${adopterId}`, data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update adopter",
      );
    }
  },
);

/* =========================================
   SLICE
========================================= */

const adopterSlice = createSlice({
  name: "adopter",

  initialState,

  reducers: {
    /* OPEN EDIT DIALOG */

    openEditDialog: (state, action: PayloadAction<Adopter>) => {
      state.selectedAdopter = action.payload;

      state.editDialogOpen = true;

      state.updateError = null;

      state.updateSuccess = false;
    },

    /* CLOSE EDIT DIALOG */

    closeEditDialog: (state) => {
      state.editDialogOpen = false;

      state.selectedAdopter = null;

      state.updateError = null;

      state.updateSuccess = false;
    },

    setActiveFilter: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload;
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      /* =====================================
         UPDATE PENDING
      ===================================== */

      .addCase(updateAdopter.pending, (state) => {
        state.updateLoading = true;

        state.updateError = null;

        state.updateSuccess = false;
      })

      /* =====================================
         UPDATE SUCCESS
      ===================================== */

      .addCase(updateAdopter.fulfilled, (state, action) => {
        state.updateLoading = false;

        state.updateSuccess = true;

        state.updateError = null;

        /*
         * Update selected adopter
         */

        state.selectedAdopter = action.payload;

        /*
         * Update adopter in list
         */

        const index = state.adopters.findIndex(
          (adopter) => adopter.id === action.payload.id,
        );

        if (index !== -1) {
          state.adopters[index] = action.payload;
        }

        /*
         * Close dialog automatically
         */

        state.editDialogOpen = false;
      })

      /* =====================================
         UPDATE ERROR
      ===================================== */

      .addCase(updateAdopter.rejected, (state, action) => {
        state.updateLoading = false;

        state.updateSuccess = false;

        state.updateError =
          (action.payload as string) || "Failed to update adopter";
      });
  },
});

export const {
  openEditDialog,
  closeEditDialog,
  setActiveFilter,
  setSearchQuery,
} = adopterSlice.actions;

export default adopterSlice.reducer;
