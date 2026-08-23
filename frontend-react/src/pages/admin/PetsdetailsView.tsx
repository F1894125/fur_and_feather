import { useNavigate, useParams } from "react-router-dom";

import {
  ChevronLeft,
  Pencil,
  Trash2,
  Calendar,
  Tag,
  Camera,
  FileText,
  StickyNote,
  Heart,
  Utensils,
  Activity,
  Smile,
} from "lucide-react";

import { petsData } from "./AllPetsDashboard";

export default function PetDetailsView() {
  const navigate = useNavigate();

  const { petId } = useParams<{
    petId: string;
  }>();
  console.log(petId);
  console.log(petsData);
  const pet = petsData.find((item) => item.id === petId);

  /* =========================================
     PET NOT FOUND
  ========================================= */

  if (!pet) {
    return (
      <div className="min-h-screen bg-[#ece6de] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-[#0b252b]">Pet Not Found</h2>

          <p className="text-sm text-slate-500 mt-2">
            The pet you're looking for doesn't exist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/pets")}
            className="
              mt-5
              bg-[#0b252b]
              hover:bg-[#13373f]
              text-white
              px-5
              py-2.5
              rounded-full
              text-sm
              font-semibold
            "
          >
            Back to All Pets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#ece6de] p-4 font-sans text-slate-800">
      <main className="flex-1 flex flex-col gap-4">
        {/* =========================================
            HEADER
        ========================================= */}

        <div className="bg-[#0b252b] text-white rounded-2xl px-6 py-4 flex items-center justify-between shadow-md">
          <button
            type="button"
            onClick={() => navigate("/pets")}
            className="
              flex
              items-center
              gap-2
              text-lg
              font-bold
              hover:text-slate-200
              transition-colors
              cursor-pointer
            "
          >
            <ChevronLeft size={22} />
            Back to All Pets
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="
                p-2.5
                rounded-full
                bg-slate-400/30
                hover:bg-slate-400/50
                text-white
                transition-colors
              "
              aria-label="Edit pet"
            >
              <Pencil size={18} />
            </button>

            <button
              type="button"
              className="
                p-2.5
                rounded-full
                bg-[#f04938]
                hover:bg-[#d93b2b]
                text-white
                transition-colors
              "
              aria-label="Delete pet"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* =========================================
            MAIN GRID
        ========================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* =======================================
              LEFT COLUMN
          ======================================= */}

          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Pet Image */}

            <div className="w-full h-80 rounded-3xl overflow-hidden shadow-sm">
              <img
                src={pet.image}
                alt={pet.name}
                className="
                  w-full
                  h-full
                  object-cover
                  object-center
                "
              />
            </div>

            {/* Name */}

            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">
                {pet.name}
              </h2>

              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {pet.id}
              </p>
            </div>

            {/* =====================================
                QUICK STATS
            ===================================== */}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Species */}

              <div className="bg-[#D5E6EB] p-3.5 rounded-2xl flex items-center gap-3">
                <span className="text-slate-700 text-lg">🐾</span>

                <div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Species
                  </p>

                  <p className="text-sm font-bold text-slate-900">
                    {pet.species}
                  </p>
                </div>
              </div>

              {/* Age */}

              <div className="bg-[#D5E6EB] p-3.5 rounded-2xl flex items-center gap-3">
                <Calendar className="text-slate-700" size={18} />

                <div>
                  <p className="text-[11px] text-slate-500 font-medium">Age</p>

                  <p className="text-sm font-bold text-slate-900">{pet.age}</p>
                </div>
              </div>

              {/* Gender */}

              <div className="bg-[#D5E6EB] p-3.5 rounded-2xl flex items-center gap-3">
                <span className="text-slate-700 font-bold text-lg">
                  {pet.gender === "Male" ? "♂" : "♀"}
                </span>

                <div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Gender
                  </p>

                  <p className="text-sm font-bold text-slate-900">
                    {pet.gender}
                  </p>
                </div>
              </div>

              {/* Weight */}

              <div className="bg-[#D5E6EB] p-3.5 rounded-2xl flex items-center gap-3">
                <Tag className="text-slate-700" size={18} />

                <div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Weight
                  </p>

                  <p className="text-sm font-bold text-slate-900">
                    {pet.weight}
                  </p>
                </div>
              </div>
            </div>

            {/* =====================================
                BASIC INFORMATION
            ===================================== */}

            <div className="bg-[#D5E6EB]/80 p-5 rounded-2xl flex flex-col gap-3">
              <h3 className="font-bold text-slate-900 text-sm">
                Basic Information
              </h3>

              <div className="space-y-2 text-xs">
                <InfoRow label="Breed" value={pet.breed} />

                <InfoRow label="Color" value="White/Golden" />

                <InfoRow label="Health" value="Vaccinated, Dewormed, Healthy" />

                <InfoRow label="Personality" value="Friendly, Playful, Loyal" />
              </div>
            </div>

            {/* =====================================
                LOCATION & DATES
            ===================================== */}

            <div className="bg-[#D5E6EB]/80 p-5 rounded-2xl flex flex-col gap-3">
              <h3 className="font-bold text-slate-900 text-sm">
                Location & Dates
              </h3>

              <div className="space-y-2 text-xs">
                <InfoRow label="Shelter Name" value="Paw Friends" />

                <InfoRow
                  label="Location"
                  value="12/1 Atul Sur Road, Kolkata-700123"
                />

                <InfoRow label="Intake Date" value={pet.intakeDate} />

                <InfoRow label="Fees" value="2499/-" />
              </div>
            </div>
          </div>

          {/* =======================================
              RIGHT COLUMN
          ======================================= */}

          <div className="flex flex-col gap-4">
            {/* =====================================
                ADOPTION APPLICATIONS
            ===================================== */}

            <div className="bg-[#D5E6EB]/80 p-5 rounded-2xl flex flex-col gap-4">
              <h3 className="font-bold text-slate-900 text-base">
                Adoption Applications
              </h3>

              <div className="space-y-3">
                <Applicant
                  name="Jhon Smith"
                  date="March 18, 2026"
                  image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                  status="Pending"
                />

                <Applicant
                  name="Emily Chen"
                  date="March 15, 2026"
                  image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  status="Accepted"
                />

                <Applicant
                  name="Michale Brown"
                  date="March 10, 2026"
                  image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80"
                  status="Rejected"
                />
              </div>
            </div>

            {/* =====================================
                PET FAVOURITE
            ===================================== */}

            <div className="bg-[#D5E6EB]/80 p-5 rounded-2xl flex flex-col gap-4">
              <h3 className="font-bold text-slate-900 text-base">
                Pet's Favourite
              </h3>

              <div className="space-y-3 text-xs">
                <Favourite
                  icon={<Heart size={16} />}
                  title="Loves"
                  value="Playing Fetch, Belly Scratching"
                />

                <Favourite
                  icon={<Utensils size={16} />}
                  title="Food"
                  value="Chicken Treats, Dog Biscuit"
                />

                <Favourite
                  icon={<Activity size={16} />}
                  title="Activity"
                  value="Swimming, Long Walks"
                />

                <Favourite
                  icon={<Smile size={16} />}
                  title="Toy"
                  value="Tennis Ball, Rope Toys"
                />
              </div>
            </div>

            {/* =====================================
                QUICK ACTIONS
            ===================================== */}

            <div className="bg-[#D5E6EB]/80 p-5 rounded-2xl flex flex-col gap-3">
              <h3 className="font-bold text-slate-900 text-base">
                Quick Actions
              </h3>

              <div className="space-y-2.5">
                <ActionButton
                  icon={<Camera size={16} />}
                  text="Upload Photos"
                />

                <ActionButton
                  icon={<FileText size={16} />}
                  text="Medical Records"
                />

                <ActionButton
                  icon={<StickyNote size={16} />}
                  text="Add Notes"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* =====================================================
   INFO ROW
===================================================== */

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex justify-between gap-5">
      <span className="text-slate-500 font-medium">{label}</span>

      <span className="font-bold text-slate-900 text-right">{value}</span>
    </div>
  );
}

/* =====================================================
   APPLICANT
===================================================== */

interface ApplicantProps {
  name: string;
  date: string;
  image: string;
  status: "Pending" | "Accepted" | "Rejected";
}

function Applicant({ name, date, image, status }: ApplicantProps) {
  const statusStyles = {
    Pending: "bg-[#fef3c7] text-[#b45309]",
    Accepted: "bg-[#dcfce7] text-[#15803d]",
    Rejected: "bg-[#fee2e2] text-[#b91c1c]",
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src={image}
          alt={name}
          className="w-9 h-9 rounded-full object-cover"
        />

        <div>
          <p className="font-bold text-xs text-slate-900">{name}</p>

          <p className="text-[10px] text-slate-500">{date}</p>
        </div>
      </div>

      <span
        className={`
          ${statusStyles[status]}
          font-medium
          text-[10px]
          px-2.5
          py-1
          rounded-full
        `}
      >
        {status}
      </span>
    </div>
  );
}

/* =====================================================
   FAVOURITE
===================================================== */

interface FavouriteProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

function Favourite({ icon, title, value }: FavouriteProps) {
  return (
    <div className="flex gap-2.5 items-start">
      <span className="text-slate-800 shrink-0 mt-0.5">{icon}</span>

      <div>
        <p className="font-bold text-slate-900">{title}</p>

        <p className="text-slate-600 font-medium">{value}</p>
      </div>
    </div>
  );
}

/* =====================================================
   ACTION BUTTON
===================================================== */

interface ActionButtonProps {
  icon: React.ReactNode;
  text: string;
}

function ActionButton({ icon, text }: ActionButtonProps) {
  return (
    <button
      type="button"
      className="
        w-full
        bg-[#0b252b]
        hover:bg-[#13373f]
        text-white
        font-medium
        py-3
        px-4
        rounded-full
        text-xs
        flex
        items-center
        gap-3
        transition-colors
        shadow-sm
      "
    >
      {icon}

      {text}
    </button>
  );
}
