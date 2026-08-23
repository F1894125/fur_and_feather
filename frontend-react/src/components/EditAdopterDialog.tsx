import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { X, Save } from "lucide-react";

import {
  adopterSchema,
  type AdopterFormValues,
} from "../services/validation/adopterSchema";

import { updateAdopter, type Adopter } from "../store/slices/adopterSlice";

import { useAppDispatch, useAppSelector } from "../hooks/useRedux";

interface EditAdopterDialogProps {
  adopter: Adopter;
  onClose: () => void;
}

export default function EditAdopterDialog({
  adopter,
  onClose,
}: EditAdopterDialogProps) {
  const dispatch = useAppDispatch();

  const { updateLoading, updateError } = useAppSelector(
    (state) => state.adopter,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdopterFormValues>({
    resolver: yupResolver(adopterSchema),

    defaultValues: {
      name: adopter.name,

      dateOfBirth: adopter.dateOfBirth,

      gender: adopter.gender,

      occupation: adopter.occupation,

      maritalStatus: adopter.maritalStatus,

      ownedPetsBefore: adopter.ownedPetsBefore,

      currentPet: adopter.currentPet,

      currentPets: adopter.currentPets,

      phone: adopter.phone,

      email: adopter.email,

      address: adopter.address,

      residenceType: adopter.residenceType,

      livingWithFamily: adopter.livingWithFamily,

      householdSupport: adopter.householdSupport,

      financiallyPrepared: adopter.financiallyPrepared,

      hoursAlone: adopter.hoursAlone,

      caretakerDuringTravel: adopter.caretakerDuringTravel,

      adoptionReason: adopter.adoptionReason,
    },
  });

  /*
   * Reset form whenever a different
   * adopter is selected.
   */
  useEffect(() => {
    reset({
      name: adopter.name,

      dateOfBirth: adopter.dateOfBirth,

      gender: adopter.gender,

      occupation: adopter.occupation,

      maritalStatus: adopter.maritalStatus,

      ownedPetsBefore: adopter.ownedPetsBefore,

      currentPet: adopter.currentPet,

      currentPets: adopter.currentPets,

      phone: adopter.phone,

      email: adopter.email,

      address: adopter.address,

      residenceType: adopter.residenceType,

      livingWithFamily: adopter.livingWithFamily,

      householdSupport: adopter.householdSupport,

      financiallyPrepared: adopter.financiallyPrepared,

      hoursAlone: adopter.hoursAlone,

      caretakerDuringTravel: adopter.caretakerDuringTravel,

      adoptionReason: adopter.adoptionReason,
    });
  }, [adopter, reset]);

  /*
   * Submit
   */
  const onSubmit: SubmitHandler<AdopterFormValues> = async (data) => {
    const result = await dispatch(
      updateAdopter({
        adopterId: adopter.id,
        data: data as Partial<Adopter>,
      }),
    );

    if (updateAdopter.fulfilled.match(result)) {
      onClose();
    }
  };

  /*
   * Close dialog when clicking backdrop
   */
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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
      onMouseDown={handleBackdropClick}
    >
      <div
        className="
          w-full
          max-w-4xl
          max-h-[90vh]
          bg-[#ece6de]
          rounded-3xl
          shadow-2xl
          overflow-hidden
          flex
          flex-col
        "
      >
        {/* =====================================
            HEADER
        ===================================== */}

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
            <h2 className="text-xl sm:text-2xl font-bold">Edit Adopter</h2>

            <p className="text-xs text-slate-300 mt-1">
              {adopter.name} • {adopter.id}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
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
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* =====================================
            FORM BODY
        ===================================== */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            overflow-y-auto
            p-5
            sm:p-7
          "
        >
          {/* =================================
              PERSONAL INFORMATION
          ================================= */}

          <h3
            className="
            text-lg
            font-bold
            text-[#0b252b]
            border-b
            border-slate-300
            pb-2
            mb-5
          "
          >
            Personal Information
          </h3>

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
          >
            <FormInput
              label="Full Name"
              error={errors.name?.message}
              {...register("name")}
            />

            <FormInput
              label="Date of Birth"
              type="date"
              error={errors.dateOfBirth?.message}
              {...register("dateOfBirth")}
            />

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

            <FormInput
              label="Occupation"
              error={errors.occupation?.message}
              {...register("occupation")}
            />

            <FormSelect
              label="Marital Status"
              error={errors.maritalStatus?.message}
              {...register("maritalStatus")}
            >
              <option value="">Select marital status</option>

              <option value="Single">Single</option>

              <option value="Married">Married</option>

              <option value="Engaged">Engaged</option>

              <option value="Divorced">Divorced</option>

              <option value="Widowed">Widowed</option>

              <option value="Prefer not to say">Prefer not to say</option>
            </FormSelect>

            <FormSelect
              label="Owned Pets Before?"
              error={errors.ownedPetsBefore?.message}
              {...register("ownedPetsBefore")}
            >
              <option value="">Select</option>

              <option value="Yes">Yes</option>

              <option value="No">No</option>
            </FormSelect>

            <FormInput
              label="Current Pet"
              error={errors.currentPet?.message}
              {...register("currentPet")}
            />

            <FormInput
              label="Current Pets"
              error={errors.currentPets?.message}
              {...register("currentPets")}
            />
          </div>

          {/* =================================
              CONTACT INFORMATION
          ================================= */}

          <h3
            className="
            text-lg
            font-bold
            text-[#0b252b]
            border-b
            border-slate-300
            pb-2
            mb-5
            mt-8
          "
          >
            Contact Information
          </h3>

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
          >
            <FormInput
              label="Phone Number"
              error={errors.phone?.message}
              {...register("phone")}
            />

            <FormInput
              label="Email Address"
              type="email"
              error={errors.email?.message}
              {...register("email")}
            />

            <div className="md:col-span-2">
              <FormTextarea
                label="Address"
                error={errors.address?.message}
                {...register("address")}
              />
            </div>

            <FormSelect
              label="Residence Type"
              error={errors.residenceType?.message}
              {...register("residenceType")}
            >
              <option value="">Select residence</option>

              <option value="Apartment">Apartment</option>

              <option value="Independent house">Independent house</option>

              <option value="Others">Others</option>
            </FormSelect>
          </div>

          {/* =================================
              ADOPTION INFORMATION
          ================================= */}

          <h3
            className="
            text-lg
            font-bold
            text-[#0b252b]
            border-b
            border-slate-300
            pb-2
            mb-5
            mt-8
          "
          >
            Adoption Information
          </h3>

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
          >
            <FormSelect
              label="Living With Family?"
              error={errors.livingWithFamily?.message}
              {...register("livingWithFamily")}
            >
              <option value="">Select</option>

              <option value="Yes">Yes</option>

              <option value="No">No</option>
            </FormSelect>

            <FormSelect
              label="Household Support"
              error={errors.householdSupport?.message}
              {...register("householdSupport")}
            >
              <option value="">Select</option>

              <option value="Yes">Yes</option>

              <option value="No">No</option>
            </FormSelect>

            <FormSelect
              label="Financially Prepared?"
              error={errors.financiallyPrepared?.message}
              {...register("financiallyPrepared")}
            >
              <option value="">Select</option>

              <option value="Yes">Yes</option>

              <option value="No">No</option>
            </FormSelect>

            <FormInput
              label="Hours Pet Will Be Alone"
              error={errors.hoursAlone?.message}
              {...register("hoursAlone")}
            />

            <FormInput
              label="Caretaker During Travel"
              error={errors.caretakerDuringTravel?.message}
              {...register("caretakerDuringTravel")}
            />

            <div className="md:col-span-2">
              <FormTextarea
                label="Why Do You Want To Adopt?"
                rows={4}
                error={errors.adoptionReason?.message}
                {...register("adoptionReason")}
              />
            </div>
          </div>

          {/* =================================
              API ERROR
          ================================= */}

          {updateError && (
            <div
              className="
              mt-6
              bg-red-100
              border
              border-red-200
              text-red-700
              rounded-xl
              px-4
              py-3
              text-sm
            "
            >
              {updateError}
            </div>
          )}

          {/* =================================
              ACTIONS
          ================================= */}

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
              onClick={onClose}
              disabled={updateLoading}
              className="
                px-6
                py-3
                rounded-full
                border-2
                border-[#0b252b]
                text-[#0b252b]
                font-semibold
                hover:bg-white
                transition
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
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
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

/* =================================================
   INPUT
================================================= */

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

/* =================================================
   SELECT
================================================= */

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

/* =================================================
   TEXTAREA
================================================= */

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  function FormTextarea({ label, error, ...props }, ref) {
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

        <textarea
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
          resize-none
        "
        />

        {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
      </div>
    );
  },
);
