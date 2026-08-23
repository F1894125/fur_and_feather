// import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Eye,
  Pencil,
  Trash2,
  // ChevronLeft,
  // ChevronRight,
} from "lucide-react";

import { adoptersData, type Adopter } from "../../services/json/AdopterData";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import {
  openEditDialog,
  closeEditDialog,
  setActiveFilter,
  setSearchQuery,
  type Adopter as StoreAdopter,
} from "../../store/slices/adopterSlice";
import EditAdopterDialog from "../../components/EditAdopterDialog";

export default function AllAdoptersContent() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { editDialogOpen, selectedAdopter, activeFilter, searchQuery } =
    useAppSelector((state) => state.adopter);

  const handleView = (adopterId: string) => {
    navigate(`/admin/manage-adopter/${adopterId}`);
  };

  const getAdoptionStatusBadge = (status: Adopter["adoptionStatus"]) => {
    switch (status) {
      case "Active":
        return (
          <span className="bg-cyan-100 text-cyan-700 font-medium text-xs px-3 py-1 rounded-full">
            Active
          </span>
        );

      case "Pending":
        return (
          <span className="bg-[#fef3c7] text-[#b45309] font-medium text-xs px-3 py-1 rounded-full">
            Pending
          </span>
        );

      case "Completed":
        return (
          <span className="bg-[#bbf7d0] text-emerald-800 font-medium text-xs px-3 py-1 rounded-full">
            Completed
          </span>
        );
    }
  };

  const getApprovalBadge = (approval: Adopter["approval"]) => {
    switch (approval) {
      case "Approved":
        return (
          <span className="bg-[#cbd5e1] text-slate-800 font-medium text-xs px-3 py-1 rounded-full">
            Approved
          </span>
        );

      case "Pending":
        return (
          <span className="bg-[#fef3c7] text-[#b45309] font-medium text-xs px-3 py-1 rounded-full">
            Pending
          </span>
        );

      case "Rejected":
        return (
          <span className="bg-[#fee2e2] text-[#b91c1c] font-medium text-xs px-3 py-1 rounded-full">
            Rejected
          </span>
        );
    }
  };

  const filteredAdopters = adoptersData.filter((adopter) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      adopter.name.toLowerCase().includes(query) ||
      adopter.id.toLowerCase().includes(query) ||
      adopter.email.toLowerCase().includes(query);

    const matchesFilter =
      activeFilter === "All Adopters" ||
      (activeFilter === "Approved" && adopter.approval === "Approved") ||
      (activeFilter === "Pending" && adopter.approval === "Pending") ||
      (activeFilter === "Active" && adopter.adoptionStatus === "Active") ||
      (activeFilter === "Completed" && adopter.adoptionStatus === "Completed");

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 bg-[#ece6de] p-4 font-sans text-slate-800 flex flex-col gap-4">
      {/* HEADER */}

      <div className="bg-[#0b252b] text-white rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-md">
        <div>
          <h2 className="text-2xl font-bold">All Adopters</h2>

          <p className="text-xs text-slate-400 mt-1">
            Manage and view all adopters and their applications
          </p>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search adopter..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value),)}
              className="
                w-full
                pl-10
                pr-4
                py-2.5
                bg-white
                text-slate-800
                text-xs
                rounded-full
                focus:outline-none
                focus:ring-2
                focus:ring-[#f04938]
              "
            />
          </div>

          <button
            type="button"
            className="
              bg-[#f04938]
              hover:bg-[#d93b2b]
              text-white
              px-5
              py-2.5
              rounded-full
              text-xs
              font-semibold
              whitespace-nowrap
            "
          >
            Add New Adopter
          </button>
        </div>
      </div>

      {/* FILTERS */}

      <div className="flex items-center gap-3 overflow-x-auto py-1">
        {[
          {
            label: "All Adopters",
            count: 287,
          },
          {
            label: "Approved",
            count: 156,
          },
          {
            label: "Pending",
            count: 89,
          },
          {
            label: "Active",
            count: 42,
          },
          {
            label: "Completed",
            count: 67,
          },
        ].map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => dispatch(setActiveFilter(item.label),)}
            className={`
              flex
              items-center
              gap-2
              px-4
              py-1.5
              rounded-full
              text-xs
              font-medium
              whitespace-nowrap
              ${
                activeFilter === item.label
                  ? "bg-[#0b252b] text-white"
                  : "bg-white text-slate-700 hover:bg-slate-100"
              }
            `}
          >
            {item.label}

            <span
              className={`
                px-1.5
                py-0.5
                rounded-full
                text-[10px]
                ${
                  activeFilter === item.label
                    ? "bg-cyan-800/60 text-cyan-200"
                    : "bg-slate-100 text-slate-500"
                }
              `}
            >
              {item.count}
            </span>
          </button>
        ))}
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/60 flex-1">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-xs">
            <thead className="bg-[#0b252b] text-white">
              <tr>
                <th className="py-3.5 px-4">Adopter</th>

                <th className="py-3.5 px-4">Email</th>

                <th className="py-3.5 px-4">Phone</th>

                <th className="py-3.5 px-4">Location</th>

                <th className="py-3.5 px-4 text-center">Applications</th>

                <th className="py-3.5 px-4">Adoption Status</th>

                <th className="py-3.5 px-4">Approval</th>

                <th className="py-3.5 px-4">Last Active</th>

                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredAdopters.map((adopter, index) => (
                <tr
                  key={adopter.id}
                  className={index % 2 === 0 ? "bg-[#D5E6EB]" : "bg-[#F7FAFB]"}
                >
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-bold text-slate-900">{adopter.name}</p>

                      <p className="text-[10px] text-slate-400">{adopter.id}</p>
                    </div>
                  </td>

                  <td className="py-3 px-4">{adopter.email}</td>

                  <td className="py-3 px-4">{adopter.phone}</td>

                  <td className="py-3 px-4">{adopter.location}</td>

                  <td className="py-3 px-4 text-center">
                    <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 inline-flex items-center justify-center">
                      {adopter.applications}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    {getAdoptionStatusBadge(adopter.adoptionStatus)}
                  </td>

                  <td className="py-3 px-4">
                    {getApprovalBadge(adopter.approval)}
                  </td>

                  <td className="py-3 px-4">{adopter.lastActive}</td>

                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* VIEW */}

                      <button
                        type="button"
                        onClick={() => handleView(adopter.id)}
                        className="
                            p-1.5
                            rounded-full
                            bg-cyan-100/70
                            text-cyan-700
                            hover:bg-cyan-200
                            transition-colors
                            cursor-pointer
                          "
                        aria-label={`View ${adopter.name}`}
                      >
                        <Eye size={14} />
                      </button>

                      {/* EDIT */}

                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            openEditDialog(adopter as unknown as StoreAdopter),
                          )
                        }
                        className="
                                p-1.5
                                rounded-full
                                bg-slate-100
                                text-slate-600
                                hover:bg-slate-200
                                transition-colors
                                cursor-pointer
                              "
                        aria-label={`Edit ${adopter.name}`}
                      >
                        <Pencil size={14} />
                      </button>

                      {/* DELETE */}

                      <button
                        type="button"
                        className="p-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {editDialogOpen && selectedAdopter && (
        <EditAdopterDialog
          adopter={selectedAdopter}
          onClose={() => dispatch(closeEditDialog())}
        />
      )}
    </div>
  );
}
