import React from "react";

interface Shelter {
  name: string;
  location: string;
  manager: string;
  activePets: number;
  adoptions: number;
  status: "Verified" | "Pending";
  joined: string;
  rating: number;
}

const shelters: Shelter[] = [
  {
    name: "Paw Friends",
    location: "Kolkata, WB",
    manager: "Pijush Pal",
    activePets: 42,
    adoptions: 128,
    status: "Verified",
    joined: "Jan 15, 2021",
    rating: 4.8,
  },
  {
    name: "Maple Tails Rescue",
    location: "Baner, Pune",
    manager: "Rohan Yogi",
    activePets: 35,
    adoptions: 104,
    status: "Verified",
    joined: "May 25, 2024",
    rating: 4.7,
  },
  {
    name: "The Nest & Nook Sanctuary",
    location: "Jubilee Hills, Hyderabad",
    manager: "Osman Sagar",
    activePets: 58,
    adoptions: 98,
    status: "Verified",
    joined: "Aug 18, 2023",
    rating: 4.6,
  },
  {
    name: "Happy Tails Rescue Home",
    location: "Banjara Hills, Hyderabad",
    manager: "J. Sai. Deepak",
    activePets: 29,
    adoptions: 87,
    status: "Pending",
    joined: "Apr 08, 2026",
    rating: 4.5,
  },
  {
    name: "Golden Paws Rescue Home",
    location: "Andheri West, Mumbai",
    manager: "Kumaresh Das",
    activePets: 24,
    adoptions: 65,
    status: "Verified",
    joined: "Apr 30, 2024",
    rating: 4.1,
  },
];

const TopPerformingShelters: React.FC = () => {
  return (
    <section className="w-full">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#0A303A]">
          Top Performing Shelters
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
        <table className="w-full min-w-[1150px] border-collapse">
          <colgroup>
            <col className="w-[20%]" />
            <col className="w-[15%]" />
            <col className="w-[18%]" />
            <col className="w-[10%]" />
            <col className="w-[10%]" />
            <col className="w-[10%]" />
            <col className="w-[12%]" />
            <col className="w-[5%]" />
          </colgroup>
          {/* ================= TABLE HEADER ================= */}
          <thead>
            <tr className="bg-[#0A303A] text-white">
              <th className="px-4 py-5 text-left text-base sm:text-lg font-semibold">
                Shelter Name
              </th>

              <th className="px-4 py-5 text-left text-base sm:text-lg font-semibold">
                Manager Name
              </th>

              <th className="px-4 py-5 text-left text-base sm:text-lg font-semibold">
                Location
              </th>

              <th className="px-4 py-5 text-center text-base sm:text-lg font-semibold">
                Active Pets
              </th>

              <th className="px-4 py-5 text-center text-base sm:text-lg font-semibold">
                Adoptions
              </th>

              <th className="px-4 py-5 text-left text-base sm:text-lg font-semibold">
                Status
              </th>

              <th className="px-4 py-5 text-left text-base sm:text-lg font-semibold">
                Joined
              </th>

              <th className="px-4 py-5 text-left text-base sm:text-lg font-semibold">
                Ratings
              </th>
            </tr>
          </thead>

          {/* ================= TABLE BODY ================= */}
          <tbody>
            {shelters.map((shelter, index) => (
              <tr
                key={shelter.name}
                className={`
                  ${index % 2 === 0 ? "bg-[#DCECF0]" : "bg-[#F5F8F9]"}
                  transition-colors
                `}
              >
                {/* Shelter Name */}
                <td className="px-4 py-5">
                  <div className="flex flex-col">
                    <span className="font-semibold text-[#111]">
                      {shelter.name}
                    </span>

                    <span className="mt-1 text-sm text-gray-500">
                      {shelter.location}
                    </span>
                  </div>
                </td>

                {/* Manager */}
                <td className="px-4 py-5">
                  <span className="text-gray-500">{shelter.manager}</span>
                </td>

                {/* Location */}
                <td className="px-4 py-5">
                  <span className="text-gray-500">{shelter.location}</span>
                </td>

                {/* Active Pets */}
                <td className="px-4 py-5 text-center">
                  <span className="font-medium text-[#111]">
                    {shelter.activePets}
                  </span>
                </td>

                {/* Adoptions */}
                <td className="px-4 py-5 text-center">
                  <span className="font-medium text-[#111]">
                    {shelter.adoptions}
                  </span>
                </td>

                {/* Status */}
                <td className="px-4 py-5">
                  <span
                    className={`
                      inline-flex
                      items-center
                      justify-center
                      rounded-full
                      px-3
                      py-1
                      text-sm
                      font-semibold
                      whitespace-nowrap
                      ${
                        shelter.status === "Verified"
                          ? "bg-[#A9E89C] text-[#187A0D]"
                          : "bg-[#FFE3A3] text-[#A67A00]"
                      }
                    `}
                  >
                    {shelter.status}
                  </span>
                </td>

                {/* Joined */}
                <td className="px-4 py-5">
                  <span className="text-gray-500">{shelter.joined}</span>
                </td>

                {/* Rating */}
                <td className="px-4 py-5">
                  <div className="flex items-center gap-1">
                    <span className="text-[#E3A817] text-base">★</span>

                    <span className="text-[#F04336] font-medium">
                      {shelter.rating}
                    </span>
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

export default TopPerformingShelters;
