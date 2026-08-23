// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import {
    openPetEditDialog,
  setPetActiveFilter,
  setPetSearchQuery,
} from "../../store/slices/PetSlice";
import EditPetDialog from "../../components/EditPetDialog";

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  gender: string;
  weight: string;
  intakeDate: string;
  status: "Pending" | "Adopted" | "Rejected" | "Available";
  image: string;
}

export const petsData: Pet[] = [
  {
    id: "PET-001",
    name: "Buddy",
    species: "Dog",
    breed: "Golden Retriever",
    age: "1.5 Yrs",
    gender: "Male",
    weight: "22 Kg",
    intakeDate: "Jan 12, 2026",
    status: "Pending",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: "PET-002",
    name: "Luna",
    species: "Cat",
    breed: "Siamese",
    age: "1 Yr",
    gender: "Female",
    weight: "4 Kg",
    intakeDate: "Feb 03, 2026",
    status: "Adopted",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: "PET-003",
    name: "Max",
    species: "Dog",
    breed: "Labrador",
    age: "4 Yrs",
    gender: "Male",
    weight: "30 Kg",
    intakeDate: "Dec 28, 2025",
    status: "Pending",
    image:
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: "PET-004",
    name: "Celo",
    species: "Cat",
    breed: "Persian",
    age: "3 Yrs",
    gender: "Female",
    weight: "6 Kg",
    intakeDate: "Mar 05, 2026",
    status: "Rejected",
    image:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: "PET-005",
    name: "Rocky",
    species: "Dog",
    breed: "Beagle",
    age: "3 Yrs",
    gender: "Male",
    weight: "15 Kg",
    intakeDate: "Jan 20, 2026",
    status: "Adopted",
    image:
      "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: "PET-006",
    name: "Toni",
    species: "Dog",
    breed: "Pug",
    age: "1.5 Yrs",
    gender: "Male",
    weight: "12 Kg",
    intakeDate: "Feb 24, 2026",
    status: "Adopted",
    image:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: "PET-007",
    name: "Milo",
    species: "Dog",
    breed: "Husky",
    age: "2 Yrs",
    gender: "Male",
    weight: "22 Kg",
    intakeDate: "May 11, 2026",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: "PET-008",
    name: "Daisy",
    species: "Rabbit",
    breed: "Holland Lop",
    age: "1 Yr",
    gender: "Male",
    weight: "4 Kg",
    intakeDate: "Nov 08, 2025",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: "PET-009",
    name: "Bella",
    species: "Cat",
    breed: "Persian",
    age: "5 Yrs",
    gender: "Female",
    weight: "4.5 Kg",
    intakeDate: "Jan 22, 2026",
    status: "Pending",
    image:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=1000&auto=format&fit=crop&q=80",
  },
  {
    id: "PET-010",
    name: "Judo",
    species: "Dog",
    breed: "Corgi",
    age: "1.5 Yrs",
    gender: "Male",
    weight: "10 Kg",
    intakeDate: "Mar 17, 2026",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1612536057832-2ff7ead7819c?w=1000&auto=format&fit=crop&q=80",
  },
];

