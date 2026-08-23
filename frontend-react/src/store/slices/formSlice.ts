import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import API from "../../api/api";

export interface WizardState {
  currentStep: number;

  formData: {
    fullName: string;
    dob: string;

    gender: "male" | "female" | "others" | "";

    occupation: string;

    maritalStatus:
      | "single"
      | "married"
      | "engaged"
      | "divorced"
      | "widowed"
      | "prefer_not_to_say"
      | "";

    ownedPetsBefore: "yes" | "no" | "";

    currentPetSpecies: string;
    currentPetBreed: string;
    currentPetAge: string;

    adoptionReason: string;

    phone: string;
    email: string;
    step2Password: string;

    address: string;

    residenceType: "apartment" | "independent_house" | "others" | "";

    createPassword: string;
    confirmPassword: string;
  };

  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: WizardState = {
  currentStep: 1,

  formData: {
    fullName: "",
    dob: "",
    gender: "",
    occupation: "",
    maritalStatus: "",

    ownedPetsBefore: "",

    currentPetSpecies: "",
    currentPetBreed: "",
    currentPetAge: "",

    adoptionReason: "",

    phone: "",
    email: "",
    step2Password: "",

    address: "",

    // No default residence selected
    residenceType: "",

    createPassword: "",
    confirmPassword: "",
  },

  loading: false,
  error: null,
  success: false,
};

/* =====================================================
   API REQUEST
===================================================== */

export const submitWizard = createAsyncThunk(
  "wizard/submitWizard",

  async (formData: WizardState["formData"], { rejectWithValue }) => {
    try {
      const response = await API.post("/api/adoption", formData);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit application",
      );
    }
  },
);

/* =====================================================
   SLICE
===================================================== */

const wizardSlice = createSlice({
  name: "wizard",

  initialState,

  reducers: {
    saveStepData: (
      state,
      action: PayloadAction<Partial<WizardState["formData"]>>,
    ) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },

    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },

    nextStep: (state) => {
      state.currentStep = Math.min(3, state.currentStep + 1);
    },

    prevStep: (state) => {
      state.currentStep = Math.max(1, state.currentStep - 1);
    },

    resetWizard: () => initialState,
  },

  /* =====================================================
     API STATES
  ===================================================== */

  extraReducers: (builder) => {
    builder

      // API REQUEST START
      .addCase(submitWizard.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      // API REQUEST SUCCESS
      .addCase(submitWizard.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })

      // API REQUEST ERROR
      .addCase(submitWizard.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.error =
          (action.payload as string) || "Failed to submit application";
      });
  },
});

export const { saveStepData, setStep, nextStep, prevStep, resetWizard } =
  wizardSlice.actions;

export default wizardSlice.reducer;
