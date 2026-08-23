import React, { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { saveStepData, setStep } from "../../store/slices/formSlice";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  type FormValues,
} from "../../utils/formHelpers";
import { useAppSelector, useAppDispatch } from "../../hooks/useRedux";

// Paw Icon SVG
const PawIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 13a4 4 0 0 0-4 4c0 1.66 1.34 3 3 3h2c1.66 0 3-1.34 3-3a4 4 0 0 0-4-4zm-5.5-3A2.5 2.5 0 1 0 4 7.5 2.5 2.5 0 0 0 6.5 10zm11 0A2.5 2.5 0 1 0 15 7.5a2.5 2.5 0 0 0 2.5 2.5zM9 5a2 2 0 1 0-2-2 2 2 0 0 0 2 2zm6 0a2 2 0 1 0-2-2 2 2 0 0 0 2 2z" />
  </svg>
);

// Gallery Icon SVG
const GalleryIcon = () => (
  <svg
    className="w-6 h-6 text-[#0B252C]"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

// Camera Icon SVG
const CameraIcon = () => (
  <svg
    className="w-6 h-6 text-[#0B252C]"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

export const AdoptionWizard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentStep = 1, formData: reduxData = {} } = useAppSelector(
    (state) => state.wizard || {},
  );

  // Active step schema selector
  const activeSchema =
    currentStep === 1
      ? step1Schema
      : currentStep === 2
        ? step2Schema
        : step3Schema;

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<Partial<FormValues>>({
    defaultValues: reduxData,
    // Fix: Explicitly cast the resolver to avoid TypeScript schema mismatch errors
    resolver: zodResolver(activeSchema) as unknown as Resolver<
      Partial<FormValues>
    >,
    mode: "onTouched",
  });

  // Keep form initialized with Redux state on step changes
  useEffect(() => {
    reset(reduxData);
  }, [currentStep, reset, reduxData]);

  const selectedGender = watch("gender");
  const selectedMarital = watch("maritalStatus");
  const selectedOwnedPets = watch("ownedPetsBefore");
  const selectedResidence = watch("residenceType");

  // Validate step fields before navigating
  const handleStepNavigation = async (targetStep: number) => {
    const currentValues = watch();
    const result = activeSchema.safeParse(currentValues);

    if (result.success) {
      clearErrors();
      dispatch(saveStepData(currentValues));
      dispatch(setStep(targetStep));
    } else {
      dispatch(saveStepData(currentValues));
      // Populate React Hook Form errors manually for failed fields
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          const fieldName = issue.path[0] as keyof FormValues;
          setError(fieldName, { message: issue.message });
        }
      });
    }
  };

  const onSubmit = (data: Partial<FormValues>) => {
    const finalPayload = { ...reduxData, ...data };
    dispatch(saveStepData(finalPayload));
    console.log("Final Registration Payload:", finalPayload);
    alert("Application Registered Successfully!");
  };

  return (
    <div className="min-h-screen bg-[#F5F2EB] py-12 px-4 sm:px-6 lg:px-8 font-sans text-[#0B252C]">
      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-3xl font-extrabold text-center tracking-tight text-[#0B252C]">
          Register Now
        </h1>

        {/* Step Indicator Header */}
        <div className="flex items-center justify-center max-w-lg mx-auto">
          {[
            { step: 1, label: "Basic Details" },
            { step: 2, label: "Contact Details" },
            { step: 3, label: "Verification" },
          ].map((item, index) => (
            <React.Fragment key={item.step}>
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => handleStepNavigation(item.step)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    currentStep === item.step
                      ? "bg-[#F04336] text-white shadow-sm"
                      : "border-2 border-[#F04336] text-[#F04336] bg-transparent"
                  }`}
                >
                  {item.step}
                </button>
                <span className="text-xs font-semibold mt-2 text-[#0B252C] whitespace-nowrap">
                  {item.label}
                </span>
              </div>
              {index < 2 && (
                <div className="h-[1.5px] bg-gray-400 flex-1 mx-4 -mt-5 max-w-[100px]" />
              )}
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* STEP 1: BASIC DETAILS */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#0B252C]">
                Basic Details
              </h2>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Full Name <span className="text-[#F04336]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Full Name"
                  {...register("fullName")}
                  className={`w-full bg-[#EFECE6] border ${
                    errors.fullName ? "border-[#F04336]" : "border-gray-300/80"
                  } rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-[#F04336]`}
                />
                {errors.fullName && (
                  <p className="text-[#F04336] text-xs mt-1.5">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Date Of Birth <span className="text-[#F04336]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  {...register("dob")}
                  className={`w-full bg-[#EFECE6] border ${
                    errors.dob ? "border-[#F04336]" : "border-gray-300/80"
                  } rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-[#F04336]`}
                />
                {errors.dob && (
                  <p className="text-[#F04336] text-xs mt-1.5">
                    {errors.dob.message}
                  </p>
                )}
              </div>

              {/* Gender Radio */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Gender <span className="text-[#F04336]">*</span>
                </label>
                <div className="flex items-center gap-6 pt-1">
                  {[
                    { id: "male", label: "Male" },
                    { id: "female", label: "Female" },
                    { id: "others", label: "Others" },
                  ].map((g) => (
                    <label
                      key={g.id}
                      className="flex items-center gap-2 cursor-pointer text-sm font-medium"
                    >
                      <input
                        type="radio"
                        value={g.id}
                        {...register("gender")}
                        className="hidden"
                      />
                      <span
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedGender === g.id
                            ? "border-[#F04336] bg-[#F04336]"
                            : "border-gray-400 bg-transparent"
                        }`}
                      >
                        {selectedGender === g.id && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </span>
                      {g.label}
                    </label>
                  ))}
                </div>
                {errors.gender && (
                  <p className="text-[#F04336] text-xs mt-1.5">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Occupation */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Current Occupation <span className="text-[#F04336]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Current Occupation"
                  {...register("occupation")}
                  className={`w-full bg-[#EFECE6] border ${
                    errors.occupation
                      ? "border-[#F04336]"
                      : "border-gray-300/80"
                  } rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-[#F04336]`}
                />
                {errors.occupation && (
                  <p className="text-[#F04336] text-xs mt-1.5">
                    {errors.occupation.message}
                  </p>
                )}
              </div>

              {/* Marital Status Radio */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Marital Status <span className="text-[#F04336]">*</span>
                </label>
                <div className="flex flex-wrap items-center gap-6 pt-1">
                  {[
                    { id: "single", label: "Single" },
                    { id: "married", label: "Married" },
                    { id: "engaged", label: "Engaged" },
                    { id: "divorced", label: "Divorced" },
                    { id: "widowed", label: "Widowed" },
                    { id: "prefer_not_to_say", label: "Prefer not to say" },
                  ].map((m) => (
                    <label
                      key={m.id}
                      className="flex items-center gap-2 cursor-pointer text-sm font-medium"
                    >
                      <input
                        type="radio"
                        value={m.id}
                        {...register("maritalStatus")}
                        className="hidden"
                      />
                      <span
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedMarital === m.id
                            ? "border-[#F04336] bg-[#F04336]"
                            : "border-gray-400 bg-transparent"
                        }`}
                      >
                        {selectedMarital === m.id && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </span>
                      {m.label}
                    </label>
                  ))}
                </div>
                {errors.maritalStatus && (
                  <p className="text-[#F04336] text-xs mt-1.5">
                    {errors.maritalStatus.message}
                  </p>
                )}
              </div>

              {/* Have You Owned Pets Before */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Have You Owned Pets Before?
                </label>
                <div className="flex items-center gap-6 pt-1">
                  {[
                    { id: "yes", label: "Yes" },
                    { id: "no", label: "No" },
                  ].map((p) => (
                    <label
                      key={p.id}
                      className="flex items-center gap-2 cursor-pointer text-sm font-medium"
                    >
                      <input
                        type="radio"
                        value={p.id}
                        {...register("ownedPetsBefore")}
                        className="hidden"
                      />
                      <span
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedOwnedPets === p.id
                            ? "border-[#F04336] bg-[#F04336]"
                            : "border-gray-400 bg-transparent"
                        }`}
                      >
                        {selectedOwnedPets === p.id && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </span>
                      {p.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Current Pets Grid */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold">
                  Current Pets (If Any)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="block text-xs font-semibold mb-1 text-gray-700">
                      Species
                    </span>
                    <input
                      type="text"
                      placeholder="Enter Current Pets Species"
                      {...register("currentPetSpecies")}
                      className="w-full bg-[#EFECE6] border border-gray-300/80 rounded-2xl px-4 py-3 text-xs outline-none focus:border-[#F04336]"
                    />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold mb-1 text-gray-700">
                      Breed
                    </span>
                    <input
                      type="text"
                      placeholder="Enter Current Pets Breed"
                      {...register("currentPetBreed")}
                      className="w-full bg-[#EFECE6] border border-gray-300/80 rounded-2xl px-4 py-3 text-xs outline-none focus:border-[#F04336]"
                    />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold mb-1 text-gray-700">
                      Age
                    </span>
                    <input
                      type="text"
                      placeholder="Enter Current Pets Age"
                      {...register("currentPetAge")}
                      className="w-full bg-[#EFECE6] border border-gray-300/80 rounded-2xl px-4 py-3 text-xs outline-none focus:border-[#F04336]"
                    />
                  </div>
                </div>
              </div>

              {/* Why do you want to adopt? */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Why do you want to adopt?
                </label>
                <textarea
                  rows={4}
                  placeholder="Share your thoughts"
                  {...register("adoptionReason")}
                  className="w-full bg-[#EFECE6] border border-gray-300/80 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-[#F04336] resize-none"
                />
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="button"
                  onClick={() => handleStepNavigation(2)}
                  className="bg-[#EBE7DF] hover:bg-[#E0DAD0] text-[#0B252C] font-semibold py-2.5 px-8 rounded-full border border-gray-300/60 flex items-center gap-2"
                >
                  Continue <PawIcon />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CONTACT DETAILS */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#0B252C]">
                Contact Details
              </h2>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Phone Number <span className="text-[#F04336]">*</span>
                </label>
                <div
                  className={`flex items-center bg-[#EFECE6] border ${
                    errors.phone ? "border-[#F04336]" : "border-gray-300/80"
                  } rounded-2xl px-5 py-3.5 focus-within:border-[#F04336]`}
                >
                  <span className="font-bold border-r border-gray-400 pr-3 mr-3 text-sm">
                    91+
                  </span>
                  <input
                    type="tel"
                    placeholder="Enter Your Phone Number"
                    {...register("phone")}
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
                {errors.phone && (
                  <p className="text-[#F04336] text-xs mt-1.5">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Email & Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email - ID <span className="text-[#F04336]">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Your Email - ID"
                    {...register("email")}
                    className={`w-full bg-[#EFECE6] border ${
                      errors.email ? "border-[#F04336]" : "border-gray-300/80"
                    } rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-[#F04336]`}
                  />
                  {errors.email && (
                    <p className="text-[#F04336] text-xs mt-1.5">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    {...register("step2Password")}
                    className="w-full bg-[#EFECE6] border border-gray-300/80 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-[#F04336]"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Address <span className="text-[#F04336]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Address"
                  {...register("address")}
                  className={`w-full bg-[#EFECE6] border ${
                    errors.address ? "border-[#F04336]" : "border-gray-300/80"
                  } rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-[#F04336]`}
                />
                {errors.address && (
                  <p className="text-[#F04336] text-xs mt-1.5">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Residence Radio */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Types Of Residence <span className="text-[#F04336]">*</span>
                </label>
                <div className="flex items-center gap-6 pt-1">
                  {[
                    { id: "apartment", label: "Apartment" },
                    { id: "independent_house", label: "Independent House" },
                    { id: "others", label: "Others" },
                  ].map((r) => (
                    <label
                      key={r.id}
                      className="flex items-center gap-2 cursor-pointer text-sm font-medium"
                    >
                      <input
                        type="radio"
                        value={r.id}
                        {...register("residenceType")}
                        className="hidden"
                      />
                      <span
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedResidence === r.id
                            ? "border-[#F04336] bg-[#F04336]"
                            : "border-gray-400 bg-transparent"
                        }`}
                      >
                        {selectedResidence === r.id && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </span>
                      {r.label}
                    </label>
                  ))}
                </div>
                {errors.residenceType && (
                  <p className="text-[#F04336] text-xs mt-1.5">
                    {errors.residenceType.message}
                  </p>
                )}
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="button"
                  onClick={() => handleStepNavigation(3)}
                  className="bg-[#EBE7DF] hover:bg-[#E0DAD0] text-[#0B252C] font-semibold py-2.5 px-8 rounded-full border border-gray-300/60 flex items-center gap-2"
                >
                  Continue <PawIcon />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: VERIFICATION */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#0B252C]">
                Verification
              </h2>

              {/* Passwords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Create Password<span className="text-[#F04336]">*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Create Your New Password"
                    {...register("createPassword")}
                    className="w-full bg-[#EFECE6] border border-gray-300/80 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-[#F04336]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Confirm Password<span className="text-[#F04336]">*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Your New Password"
                    {...register("confirmPassword")}
                    className={`w-full bg-[#EFECE6] border ${
                      errors.confirmPassword
                        ? "border-[#F04336]"
                        : "border-gray-300/80"
                    } rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-[#F04336]`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-[#F04336] text-xs mt-1.5">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Government ID */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Upload Government ID <span className="text-[#F04336]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center justify-center bg-[#EFECE6] border border-gray-300/80 rounded-2xl py-4 cursor-pointer hover:bg-[#E2DDD3]">
                    <GalleryIcon />
                    <input
                      type="file"
                      {...register("governmentId")}
                      className="hidden"
                    />
                  </label>
                  <label className="flex items-center justify-center bg-[#EFECE6] border border-gray-300/80 rounded-2xl py-4 cursor-pointer hover:bg-[#E2DDD3]">
                    <CameraIcon />
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                    />
                  </label>
                </div>
                {errors.governmentId && (
                  <p className="text-[#F04336] text-xs mt-1.5">
                    {errors.governmentId.message as string}
                  </p>
                )}
              </div>

              {/* Address Proof */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Upload Address Proof <span className="text-[#F04336]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center justify-center bg-[#EFECE6] border border-gray-300/80 rounded-2xl py-4 cursor-pointer hover:bg-[#E2DDD3]">
                    <GalleryIcon />
                    <input
                      type="file"
                      {...register("addressProof")}
                      className="hidden"
                    />
                  </label>
                  <label className="flex items-center justify-center bg-[#EFECE6] border border-gray-300/80 rounded-2xl py-4 cursor-pointer hover:bg-[#E2DDD3]">
                    <CameraIcon />
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                    />
                  </label>
                </div>
                {errors.addressProof && (
                  <p className="text-[#F04336] text-xs mt-1.5">
                    {errors.addressProof.message as string}
                  </p>
                )}
              </div>

              {/* Profile Photo */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Upload Profile Photo
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center justify-center bg-[#EFECE6] border border-gray-300/80 rounded-2xl py-4 cursor-pointer hover:bg-[#E2DDD3]">
                    <GalleryIcon />
                    <input
                      type="file"
                      {...register("profilePhoto")}
                      className="hidden"
                    />
                  </label>
                  <label className="flex items-center justify-center bg-[#EFECE6] border border-gray-300/80 rounded-2xl py-4 cursor-pointer hover:bg-[#E2DDD3]">
                    <CameraIcon />
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col items-center gap-4 pt-6">
                <button
                  type="submit"
                  className="bg-[#F04336] hover:bg-[#D9382C] text-white font-bold py-3.5 px-14 rounded-full shadow-md flex items-center gap-2 text-base transition-all"
                >
                  Submit <PawIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
