// import React from 'react';
import {
  ChevronLeft,
  Pencil,
  Trash2,
  Calendar,
  FileText,
  FileCheck,
  Heart,
  PawPrint,
//   Clock,
//   ShieldCheck,
//   Building,
//   User,
//   Mail,
//   Phone,
//   Globe,
//   MapPin,
//   CheckCircle2
} from 'lucide-react';

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  listedDate: string;
  applications: number;
  status: 'Pending' | 'Adopted' | 'Rejected';
  image: string;
}

const currentPets: Pet[] = [
  { id: 'PET-001', name: 'Buddy', species: 'Dog', breed: 'Golden Retriever', age: '1.5 Yrs', listedDate: 'Jan 12, 2026', applications: 3, status: 'Pending', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100&auto=format&fit=crop&q=80' },
  { id: 'PET-002', name: 'Luna', species: 'Cat', breed: 'Siamese', age: '1.Yr', listedDate: 'Feb 04, 2026', applications: 2, status: 'Adopted', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&auto=format&fit=crop&q=80' },
  { id: 'PET-003', name: 'Max', species: 'Dog', breed: 'Labrador', age: '4 Yrs', listedDate: 'Dec 28, 2025', applications: 1, status: 'Pending', image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=100&auto=format&fit=crop&q=80' },
  { id: 'PET-004', name: 'Celo', species: 'Cat', breed: 'Persian', age: '3 Yrs', listedDate: 'Mar 05, 2026', applications: 4, status: 'Rejected', image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=100&auto=format&fit=crop&q=80' },
  { id: 'PET-005', name: 'Rocky', species: 'Dog', breed: 'Beagle', age: '3 Yrs', listedDate: 'Jan 20, 2026', applications: 2, status: 'Adopted', image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=100&auto=format&fit=crop&q=80' },
];

const galleryImages = [
  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600&auto=format&fit=crop&q=80',
];

export default function ShelterDetailsContent() {
  const getStatusBadge = (status: Pet['status']) => {
    switch (status) {
      case 'Pending':
        return <span className="bg-[#fef3c7] text-[#b45309] font-medium text-[11px] px-3 py-1 rounded-full">Pending</span>;
      case 'Adopted':
        return <span className="bg-[#dcfce7] text-[#15803d] font-medium text-[11px] px-3 py-1 rounded-full">Adopted</span>;
      case 'Rejected':
        return <span className="bg-[#fee2e2] text-[#b91c1c] font-medium text-[11px] px-3 py-1 rounded-full">Rejected</span>;
    }
  };

  return (
    <div className="flex-1 bg-[#ece6de] p-4 font-sans text-slate-800 space-y-5">
      {/* Header Bar */}
      <div className="bg-[#0b252b] text-white rounded-2xl px-6 py-4 flex items-center justify-between shadow-md">
        <button className="flex items-center gap-2 text-lg font-bold hover:text-slate-200 transition-colors">
          <ChevronLeft size={22} />
          Back to All Shelters
        </button>

        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-full bg-slate-400/30 hover:bg-slate-400/50 text-white transition-colors">
            <Pencil size={18} />
          </button>
          <button className="p-2.5 rounded-full bg-[#f04938] hover:bg-[#d93b2b] text-white transition-colors">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Shelter Profile Header Card */}
      <div className="bg-[#d9e6eb] p-6 rounded-2xl flex items-center gap-6 shadow-sm">
        <div className="w-24 h-24 bg-white rounded-2xl p-2 flex flex-col items-center justify-center border border-slate-200 shadow-xs shrink-0">
          <div className="text-emerald-700 font-extrabold text-xs text-center leading-tight">
            <span className="text-2xl">🐶🐱</span>
            <p className="mt-1 text-[11px]">Paw Friends</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Paw Friends</h1>
            <span className="bg-[#dcfce7] text-[#15803d] font-semibold text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
              Verified
            </span>
            <span className="text-xs text-slate-500 font-medium">Kolkata, WB</span>
          </div>

          <div className="flex items-center gap-8 pt-1 text-xs">
            <div>
              <p className="text-slate-500 font-medium">Active Pets</p>
              <p className="text-base font-bold text-slate-900">42</p>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Shelter Capacity</p>
              <p className="text-base font-bold text-slate-900">100</p>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Member Since</p>
              <p className="text-base font-bold text-slate-900">Jan 15, 2021</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="space-y-2">
        <h2 className="font-bold text-slate-900 text-sm">Quick Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Metric 1 */}
          <div className="bg-[#d9e6eb] p-4 rounded-2xl relative flex flex-col justify-between h-28">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-[#bbf7d0] text-emerald-800 rounded-lg">
                <PawPrint size={18} />
              </div>
              <span className="bg-[#bbf7d0] text-emerald-800 font-semibold text-[10px] px-2 py-0.5 rounded-full">
                +3 vs Last Month
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">42</p>
              <p className="text-xs text-slate-500 font-medium">Active Pets</p>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-[#d9e6eb] p-4 rounded-2xl relative flex flex-col justify-between h-28">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-[#bbf7d0] text-emerald-800 rounded-lg">
                <Heart size={18} />
              </div>
              <span className="bg-[#bbf7d0] text-emerald-800 font-semibold text-[10px] px-2 py-0.5 rounded-full">
                +2 vs Last Month
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">8</p>
              <p className="text-xs text-slate-500 font-medium">Adoptions This Month</p>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-[#d9e6eb] p-4 rounded-2xl relative flex flex-col justify-between h-28">
            <div className="p-2 bg-[#bbf7d0] text-emerald-800 rounded-lg w-fit">
              <Heart size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">128</p>
              <p className="text-xs text-slate-500 font-medium">Successful Adoptions</p>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="bg-[#d9e6eb] p-4 rounded-2xl relative flex flex-col justify-between h-28">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-[#bbf7d0] text-emerald-800 rounded-lg">
                <FileText size={18} />
              </div>
              <span className="bg-[#fecdd3] text-rose-800 font-semibold text-[10px] px-2 py-0.5 rounded-full">
                +1 vs Last Month
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">14</p>
              <p className="text-xs text-slate-500 font-medium">Pending Application</p>
            </div>
          </div>

          {/* Metric 5 */}
          <div className="bg-[#d9e6eb] p-4 rounded-2xl relative flex flex-col justify-between h-28">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-[#bbf7d0] text-emerald-800 rounded-lg">
                <FileCheck size={18} />
              </div>
              <span className="bg-[#bbf7d0] text-emerald-800 font-semibold text-[10px] px-2 py-0.5 rounded-full">
                +2 vs Last Month
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">8</p>
              <p className="text-xs text-slate-500 font-medium">Rejected Application</p>
            </div>
          </div>

          {/* Metric 6 */}
          <div className="bg-[#d9e6eb] p-4 rounded-2xl relative flex flex-col justify-between h-28">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-[#bbf7d0] text-emerald-800 rounded-lg">
                <Calendar size={18} />
              </div>
              <span className="bg-[#fecdd3] text-rose-800 font-semibold text-[10px] px-2 py-0.5 rounded-full">
                -1 vs Last Month
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">24</p>
              <p className="text-xs text-slate-500 font-medium">Average Stay(days)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Shelter Information Section */}
      <div className="space-y-2">
        <h2 className="font-bold text-slate-900 text-sm">Shelter Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Contact Information */}
          <div className="bg-[#d9e6eb] p-5 rounded-2xl space-y-3">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-300/60 pb-2">Contact Information</h3>
            <div className="space-y-2.5 text-xs">
              <div>
                <p className="text-slate-500 font-medium">Manager Name</p>
                <p className="font-bold text-slate-900">Pijush Pal</p>
              </div>
              <div>
                <p className="text-slate-500 font-medium">Email Address</p>
                <p className="font-bold text-slate-900">happypaws@email.com</p>
              </div>
              <div>
                <p className="text-slate-500 font-medium">Phone Number</p>
                <p className="font-bold text-slate-900">+91-8682659532</p>
              </div>
              <div>
                <p className="text-slate-500 font-medium">Website</p>
                <p className="font-bold text-slate-900">happypaws.com</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-[#d9e6eb] p-5 rounded-2xl space-y-3">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-300/60 pb-2">Location</h3>
            <div className="space-y-2.5 text-xs">
              <div>
                <p className="text-slate-500 font-medium">Address</p>
                <p className="font-bold text-slate-900 leading-snug">
                  1, Netaji Subhas Road, Hare Street, Kolkata, West Bengal 700001
                </p>
              </div>
              <div>
                <p className="text-slate-500 font-medium">Country</p>
                <p className="font-bold text-slate-900">India</p>
              </div>
              <div>
                <p className="text-slate-500 font-medium">Time Zone</p>
                <p className="font-bold text-slate-900">India Standard Time (IST)</p>
              </div>
            </div>
          </div>

          {/* Operational Details */}
          <div className="bg-[#d9e6eb] p-5 rounded-2xl space-y-3">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-300/60 pb-2">Operational Details</h3>
            <div className="space-y-2.5 text-xs">
              <div>
                <p className="text-slate-500 font-medium">Founded</p>
                <p className="font-bold text-slate-900">Jan 25, 2020</p>
              </div>
              <div>
                <p className="text-slate-500 font-medium">License Number</p>
                <p className="font-bold text-slate-900">PAWS-TX-002178</p>
              </div>
              <div>
                <p className="text-slate-500 font-medium">Type</p>
                <p className="font-bold text-slate-900">NGO</p>
              </div>
              <div>
                <p className="text-slate-500 font-medium">Capacity</p>
                <p className="font-bold text-slate-900">100</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Pets Table */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-slate-900 text-sm">Current Pets</h2>
          <button className="text-xs text-slate-600 hover:text-slate-900 underline font-medium">View All</button>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-slate-200/60">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0b252b] text-white font-medium">
                <tr>
                  <th className="py-3 px-4 font-semibold">Pet Name</th>
                  <th className="py-3 px-4 font-semibold">Species</th>
                  <th className="py-3 px-4 font-semibold">Breed</th>
                  <th className="py-3 px-4 font-semibold">Age</th>
                  <th className="py-3 px-4 font-semibold">Listed</th>
                  <th className="py-3 px-4 font-semibold">Applications</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {currentPets.map((pet, idx) => (
                  <tr key={pet.id} className={idx % 2 === 0 ? 'bg-[#f8fafc]/60' : 'bg-white'}>
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-3">
                        <img src={pet.image} alt={pet.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="font-bold text-slate-900 text-xs">{pet.name}</p>
                          <p className="text-[10px] text-slate-400 font-normal">{pet.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-4">{pet.species}</td>
                    <td className="py-2.5 px-4">{pet.breed}</td>
                    <td className="py-2.5 px-4">{pet.age}</td>
                    <td className="py-2.5 px-4">{pet.listedDate}</td>
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-1">
                        <FileText size={13} className="text-slate-400" />
                        <span>{pet.applications}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-4">{getStatusBadge(pet.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Photo Gallery Grid */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-slate-900 text-sm">Photo Gallery</h2>
          <button className="text-xs text-slate-600 hover:text-slate-900 underline font-medium">View All</button>
        </div>

        <div className="space-y-3">
          {/* Row 1: 2 large wide images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="h-56 rounded-2xl overflow-hidden shadow-xs">
              <img src={galleryImages[0]} alt="Gallery 1" className="w-full h-full object-cover" />
            </div>
            <div className="h-56 rounded-2xl overflow-hidden shadow-xs">
              <img src={galleryImages[1]} alt="Gallery 2" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Row 2: 3 images */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="h-44 rounded-2xl overflow-hidden shadow-xs">
              <img src={galleryImages[2]} alt="Gallery 3" className="w-full h-full object-cover" />
            </div>
            <div className="h-44 rounded-2xl overflow-hidden shadow-xs">
              <img src={galleryImages[3]} alt="Gallery 4" className="w-full h-full object-cover" />
            </div>
            <div className="h-44 rounded-2xl overflow-hidden shadow-xs">
              <img src={galleryImages[4]} alt="Gallery 5" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Row 3: 3 images */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="h-44 rounded-2xl overflow-hidden shadow-xs">
              <img src={galleryImages[5]} alt="Gallery 6" className="w-full h-full object-cover" />
            </div>
            <div className="h-44 rounded-2xl overflow-hidden shadow-xs">
              <img src={galleryImages[6]} alt="Gallery 7" className="w-full h-full object-cover" />
            </div>
            <div className="h-44 rounded-2xl overflow-hidden shadow-xs">
              <img src={galleryImages[7]} alt="Gallery 8" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}