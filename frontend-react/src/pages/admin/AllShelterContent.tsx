import { useState } from "react";
import {
  Search,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Shelter {
  id: string;
  name: string;
  subLocation: string;
  managerName: string;
  location: string;
  activePets: number;
  adoptions: number;
  status: "Verified" | "Pending" | "Under Review";
  joinedDate: string;
}

const sheltersData: Shelter[] = [
  {
    id: "SHL-001",
    name: "Paw Friends",
    subLocation: "Kolkata, WB",
    managerName: "Pijush Pal",
    location: "Kolkata, WB",
    activePets: 42,
    adoptions: 128,
    status: "Verified",
    joinedDate: "Jan 15, 2021",
  },
  {
    id: "SHL-002",
    name: "Maple Tails Rescue",
    subLocation: "Baner, Pune",
    managerName: "Rohan Yogi",
    location: "Baner, Pune",
    activePets: 35,
    adoptions: 104,
    status: "Verified",
    joinedDate: "May 25, 2024",
  },
  {
    id: "SHL-003",
    name: "The Nest & Nook Sanctuary",
    subLocation: "Jubilee Hills, Hyderabad",
    managerName: "Osman Sagar",
    location: "Jubilee Hills, Hyderabad",
    activePets: 58,
    adoptions: 98,
    status: "Verified",
    joinedDate: "Aug 18, 2023",
  },
  {
    id: "SHL-004",
    name: "Happy Tails Rescue Home",
    subLocation: "Banjara Hills, Hyderabad",
    managerName: "J. Sai. Deepak",
    location: "Banjara Hills, Hyderabad",
    activePets: 29,
    adoptions: 87,
    status: "Pending",
    joinedDate: "Apr 08, 2026",
  },
  {
    id: "SHL-005",
    name: "Golden Paws Rescue Home",
    subLocation: "Andheri West, Mumbai",
    managerName: "Kumaresh Das",
    location: "Andheri West, Mumbai",
    activePets: 24,
    adoptions: 65,
    status: "Verified",
    joinedDate: "Apr 30, 2024",
  },
  {
    id: "SHL-006",
    name: "Bondhu",
    subLocation: "Barasat, WB",
    managerName: "Anirban Roy",
    location: "Barasat, WB",
    activePets: 31,
    adoptions: 72,
    status: "Verified",
    joinedDate: "Nov 24, 2023",
  },
  {
    id: "SHL-007",
    name: "Bloom & Bark Shelter",
    subLocation: "Sector 29, Gurugram",
    managerName: "Kakoli Mondal",
    location: "Sector 29, Gurugram",
    activePets: 65,
    adoptions: 98,
    status: "Under Review",
    joinedDate: "Mar 23, 2026",
  },
  {
    id: "SHL-008",
    name: "Chhaya",
    subLocation: "Kolkata, WB",
    managerName: "Palash Karmakar",
    location: "Kolkata, WB",
    activePets: 98,
    adoptions: 150,
    status: "Verified",
    joinedDate: "Jul 26, 2022",
  },
  {
    id: "SHL-009",
    name: "The Gentel Nest",
    subLocation: "Saltlake, Kolkata",
    managerName: "Kuntal Poddar",
    location: "Saltlake, Kolkata",
    activePets: 32,
    adoptions: 52,
    status: "Pending",
    joinedDate: "Jan 20, 2026",
  },
  {
    id: "SHL-010",
    name: "People for Animals",
    subLocation: "Kolkata, WB",
    managerName: "Anirban Roy",
    location: "Barasat, WB",
    activePets: 31,
    adoptions: 72,
    status: "Verified",
    joinedDate: "Nov 24, 2023",
  },
];

export default function AllSheltersContent() {
  const [activeFilter, setActiveFilter] = useState("All Shelters");
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusBadge = (status: Shelter["status"]) => {
    switch (status) {
      case "Verified":
        return (
          <span className="bg-[#bbf7d0] text-emerald-900 font-semibold text-xs px-3 py-1 rounded-full">
            Verified
          </span>
        );
      case "Pending":
        return (
          <span className="bg-[#fef3c7] text-[#b45309] font-semibold text-xs px-3 py-1 rounded-full">
            Pending
          </span>
        );
      case "Under Review":
        return (
          <span className="bg-[#cbd5e1] text-slate-800 font-semibold text-xs px-3 py-1 rounded-full">
            Under Review
          </span>
        );
    }
  };

  return (
    <div className="flex-1 bg-[#ece6de] p-4 font-sans text-slate-800 flex flex-col gap-4">
      {/* Top Header Banner */}
      <div className="bg-[#0b252b] text-white rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-md">
        <div>
          <h2 className="text-2xl font-bold">All Shelters</h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage and view all shelters
          </p>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search a pet name , pet ID or adopter.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white text-slate-800 text-xs rounded-full focus:outline-none focus:ring-2 focus:ring-[#f04938] placeholder-slate-400"
            />
          </div>

          {/* Add New Button */}
          <button className="bg-[#f04938] hover:bg-[#d93b2b] text-white px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 whitespace-nowrap shadow-md transition-all">
            Add New Pet 🐾
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-3 overflow-x-auto py-1">
        {[
          { label: "All Shelters", count: 90 },
          { label: "Verified", count: 80 },
          { label: "Pending", count: 8 },
          { label: "Under Review", count: 2 },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveFilter(item.label)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeFilter === item.label
                ? "bg-[#0b252b] text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {item.label}
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                activeFilter === item.label
                  ? "bg-cyan-800/60 text-cyan-200"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {item.count}
            </span>
          </button>
        ))}
      </div>

      {/* Shelters Table Container */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-slate-200/60 flex-1 flex flex-col justify-between">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            {/* Table Header */}
            <thead className="bg-[#0b252b] text-white font-medium border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Shelter Name</th>
                <th className="py-3.5 px-4 font-semibold">Manager Name</th>
                <th className="py-3.5 px-4 font-semibold">Location</th>
                <th className="py-3.5 px-4 font-semibold text-center">
                  Active Pets
                </th>
                <th className="py-3.5 px-4 font-semibold text-center">
                  Adoptions
                </th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold">Joined</th>
                <th className="py-3.5 px-4 font-semibold text-center">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table Rows */}
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {sheltersData.map((shelter, idx) => (
                <tr
                  key={shelter.id}
                  className={
                    idx % 2 === 0
                      ? "bg-[#D5E6EB] hover:bg-slate-100/60"
                      : "bg-[#F7FAFB] hover:bg-slate-100/60"
                  }
                >
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-bold text-slate-900 text-xs">
                        {shelter.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-normal">
                        {shelter.subLocation}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4">{shelter.managerName}</td>
                  <td className="py-3 px-4">{shelter.location}</td>
                  <td className="py-3 px-4 text-center font-bold text-slate-900">
                    {shelter.activePets}
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-slate-900">
                    {shelter.adoptions}
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(shelter.status)}
                  </td>
                  <td className="py-3 px-4">{shelter.joinedDate}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 rounded-full bg-cyan-100/70 text-cyan-700 hover:bg-cyan-200 transition-colors">
                        <Eye size={14} />
                      </button>
                      <button className="p-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                        <Pencil size={14} />
                      </button>
                      <button className="p-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-600 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-center gap-2 p-4 border-t border-slate-100 bg-white">
          <button className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
            <ChevronLeft size={16} />
          </button>
          <button className="w-7 h-7 rounded-full bg-[#0b252b] text-white text-xs font-semibold flex items-center justify-center shadow-xs">
            1
          </button>
          <button className="w-7 h-7 rounded-full text-slate-600 hover:bg-slate-100 text-xs font-medium flex items-center justify-center">
            2
          </button>
          <button className="w-7 h-7 rounded-full text-slate-600 hover:bg-slate-100 text-xs font-medium flex items-center justify-center">
            3
          </button>
          <span className="text-slate-400 text-xs px-1">...</span>
          <button className="w-7 h-7 rounded-full text-slate-600 hover:bg-slate-100 text-xs font-medium flex items-center justify-center">
            9
          </button>
          <button className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
