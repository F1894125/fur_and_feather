// src/store/slices/petSlice.ts

import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import api from "../../api/api";

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  gender: string;
  weight: string;
  intakeDate: string;

  status: "Pending" | "Adopted" | "Rejected" | "Available";

  image: string;
}

interface PetState {
  pets: Pet[];

  selectedPet: Pet | null;

  editDialogOpen: boolean;

  activeFilter: string;

  searchQuery: string;

  loading: boolean;

  error: string | null;

  updateLoading: boolean;

  updateError: string | null;

  updateSuccess: boolean;
}

const initialState: PetState = {
  pets: [],

  selectedPet: null,

  editDialogOpen: false,

  activeFilter: "All Pets",

  searchQuery: "",

  loading: false,

  error: null,

  updateLoading: false,

  updateError: null,

  updateSuccess: false,
};

/* =========================================
   UPDATE PET
========================================= */

export const updatePet = createAsyncThunk(
  "pet/updatePet",

  async (
    {
      petId,
      data,
    }: {
      petId: string;
      data: Partial<Pet>;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.put(`/api/pets/${petId}`, data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update pet",
      );
    }
  },
);

/* =========================================
   DELETE PET
========================================= */

export const deletePet = createAsyncThunk(
  "pet/deletePet",

  async (petId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/api/pets/${petId}`);

      return petId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete pet",
      );
    }
  },
);

/* =========================================
   SLICE
========================================= */

const petSlice = createSlice({
  name: "pet",

  initialState,

  reducers: {
    /* OPEN EDIT */

    openPetEditDialog: (state, action: PayloadAction<Pet>) => {
      state.selectedPet = action.payload;

      state.editDialogOpen = true;

      state.updateError = null;

      state.updateSuccess = false;
    },

    /* CLOSE EDIT */

    closePetEditDialog: (state) => {
      state.selectedPet = null;

      state.editDialogOpen = false;

      state.updateError = null;

      state.updateSuccess = false;
    },

    /* SEARCH */

    setPetSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    /* FILTER */

    setPetActiveFilter: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      /* =====================================
         UPDATE PENDING
      ===================================== */

      .addCase(updatePet.pending, (state) => {
        state.updateLoading = true;

        state.updateError = null;

        state.updateSuccess = false;
      })

      /* =====================================
         UPDATE SUCCESS
      ===================================== */

      .addCase(updatePet.fulfilled, (state, action) => {
        state.updateLoading = false;

        state.updateSuccess = true;

        state.updateError = null;

        state.selectedPet = action.payload;

        const index = state.pets.findIndex(
          (pet) => pet.id === action.payload.id,
        );

        if (index !== -1) {
          state.pets[index] = action.payload;
        }

        /*
         * Close dialog after update
         */

        state.editDialogOpen = false;

        state.selectedPet = null;
      })

      /* =====================================
         UPDATE ERROR
      ===================================== */

      .addCase(updatePet.rejected, (state, action) => {
        state.updateLoading = false;

        state.updateSuccess = false;

        state.updateError =
          (action.payload as string) || "Failed to update pet";
      })

      /* =====================================
         DELETE SUCCESS
      ===================================== */

      .addCase(deletePet.fulfilled, (state, action) => {
        state.pets = state.pets.filter((pet) => pet.id !== action.payload);
      });
  },
});

export const {
  openPetEditDialog,
  closePetEditDialog,
  setPetSearchQuery,
  setPetActiveFilter,
} = petSlice.actions;

export default petSlice.reducer;