export default function AllPetsDashboard() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { activeFilter, searchQuery, editDialogOpen } = useAppSelector(
    (state) => state.pet,
  );

  const handleView = (id: string) => {
    navigate(`/admin/manage-pet/${id}`);
  };

  const getStatusBadge = (status: Pet["status"]) => {
    const styles: Record<Pet["status"], string> = {
      Pending: "bg-[#fef3c7] text-[#b45309]",
      Adopted: "bg-[#dcfce7] text-[#15803d]",
      Rejected: "bg-[#fee2e2] text-[#b91c1c]",
      Available: "bg-[#e2e8f0] text-[#475569]",
    };

    return (
      <span
        className={`${styles[status]} font-medium text-xs px-3 py-1 rounded-full`}
      >
        {status}
      </span>
    );
  };

  const filteredPets = petsData.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === "All Pets" ||
      (activeFilter === "Dogs" && pet.species === "Dog") ||
      (activeFilter === "Cats" && pet.species === "Cat") ||
      (activeFilter === "Rabbit" && pet.species === "Rabbit") ||
      (activeFilter === "Others" &&
        !["Dog", "Cat", "Rabbit"].includes(pet.species));

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex min-h-screen bg-[#ece6de] p-4 font-sans text-slate-800">
      <main className="flex-1 ml-4 flex flex-col gap-4">
        {/* ================= HEADER ================= */}

        <div className="bg-[#0b252b] text-white rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-md">
          <div>
            <h2 className="text-2xl font-bold">All Pets</h2>

            <p className="text-xs text-slate-400 mt-1">
              Track all pets in website
            </p>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Search */}

            <div className="relative flex-1 sm:w-80">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Search a pet name, pet ID..."
                value={searchQuery}
                onChange={(e) => dispatch(setPetSearchQuery(e.target.value))}
                className=" w-full pl-10 pr-4 py-2.5 bg-white text-slate-800 text-xs rounded-full focus:outline-none focus:ring-2 focus:ring-[#f04938] placeholder-slate-400
                "
              />
            </div>

            {/* Add Pet */}

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
                shadow-md
                transition-all
              "
            >
              Add New Pet 🐾
            </button>
          </div>
        </div>

        {/* ================= FILTERS ================= */}

        <div className="flex items-center gap-3 overflow-x-auto py-1">
          {[
            {
              label: "All Pets",
              count: 100,
            },
            {
              label: "Dogs",
              count: 50,
            },
            {
              label: "Cats",
              count: 23,
            },
            {
              label: "Rabbit",
              count: 15,
            },
            {
              label: "Others",
              count: 12,
            },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => dispatch(setPetActiveFilter(item.label))}
              className={`
                flex
                items-center
                gap-2
                px-4
                py-1.5
                rounded-full
                text-xs
                font-medium
                transition-all
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

        {/* ================= TABLE ================= */}

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/60 flex-1 flex flex-col justify-between">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-xs">
              <thead className="bg-[#0b252b] text-white">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Pet Name</th>

                  <th className="py-3.5 px-4 font-semibold">Species</th>

                  <th className="py-3.5 px-4 font-semibold">Breed</th>

                  <th className="py-3.5 px-4 font-semibold">Age</th>

                  <th className="py-3.5 px-4 font-semibold">Gender</th>

                  <th className="py-3.5 px-4 font-semibold">Weight</th>

                  <th className="py-3.5 px-4 font-semibold">Intake Date</th>

                  <th className="py-3.5 px-4 font-semibold">Status</th>

                  <th className="py-3.5 px-4 font-semibold text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {filteredPets.map((pet, index) => (
                  <tr
                    key={pet.id}
                    className={
                      index % 2 === 0
                        ? "bg-[#D5E6EB] hover:bg-slate-100/60"
                        : "bg-[#F7FAFB] hover:bg-slate-100/60"
                    }
                  >
                    {/* Pet */}

                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={pet.image}
                          alt={pet.name}
                          className="
                              w-9
                              h-9
                              rounded-full
                              object-cover
                              border
                              border-slate-200
                            "
                        />

                        <div>
                          <p className="font-bold text-slate-900 text-sm">
                            {pet.name}
                          </p>

                          <p className="text-[10px] text-slate-400">{pet.id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-2.5 px-4">{pet.species}</td>

                    <td className="py-2.5 px-4">{pet.breed}</td>

                    <td className="py-2.5 px-4">{pet.age}</td>

                    <td className="py-2.5 px-4">{pet.gender}</td>

                    <td className="py-2.5 px-4">{pet.weight}</td>

                    <td className="py-2.5 px-4">{pet.intakeDate}</td>

                    <td className="py-2.5 px-4">
                      {getStatusBadge(pet.status)}
                    </td>

                    {/* Actions */}

                    <td className="py-2.5 px-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* VIEW */}

                        <button
                          type="button"
                          onClick={() => handleView(pet.id)}
                          aria-label={`View ${pet.name}`}
                          className="
                              p-1.5
                              rounded-full
                              bg-cyan-100/70
                              text-cyan-700
                              hover:bg-cyan-200
                              transition-colors
                              cursor-pointer
                            "
                        >
                          <Eye size={14} />
                        </button>

                        {/* EDIT */}

                        <button
                          type="button"
                          onClick={() => dispatch(openPetEditDialog(pet))}
                            aria-label={`Edit ${pet.name}`}
                          className="
                              p-1.5
                              rounded-full
                              bg-slate-100
                              text-slate-600
                              hover:bg-slate-200
                              transition-colors
                            "
                        >
                          <Pencil size={14} />
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          className="
                              p-1.5
                              rounded-full
                              bg-slate-100
                              text-slate-600
                              hover:bg-red-100
                              hover:text-red-600
                              transition-colors
                            "
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

          {/* ================= PAGINATION ================= */}

          <div className="flex items-center justify-center gap-2 p-4 border-t border-slate-100 bg-white">
            <button
              type="button"
              className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              className="
                w-7
                h-7
                rounded-full
                bg-[#0b252b]
                text-white
                text-xs
                font-semibold
                flex
                items-center
                justify-center
              "
            >
              1
            </button>

            <button
              type="button"
              className="
                w-7
                h-7
                rounded-full
                text-slate-600
                hover:bg-slate-100
                text-xs
              "
            >
              2
            </button>

            <button
              type="button"
              className="
                w-7
                h-7
                rounded-full
                text-slate-600
                hover:bg-slate-100
                text-xs
              "
            >
              3
            </button>

            <span className="text-slate-400 text-xs px-1">...</span>

            <button
              type="button"
              className="
                w-7
                h-7
                rounded-full
                text-slate-600
                hover:bg-slate-100
                text-xs
              "
            >
              10
            </button>

            <button
              type="button"
              className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </main>
      {editDialogOpen && <EditPetDialog />}
    </div>
  );
}
