import React from "react";
import { MoreVertical, FileText } from "lucide-react";

interface Pet {
  id: string;
  name: string;
  species: "Dog" | "Cat";
  shelter: string;
  age: string;
  listed: string;
  applications: number;
  status: "Pending" | "Adopted" | "Rejected";
  image: string;
}

const pets: Pet[] = [
  {
    id: "PET-001",
    name: "Buddy",
    species: "Dog",
    shelter: "Happy Paws",
    age: "1.5 Yrs",
    listed: "Jan 12, 2026",
    applications: 3,
    status: "Pending",
    image: "/images/buddy.jpg",
  },
  {
    id: "PET-002",
    name: "Luna",
    species: "Cat",
    shelter: "Paw Friends",
    age: "1.Yr",
    listed: "Feb 04, 2026",
    applications: 2,
    status: "Adopted",
    image: "/images/luna.jpg",
  },
  {
    id: "PET-003",
    name: "Max",
    species: "Dog",
    shelter: "The Nest & Nook Sanctuary",
    age: "4 Yrs",
    listed: "Dec 28, 2025",
    applications: 1,
    status: "Pending",
    image: "/images/max.jpg",
  },
  {
    id: "PET-004",
    name: "Celo",
    species: "Cat",
    shelter: "Bondhu",
    age: "3 Yrs",
    listed: "Mar 05, 2026",
    applications: 4,
    status: "Rejected",
    image: "/images/celo.jpg",
  },
  {
    id: "PET-005",
    name: "Rocky",
    species: "Dog",
    shelter: "Chhaya",
    age: "3 Yrs",
    listed: "Jan 20, 2026",
    applications: 2,
    status: "Adopted",
    image: "/images/rocky.jpg",
  },
];

const RecentPetsListing: React.FC = () => {
  return (
    <section className="w-full">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#0A303A]">
          Recent Pets Listing
        </h2>

        <button
          type="button"
          className="
            text-sm sm:text-base
            font-medium
            text-[#0A303A]
            underline
            underline-offset-2
            hover:text-[#F04336]
            transition-colors
            cursor-pointer
          "
        >
          View All
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="w-full overflow-x-auto rounded-[20px]">
        <table className="w-full min-w-[1200px] border-collapse">
          {/* ================= HEADER ================= */}
          <thead>
            <tr className="bg-[#0A303A] text-white">
              <th className="px-4 py-5 text-left text-base sm:text-lg font-semibold">
                Pet Name
              </th>

              <th className="px-4 py-5 text-left text-base sm:text-lg font-semibold">
                Species
              </th>

              <th className="px-4 py-5 text-left text-base sm:text-lg font-semibold">
                Shelters
              </th>

              <th className="px-4 py-5 text-left text-base sm:text-lg font-semibold">
                Age
              </th>

              <th className="px-4 py-5 text-left text-base sm:text-lg font-semibold">
                Listed
              </th>

              <th className="px-4 py-5 text-center text-base sm:text-lg font-semibold">
                Applications
              </th>

              <th className="px-4 py-5 text-left text-base sm:text-lg font-semibold">
                Status
              </th>

              <th className="px-4 py-5 text-center text-base sm:text-lg font-semibold">
                View Details
              </th>
            </tr>
          </thead>

          {/* ================= BODY ================= */}
          <tbody>
            {pets.map((pet, index) => (
              <tr
                key={pet.id}
                className={index % 2 === 0 ? "bg-[#DCECF0]" : "bg-[#F5F8F9]"}
              >
                {/* ================= PET NAME ================= */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    {/* Image */}
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="
                        w-14
                        h-14
                        rounded-full
                        object-cover
                        shrink-0
                      "
                    />

                    {/* Name + ID */}
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#111] text-base">
                        {pet.name}
                      </span>

                      <span className="text-sm text-gray-500 mt-1">
                        {pet.id}
                      </span>
                    </div>
                  </div>
                </td>

                {/* ================= SPECIES ================= */}
                <td className="px-4 py-4">
                  <span className="text-[#111]">{pet.species}</span>
                </td>

                {/* ================= SHELTER ================= */}
                <td className="px-4 py-4">
                  <span className="text-[#111]">{pet.shelter}</span>
                </td>

                {/* ================= AGE ================= */}
                <td className="px-4 py-4">
                  <span className="text-[#111]">{pet.age}</span>
                </td>

                {/* ================= LISTED ================= */}
                <td className="px-4 py-4">
                  <span className="text-[#111]">{pet.listed}</span>
                </td>

                {/* ================= APPLICATIONS ================= */}
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <FileText
                      size={18}
                      strokeWidth={2}
                      className="text-[#0A303A]"
                    />

                    <span className="text-[#111]">{pet.applications}</span>
                  </div>
                </td>

                {/* ================= STATUS ================= */}
                <td className="px-4 py-4">
                  <StatusBadge status={pet.status} />
                </td>

                {/* ================= DETAILS ================= */}
                <td className="px-4 py-4">
                  <div className="flex justify-center">
                    <button
                      type="button"
                      aria-label={`View ${pet.name}`}
                      className="
                        flex
                        items-center
                        justify-center
                        w-10
                        h-10
                        rounded-full
                        border
                        border-[#0A303A]
                        bg-[#B9E4F1]
                        text-[#0A303A]
                        hover:bg-[#0A303A]
                        hover:text-white
                        transition-all
                        duration-200
                        cursor-pointer
                      "
                    >
                      <MoreVertical size={21} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

/* =====================================================
   STATUS BADGE
===================================================== */

interface StatusBadgeProps {
  status: Pet["status"];
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles: Record<Pet["status"], string> = {
    Pending: "bg-[#FFE3A3] text-[#A67A00]",
    Adopted: "bg-[#A9E89C] text-[#187A0D]",
    Rejected: "bg-[#FFAAA6] text-[#C62828]",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        rounded-full
        px-3
        py-1.5
        text-sm
        font-semibold
        whitespace-nowrap
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
};

export default RecentPetsListing;
