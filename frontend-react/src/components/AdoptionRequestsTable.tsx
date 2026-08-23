import React from "react";

interface AdoptionRequest {
  id: string;
  adopter: string;
  pet: string;
  petType: string;
  shelter: string;
  adoptionStatus: "Active" | "Pending" | "Completed";
  shelterApproval: "Approved" | "Pending";
  adminApproval?: "Approved";
}

const adoptionRequests: AdoptionRequest[] = [
  {
    id: "ADO-001",
    adopter: "Emily Chan",
    pet: "Buddy",
    petType: "Dog",
    shelter: "Happy Paws",
    adoptionStatus: "Active",
    shelterApproval: "Approved",
    adminApproval: "Approved",
  },
  {
    id: "ADO-002",
    adopter: "Michale Chen",
    pet: "Luna",
    petType: "Cat",
    shelter: "Bondhu",
    adoptionStatus: "Active",
    shelterApproval: "Approved",
    adminApproval: "Approved",
  },
  {
    id: "ADO-003",
    adopter: "Jessica Brown",
    pet: "Max",
    petType: "Dog",
    shelter: "Chhaya",
    adoptionStatus: "Pending",
    shelterApproval: "Pending",
    adminApproval: "Approved",
  },
  {
    id: "ADO-004",
    adopter: "David Brown",
    pet: "Tweety",
    petType: "Bird",
    shelter: "The Gentle Nest",
    adoptionStatus: "Completed",
    shelterApproval: "Approved",
  },
  {
    id: "ADO-005",
    adopter: "Emily Thompson",
    pet: "Tony",
    petType: "Rabbit",
    shelter: "Happy Tails Rescue Homes",
    adoptionStatus: "Active",
    shelterApproval: "Approved",
    adminApproval: "Approved",
  },
];

const AdoptionRequestsTable: React.FC = () => {
  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#0A303A]">
          Recent Adoption Requests
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

      {/* Table Wrapper */}
      <div className="w-full overflow-x-auto rounded-[20px]">
        <table className="w-full min-w-[1100px] border-collapse overflow-hidden">
          {/* ================= HEADER ================= */}
          <thead>
            <tr className="bg-[#0A303A] text-white">
              <th className="px-4 py-5 text-left text-base sm:text-lg font-semibold">
                Adopter
              </th>

              <th className="px-4 py-5 text-left text-base sm:text-lg font-semibold">
                Pet
              </th>

              <th className="px-4 py-5 text-left text-base sm:text-lg font-semibold">
                Shelter
              </th>

              <th className="px-4 py-5 text-left text-base sm:text-lg font-semibold">
                Adoption Status
              </th>

              <th className="px-4 py-5 text-left text-base sm:text-lg font-semibold">
                Shelter Approval
              </th>

              <th className="px-4 py-5 text-left text-base sm:text-lg font-semibold">
                Admin Approval
              </th>
            </tr>
          </thead>

          {/* ================= BODY ================= */}
          <tbody>
            {adoptionRequests.map((request, index) => (
              <tr
                key={request.id}
                className={`
                  transition-colors
                  ${index % 2 === 0 ? "bg-[#DCECF0]" : "bg-[#F5F8F9]"}
                `}
              >
                {/* Adopter */}
                <td className="px-4 py-5">
                  <div className="flex flex-col">
                    <span className="font-semibold text-[#111]">
                      {request.adopter}
                    </span>

                    <span className="text-sm text-gray-500 mt-1">
                      {request.id}
                    </span>
                  </div>
                </td>

                {/* Pet */}
                <td className="px-4 py-5">
                  <span className="font-medium text-[#111]">{request.pet}</span>

                  <span className="text-sm text-gray-500">
                    ({request.petType})
                  </span>
                </td>

                {/* Shelter */}
                <td className="px-4 py-5">
                  <span className="text-gray-500">{request.shelter}</span>
                </td>

                {/* Adoption Status */}
                <td className="px-4 py-5">
                  <StatusBadge status={request.adoptionStatus} />
                </td>

                {/* Shelter Approval */}
                <td className="px-4 py-5">
                  <StatusBadge status={request.shelterApproval} />
                </td>

                {/* Admin Approval */}
                <td className="px-4 py-5">
                  {request.adminApproval ? (
                    <div className="flex items-center gap-2">
                      <span
                        className="
                          inline-flex items-center
                          rounded-full
                          bg-[#FF493F]
                          px-3 py-1.5
                          text-sm
                          font-semibold
                          text-white
                        "
                      >
                        Approved
                      </span>

                      <button
                        type="button"
                        className="
                          rounded-full
                          border
                          border-[#0A303A]
                          px-3 py-1
                          text-sm
                          font-medium
                          text-[#0A303A]
                          hover:bg-[#0A303A]
                          hover:text-white
                          transition-colors
                          cursor-pointer
                        "
                      >
                        Reject
                      </button>

                      <button
                        type="button"
                        className="
                          ml-1
                          text-[#F04336]
                          text-sm
                          font-medium
                          underline
                          underline-offset-2
                          hover:text-[#0A303A]
                          cursor-pointer
                        "
                      >
                        View
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="
                        text-[#F04336]
                        text-sm
                        font-medium
                        underline
                        underline-offset-2
                        hover:text-[#0A303A]
                        cursor-pointer
                      "
                    >
                      View
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

/* =========================================
   STATUS BADGE
========================================= */

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyle = () => {
    switch (status) {
      case "Active":
        return "bg-[#9DDBEE] text-[#147995]";

      case "Pending":
        return "bg-[#FFE3A3] text-[#A67A00]";

      case "Completed":
        return "bg-[#A9E89C] text-[#187A0D]";

      case "Approved":
        return "bg-[#C2CDD0] text-[#3E4649]";

      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        whitespace-nowrap
        rounded-full
        px-3
        py-1
        text-sm
        font-semibold
        ${getStatusStyle()}
      `}
    >
      {status}
    </span>
  );
};

export default AdoptionRequestsTable;
