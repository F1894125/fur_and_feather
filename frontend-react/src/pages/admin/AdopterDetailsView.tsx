import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft, ClipboardCheck, CheckCircle2 } from "lucide-react";

import { adoptersData } from "../../services/json/AdopterData";

export default function AdopterDetailsView() {
  const navigate = useNavigate();

  const { adopterId } = useParams<{
    adopterId: string;
  }>();

  const adopter = adoptersData.find((item) => item.id === adopterId);

  /* =========================================
     NOT FOUND
  ========================================= */

  if (!adopter) {
    return (
      <div className="min-h-screen bg-[#ece6de] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-[#0b252b]">
            Adopter Not Found
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            The adopter you're looking for doesn't exist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/admin/all-adopters")}
            className="
              mt-5
              bg-[#0b252b]
              text-white
              px-6
              py-2.5
              rounded-full
              font-semibold
            "
          >
            Back to All Adopters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ece6de] p-4 sm:p-6 font-sans text-[#0b252b]">
      {/* =========================================
          BACK HEADER
      ========================================= */}

      <div className="bg-[#0b252b] text-white rounded-3xl px-5 sm:px-7 py-5 mb-5">
        <button
          type="button"
          onClick={() => navigate("/admin/all-adopters")}
          className="
            flex
            items-center
            gap-2
            text-xl
            sm:text-2xl
            font-bold
            hover:text-slate-200
            transition-colors
          "
        >
          <ArrowLeft size={25} />
          Back to All Adopters
        </button>
      </div>

      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* =======================================
            LEFT COLUMN
        ======================================= */}

        <div className="flex flex-col gap-5">
          {/* PROFILE + BASIC INFO */}

          <section className="bg-[#d5e6eb] rounded-3xl p-4 sm:p-5 shadow-sm">
            {/* Profile Header */}

            <div className="bg-[#0b252b] rounded-3xl p-5 text-white flex items-center gap-5">
              <img
                src={adopter.profileImage}
                alt={adopter.name}
                className="
                  w-28
                  h-28
                  rounded-full
                  object-cover
                  border-4
                  border-[#d5e6eb]
                  shrink-0
                "
              />

              <div className="space-y-2 text-lg">
                <DetailLine label="Full Name" value={adopter.name} dark />

                <DetailLine
                  label="Date of Birth"
                  value={adopter.dateOfBirth}
                  dark
                />

                <DetailLine label="Gender" value={adopter.gender} dark />
              </div>
            </div>

            {/* Personal Information */}

            <div className="mt-4 space-y-3 text-lg">
              <DetailLine
                label="Current Occupation"
                value={adopter.occupation}
              />

              <DetailLine
                label="Marital Status"
                value={adopter.maritalStatus}
              />

              <DetailLine
                label="Have You Owned Pets Before?"
                value={adopter.ownedPetsBefore}
              />

              <DetailLine label="Current Pet" value={adopter.currentPet} />

              <DetailLine label="Current Pets" value={adopter.currentPets} />

              <DetailLine label="Phone Number" value={adopter.phone} />

              <DetailLine label="Email Address" value={adopter.email} />

              <DetailLine label="Address" value={adopter.address} />

              <DetailLine
                label="Type of Resident"
                value={adopter.residenceType}
              />
            </div>
          </section>

          {/* =====================================
              VERIFICATION
          ===================================== */}

          <section className="bg-[#d5e6eb] rounded-3xl p-5 shadow-sm">
            <h2 className="text-2xl font-bold text-black mb-5">
              View Verification
            </h2>

            <VerificationRow
              title="Government ID"
              verified={adopter.governmentIdVerified}
            />

            <VerificationRow
              title="Address Proof"
              verified={adopter.addressProofVerified}
            />
          </section>
        </div>

        {/* =======================================
            RIGHT COLUMN
        ======================================= */}

        <div className="flex flex-col gap-5">
          {/* =====================================
              QUESTIONS
          ===================================== */}

          <section className="bg-[#d5e6eb] rounded-3xl p-5 shadow-sm">
            <QuestionRow
              question="Are you living with your family ? :"
              answer={adopter.livingWithFamily}
            />

            <QuestionRow
              question="Is everyone in your household supportive of adopting a pet ? :"
              answer={adopter.householdSupport}
            />

            <QuestionRow
              question="Are you financially prepared for your pet's food, grooming, and veterinary expenses ? :"
              answer={adopter.financiallyPrepared}
            />

            <QuestionRow
              question="Is everyone in your household supportive of adopting a pet ? :"
              answer={adopter.householdSupport}
            />

            <QuestionRow
              question="How many hours a day will your pet be alone ? :"
              answer={adopter.hoursAlone}
            />

            <QuestionRow
              question="Who will look after your pet if you go on a vacation or travel for work ? :"
              answer={adopter.caretakerDuringTravel}
            />

            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-3 mt-5">
              <p className="text-lg font-bold">Why Do You Want to Adopt :</p>

              <p className="text-base leading-6 text-slate-600 whitespace-pre-line">
                {adopter.adoptionReason}
              </p>
            </div>
          </section>

          {/* =====================================
              STATISTICS
          ===================================== */}

          <section className="bg-[#d5e6eb] rounded-3xl p-5">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <StatCard value={adopter.adoptionCount} label="Adoption" />

              <StatCard value={adopter.applicationCount} label="Applications" />

              <StatCard value={adopter.acceptedCount} label="Accepted" />

              <StatCard value={adopter.rejectedCount} label="Rejected" />

              <StatCard value={adopter.wishlistCount} label="Wishlist" />
            </div>
          </section>

          {/* =====================================
              TAKE ACTION
          ===================================== */}

          <section className="bg-[#d5e6eb] rounded-3xl p-5">
            <h2 className="text-2xl font-bold text-black mb-8">Take Action</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  console.log("Accepted:", adopter.id);
                }}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-[#8de0aa]
                  text-[#137a3b]
                  py-4
                  px-5
                  text-lg
                  font-semibold
                  hover:opacity-90
                  transition
                "
              >
                <ClipboardCheck size={20} />
                Accept The Application
              </button>

              <button
                type="button"
                onClick={() => {
                  console.log("Rejected:", adopter.id);
                }}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-[#ff9995]
                  text-[#b51f1a]
                  py-4
                  px-5
                  text-lg
                  font-semibold
                  hover:opacity-90
                  transition
                "
              >
                <ClipboardCheck size={20} />
                Reject The Application
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   DETAIL LINE
========================================= */

interface DetailLineProps {
  label: string;
  value: string;
  dark?: boolean;
}

function DetailLine({ label, value, dark = false }: DetailLineProps) {
  return (
    <div
      className={`
        grid
        grid-cols-[auto_1fr]
        gap-2
        items-start
        ${dark ? "text-white" : "text-[#0b252b]"}
      `}
    >
      <span className="font-bold whitespace-nowrap">{label} :</span>

      <span
        className={`
          font-medium
          ${dark ? "text-slate-200" : "text-slate-600"}
        `}
      >
        {value}
      </span>
    </div>
  );
}

/* =========================================
   QUESTION ROW
========================================= */

interface QuestionRowProps {
  question: string;
  answer: string;
}

function QuestionRow({ question, answer }: QuestionRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-3 mb-5">
      <p className="text-lg font-bold leading-7">{question}</p>

      <p className="text-base text-slate-600">{answer}</p>
    </div>
  );
}

/* =========================================
   VERIFICATION
========================================= */

interface VerificationRowProps {
  title: string;
  verified: boolean;
}

function VerificationRow({ title, verified }: VerificationRowProps) {
  return (
    <div
      className={`
        flex
        items-center
        justify-between
        rounded-3xl
        px-5
        py-4
        mb-5
        ${
          verified
            ? "bg-[#8de0aa] text-[#137a3b]"
            : "bg-[#ff9995] text-[#b51f1a]"
        }
      `}
    >
      <div className="flex items-center gap-3 text-lg font-medium">
        <ClipboardCheck size={20} />

        {title}
      </div>

      {verified && <CheckCircle2 size={21} />}
    </div>
  );
}

/* =========================================
   STAT CARD
========================================= */

interface StatCardProps {
  value: number;
  label: string;
}

function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="bg-[#0b252b] text-white rounded-xl py-4 px-3 text-center">
      <p className="text-3xl font-bold">{value}</p>

      <p className="text-xs font-medium">{label}</p>
    </div>
  );
}
