import React, { useEffect } from "react";

import { useForm, type SubmitHandler } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { X, Save } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../hooks/useRedux";

import { closePetEditDialog, updatePet } from "../store/slices/PetSlice";

import {
  petSchema,
  type PetFormValues,
} from "../services/validation/petSchema";

export default function EditPetDialog() {
  const dispatch = useAppDispatch();

  const { selectedPet, updateLoading, updateError } = useAppSelector(
    (state) => state.pet,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PetFormValues>({
    resolver: yupResolver(petSchema),

    defaultValues: {
      name: "",
      species: "",
      breed: "",
      age: "",
      gender: "",
      weight: "",
      intakeDate: "",
      status: "Available",
    },
  });

  /*
   * Populate form from Redux
   */

  useEffect(() => {
    if (!selectedPet) {
      return;
    }

    reset({
      name: selectedPet.name,

      species: selectedPet.species,

      breed: selectedPet.breed,

      age: selectedPet.age,

      gender: selectedPet.gender,

      weight: selectedPet.weight,

      intakeDate: selectedPet.intakeDate,

      status: selectedPet.status,
    });
  }, [selectedPet, reset]);

  /*
   * Submit
   */

  const onSubmit: SubmitHandler<PetFormValues> = async (data) => {
    if (!selectedPet) {
      return;
    }

    dispatch(
      updatePet({
        petId: selectedPet.id,
        data,
      }),
    );
  };

  if (!selectedPet) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/50
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-2xl
          max-h-[90vh]
          bg-[#ece6de]
          rounded-3xl
          shadow-2xl
          overflow-hidden
          flex
          flex-col
        "
      >
        {/* HEADER */}

        <div
          className="
            bg-[#0b252b]
            text-white
            px-6
            py-5
            flex
            items-center
            justify-between
            shrink-0
          "
        >
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Edit Pet</h2>

            <p className="text-xs text-slate-300 mt-1">
              {selectedPet.name} • {selectedPet.id}
            </p>
          </div>

          <button
            type="button"
            onClick={() => dispatch(closePetEditDialog())}
            className="
              w-9
              h-9
              rounded-full
              flex
              items-center
              justify-center
              bg-white/10
              hover:bg-white/20
              transition
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            overflow-y-auto
            p-5
            sm:p-7
          "
        >
          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
          >
            {/* NAME */}

            <FormInput
              label="Pet Name"
              error={errors.name?.message}
              {...register("name")}
            />

            {/* SPECIES */}

            <FormSelect
              label="Species"
              error={errors.species?.message}
              {...register("species")}
            >
              <option value="">Select species</option>

              <option value="Dog">Dog</option>

              <option value="Cat">Cat</option>

              <option value="Rabbit">Rabbit</option>

              <option value="Others">Others</option>
            </FormSelect>

            {/* BREED */}

            <FormInput
              label="Breed"
              error={errors.breed?.message}
              {...register("breed")}
            />

            {/* AGE */}

            <FormInput
              label="Age"
              error={errors.age?.message}
              {...register("age")}
            />

            {/* GENDER */}

            <FormSelect
              label="Gender"
              error={errors.gender?.message}
              {...register("gender")}
            >
              <option value="">Select gender</option>

              <option value="Male">Male</option>

              <option value="Female">Female</option>

              <option value="Others">Others</option>
            </FormSelect>

            {/* WEIGHT */}

            <FormInput
              label="Weight"
              error={errors.weight?.message}
              {...register("weight")}
            />

            {/* INTAKE DATE */}

            <FormInput
              label="Intake Date"
              type="date"
              error={errors.intakeDate?.message}
              {...register("intakeDate")}
            />

            {/* STATUS */}

            <FormSelect
              label="Status"
              error={errors.status?.message}
              {...register("status")}
            >
              <option value="Available">Available</option>

              <option value="Pending">Pending</option>

              <option value="Adopted">Adopted</option>

              <option value="Rejected">Rejected</option>
            </FormSelect>
          </div>

          {/* ERROR */}

          {updateError && (
            <div
              className="
                mt-6
                bg-red-100
                text-red-700
                px-4
                py-3
                rounded-xl
                text-sm
              "
            >
              {updateError}
            </div>
          )}

          {/* ACTIONS */}

          <div
            className="
              flex
              flex-col-reverse
              sm:flex-row
              justify-end
              gap-3
              mt-8
              pt-5
              border-t
              border-slate-300
            "
          >
            <button
              type="button"
              disabled={updateLoading}
              onClick={() => dispatch(closePetEditDialog())}
              className="
                px-6
                py-3
                rounded-full
                border-2
                border-[#0b252b]
                text-[#0b252b]
                font-semibold
                hover:bg-white
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updateLoading}
              className="
                flex
                items-center
                justify-center
                gap-2
                px-7
                py-3
                rounded-full
                bg-[#f04938]
                text-white
                font-semibold
                hover:bg-[#d93b2b]
                disabled:opacity-50
              "
            >
              <Save size={18} />

              {updateLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  function FormInput({ label, error, ...props }, ref) {
    return (
      <div>
        <label
          className="
        block
        text-sm
        font-bold
        text-[#0b252b]
        mb-2
      "
        >
          {label}
        </label>

        <input
          ref={ref}
          {...props}
          className="
          w-full
          px-4
          py-3
          rounded-xl
          bg-white
          border
          border-slate-200
          outline-none
          focus:ring-2
          focus:ring-[#0b252b]
        "
        />

        {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
      </div>
    );
  },
);
interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  function FormSelect({ label, error, children, ...props }, ref) {
    return (
      <div>
        <label
          className="
        block
        text-sm
        font-bold
        text-[#0b252b]
        mb-2
      "
        >
          {label}
        </label>

        <select
          ref={ref}
          {...props}
          className="
          w-full
          px-4
          py-3
          rounded-xl
          bg-white
          border
          border-slate-200
          outline-none
          focus:ring-2
          focus:ring-[#0b252b]
        "
        >
          {children}
        </select>

        {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
      </div>
    );
  },
);
