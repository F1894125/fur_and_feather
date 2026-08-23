import React, { useState } from "react";
import { getImageUrl } from "../../utils/getImageUrl";
// Types
interface PetCardProps {
  id: string;
  name: string;
  breed: string;
  gender: string;
  likes: string;
  imageUrl: string;
}

interface PetCategorySectionProps {
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix?: string;
  description: string;
  pets: PetCardProps[];
}

// Icons
export const PawIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="500" height="500">
  <g fill="#ffffff">
   
    <ellipse cx="16" cy="38" rx="6.5" ry="9.5" transform="rotate(-32 16 38)" />
  
    <ellipse cx="38" cy="21" rx="8" ry="12" transform="rotate(-12 38 21)" />

    <ellipse cx="62" cy="21" rx="8" ry="12" transform="rotate(12 62 21)" />
  
    <ellipse cx="84" cy="38" rx="6.5" ry="9.5" transform="rotate(32 84 38)" />
  </g>

  <path d="M 24 64 C 24 45, 36 38, 50 38 C 64 38, 76 45, 76 64 C 76 76, 68 82, 50 73 C 32 82, 24 76, 24 64 Z" 
        fill="none" stroke="#ffffff" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>
);

const HeartIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const SearchMinusIcon = ({
  className = "w-3.5 h-3.5",
}: {
  className?: string;
}) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
    />
  </svg>
);

// Reusable Wave Divider Components
// const WaveTopHero = () => (
//   <div className="w-full overflow-hidden leading-none bg-[#F4F1EA]">
//     <svg
//       className="relative block w-full h-8 text-[#D5E6EB]"
//       viewBox="0 0 1200 120"
//       preserveAspectRatio="none"
//     >
//       <path
//         d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z"
//         fill="currentColor"
//       ></path>
//     </svg>
//   </div>
// );

const WaveBottomHero = () => (
  <div className="w-full overflow-hidden leading-none bg-[#D5E6EB]">
    <svg
      className="relative block w-full h-8 text-[#F4F1EA]"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z"
        fill="currentColor"
      ></path>
    </svg>
  </div>
);

const WaveBottomFooter = () => (
  <div className="w-full overflow-hidden leading-none bg-[#F4F1EA]">
    <svg
      className="relative block w-full h-8 text-[#0A303A]"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z"
        fill="currentColor"
      ></path>
    </svg>
  </div>
);

// Reusable Pet Card Component
const PetCard: React.FC<PetCardProps> = ({
  name,
  breed,
  gender,
  likes,
  imageUrl,
}) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-[#EAE6DD] border border-[#0A303A] rounded-2xl p-3 relative group transition-transform duration-200 hover:-translate-y-1">
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-3">
        <img
          src={imageUrl}
          alt={`${name} ${breed}`}
          className="w-full h-full object-cover"
        />

        {/* Action icons */}
        <div className="absolute top-2.5 right-2.5 flex gap-1.5">
          <button className="w-7 h-7 rounded-full bg-white/80 border border-[#0A303A] flex items-center justify-center text-[#0A303A] hover:bg-white">
            <SearchMinusIcon />
          </button>
          <button
            onClick={() => setLiked(!liked)}
            className="w-7 h-7 rounded-full bg-white/80 border border-[#0A303A] flex items-center justify-center text-[#0A303A] hover:bg-white"
          >
            <HeartIcon
              className={`w-3.5 h-3.5 ${liked ? "fill-[#F04336] text-[#F04336]" : ""}`}
            />
          </button>
        </div>

        {/* Likes badge */}
        <div className="absolute bottom-2.5 left-2.5 bg-black/60 text-white text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-sm">
          <span className="text-[#F04336]">♥</span> ({likes})
        </div>
      </div>

      <div className="px-1">
        <h4 className="font-bold text-sm text-[#0A303A]">
          {name} ({breed})
        </h4>
        <p className="text-xs text-[#526E75] mt-0.5">{gender}</p>
      </div>
    </div>
  );
};

// Reusable Pet Section Component
const PetCategorySection: React.FC<PetCategorySectionProps> = ({
  titlePrefix,
  titleHighlight,
  titleSuffix = "",
  description,
  pets,
}) => (
  <section className="max-w-6xl mx-auto px-4 md:px-6 mb-16">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A303A]">
          {titlePrefix} <span className="text-[#F04336]">{titleHighlight}</span>{" "}
          <br />
          {titleSuffix}
        </h2>
      </div>
      <p className="text-xs text-[#526E75] max-w-md">{description}</p>
      <div className="flex gap-2">
        <button className="w-9 h-9 rounded-lg border border-[#0A303A] flex items-center justify-center text-[#0A303A] hover:bg-white/50">
          ⚙️
        </button>
        <button className="w-9 h-9 rounded-lg border border-[#0A303A] flex items-center justify-center text-[#0A303A] hover:bg-white/50">
          ⇅
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {pets.map((pet) => (
        <PetCard key={pet.id} {...pet} />
      ))}
    </div>

    <div className="text-center">
      <button className="bg-[#EAE6DD] border border-[#0A303A] px-6 py-2 rounded-full text-xs font-semibold text-[#0A303A] inline-flex items-center gap-2 hover:bg-[#ded9cd] transition">
        Explore More <PawIcon />
      </button>
    </div>
  </section>
);

// Main Component
export const PetAdoptionPage: React.FC = () => {
  const dogPets: PetCardProps[] = Array(3)
    .fill({
      id: "dog-1",
      name: "Max",
      breed: "Labrador",
      gender: "Male",
      likes: "12k+",
      imageUrl:
        "https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&q=80&w=400",
    })
    .map((item, idx) => ({ ...item, id: `dog-${idx}` }));

  const birdPets: PetCardProps[] = Array(3)
    .fill({
      id: "bird-1",
      name: "Rio",
      breed: "Lovebird",
      gender: "Female",
      likes: "12k+",
      imageUrl:
        "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&q=80&w=400",
    })
    .map((item, idx) => ({ ...item, id: `bird-${idx}` }));

  const catPets: PetCardProps[] = Array(3)
    .fill({
      id: "cat-1",
      name: "Luna",
      breed: "Persian Cat",
      gender: "Female",
      likes: "12k+",
      imageUrl:
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400",
    })
    .map((item, idx) => ({ ...item, id: `cat-${idx}` }));

  const rabbitPets: PetCardProps[] = Array(3)
    .fill({
      id: "rabbit-1",
      name: "Snowy",
      breed: "White Rabbit",
      gender: "Male",
      likes: "12k+",
      imageUrl:
        "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=400",
    })
    .map((item, idx) => ({ ...item, id: `rabbit-${idx}` }));

  const hamsterPets: PetCardProps[] = Array(3)
    .fill({
      id: "hamster-1",
      name: "Bii",
      breed: "Syrian Hamster",
      gender: "Male",
      likes: "12k+",
      imageUrl:
        "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&q=80&w=400",
    })
    .map((item, idx) => ({ ...item, id: `hamster-${idx}` }));

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#0A303A] font-sans">
      {/* Hero Section */}
      {/* <WaveTopHero /> */}
      <section className="bg-[#D5E6EB] py-10 px-4 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Dog Profile Image */}
          <div className="relative w-full max-w-sm">
            <img
              src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=600"
              alt="Buddy Golden Retriever"
              className="w-full h-[380px] object-cover rounded-t-full rounded-b-2xl border-2 border-[#0A303A]"
            />
            {/* Buddy Badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] bg-[#111] text-white p-4 rounded-xl text-xs space-y-1 shadow-xl border border-white/20">
              <div className="flex justify-between">
                <span className="text-gray-400">NAME:</span>{" "}
                <strong>BUDDY</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">WEIGHT:</span>{" "}
                <strong>22 KG</strong>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-gray-400">PERSONALITY:</span>{" "}
                <strong>FRIENDLY, PLAYFUL, LOYAL</strong>
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="flex-1 text-center lg:text-left mt-6 lg:mt-0">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-md leading-tight mb-4">
              Every Pet Has a Story
            </h1>
            <div className="inline-flex items-center gap-2 bg-white/40 px-5 py-2 rounded-full text-xs font-bold text-[#0A303A] mb-8">
              <PawIcon className="w-4 h-4 text-[#F04336]" /> Find your perfect
              companion today!
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { icon: "🏠", label: "Rescued with Love" },
                { icon: "🩺", label: "Checked with Care" },
                { icon: "🍲", label: "Fed with Nutrition" },
                { icon: "❤️", label: "Given a Second Chance" },
              ].map((feat, i) => (
                <div
                  key={i}
                  className="bg-white/20 border border-[#0A303A]/30 rounded-xl p-3 text-center text-[11px] font-semibold text-[#0A303A]"
                >
                  <span className="text-xl block mb-1">{feat.icon}</span>
                  {feat.label}
                </div>
              ))}
            </div>

            <button className="bg-white border-2 border-[#0A303A] text-[#0A303A] px-8 py-3 rounded-full font-bold text-sm inline-flex items-center gap-3 shadow-[3px_3px_0px_#0A303A] hover:translate-y-0.5 transition">
              <PawIcon /> Adopt. Love. Change a Life. ♥
            </button>
          </div>
        </div>
      </section>
      <WaveBottomHero />

      {/* Categories */}
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold mb-8">Categories</h2>
        <div className="flex justify-center items-center gap-4 flex-wrap">
          {[
            "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=200",
            "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&q=80&w=200",
            "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200",
            "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=200",
          ].map((src, idx) => (
            <div
              key={idx}
              className="w-20 h-20 rounded-full bg-[#80C4D6] border-2 border-[#0A303A] overflow-hidden p-0.5 cursor-pointer hover:scale-105 transition"
            >
              <img
                src={src}
                alt="Category"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          ))}
          <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#0A303A] flex items-center justify-center text-xl font-bold cursor-pointer">
            +
          </div>
        </div>
      </section>

      {/* Gallery Collage */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-4">
            <img
              src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=400"
              className="w-full h-40 object-cover rounded-2xl border"
              alt="Care 1"
            />
            <img
              src="https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80&w=400"
              className="w-full h-40 object-cover rounded-2xl border"
              alt="Care 2"
            />
          </div>
          <div className="space-y-4">
            <img
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=400"
              className="w-full h-40 object-cover rounded-2xl border"
              alt="Care 3"
            />
            <img
              src="https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?auto=format&fit=crop&q=80&w=400"
              className="w-full h-40 object-cover rounded-2xl border"
              alt="Care 4"
            />
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=600"
              className="w-full h-[336px] object-cover rounded-2xl border"
              alt="Team"
            />
          </div>
        </div>
      </section>

      {/* Pet Listings */}
      <PetCategorySection
        titlePrefix="Loyal Hearts,"
        titleHighlight="Endless"
        titleSuffix="Adventures"
        description="Meet affectionate dogs ready to fill your days with loyalty, playful moments, and unconditional love."
        pets={dogPets}
      />

      <PetCategorySection
        titlePrefix="Let the"
        titleHighlight="Fun"
        titleSuffix="Take Flight"
        description="Colorful feathers, cheerful songs, and playful personalities—find a feathered friend who'll make every day brighter."
        pets={birdPets}
      />

      <PetCategorySection
        titlePrefix="Grace, Comfort &"
        titleHighlight="Gentle Purrs"
        description="Discover charming cats with unique personalities, ready to bring warmth, companionship, and peaceful moments into your home."
        pets={catPets}
      />

      {/* Promo Banner */}
      <section className="bg-[#D5E6EB] px-6 md:px-10 lg:px-20 mb-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg space-y-4">
            <h2 className="font-fredoka text-3xl md:text-5xl lg:text-6xl font-semibold text-[#0A303A] mb-14">
              Find the One Who Finds You.
            </h2>
            <p className="font-poppins text-xl text-[#526E75] leading-relaxed mb-20">
              At Fur & Feather, we make pet adoption simple, trusted, and full
              of heart. Browse adorable companions, connect with experts, book
              vet appointments, and shop everything your new best friend
              needs—all in one place.
            </p>
            <div className="flex gap-4 pt-2">
              <button className="bg-[#F04336] text-white px-6 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 hover:bg-[#d83a2f] transition">
                Adopt Now <PawIcon />
              </button>
              <button className="border border-[#0A303A] text-[#0A303A] px-6 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 hover:bg-white/40 transition">
                Meet Your Friend <PawIcon />
              </button>
            </div>
          </div>
          <img
            src={getImageUrl("finds-dog.png")}
            alt="Basenji Dog"
            className="max-w-sm w-full object-contain"
          />
        </div>
      </section>

      <PetCategorySection
        titlePrefix="Soft Hops,"
        titleHighlight="Sweet Hearts"
        description="Welcome gentle rabbits into your family and enjoy their playful spirit, quiet affection, and endless cuteness."
        pets={rabbitPets}
      />

      <PetCategorySection
        titlePrefix="Tiny Friends,"
        titleHighlight="Big Personalities"
        description="Find adorable hamsters that may be small in size but are full of curiosity, energy, and lovable charm."
        pets={hamsterPets}
      />

      {/* Newsletter */}
      <section className="max-w-3xl mx-auto px-4 mb-20">
        <div className="bg-[#EAE6DD] border border-[#0A303A] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-[#F04336]">Newsletter</h3>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-2 w-full sm:w-auto flex-1 max-w-md"
          >
            <input
              type="email"
              placeholder="Enter your E-mail ID"
              className="flex-1 px-4 py-2 text-xs bg-[#F8F6F0] border border-gray-300 rounded-lg outline-none focus:border-[#F04336]"
              required
            />
            <button
              type="submit"
              className="bg-[#F04336] text-white px-5 py-2 rounded-lg text-xs font-semibold hover:bg-[#d83a2f] transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <div>
        <WaveBottomFooter />
        <footer className="bg-[#0A303A] text-white pt-10 pb-6 px-6 md:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <PawIcon className="w-6 h-6 text-[#F04336]" />
                <div>
                  <h3 className="font-bold text-base">Fur & Feather</h3>
                  <p className="text-[9px] text-[#F04336]">
                    Find the One Who Finds You
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#A0B0B5] leading-relaxed">
                Some companions don't just enter your life. They become a part
                of who you are—through every ordinary moment and every
                unforgettable memory.
              </p>
              <div className="flex gap-2">
                <button className="border border-white px-4 py-1.5 rounded-full text-[11px] flex items-center gap-1 hover:bg-white/10">
                  Contact Us <PawIcon />
                </button>
                <button className="bg-[#F04336] px-4 py-1.5 rounded-full text-[11px] flex items-center gap-1 hover:bg-[#d83a2f]">
                  Adopt Now <PawIcon />
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-3">Utility pages</h4>
              <ul className="space-y-2 text-xs text-[#A0B0B5]">
                <li>
                  <a href="#" className="hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-3">Our Services</h4>
              <ul className="space-y-2 text-xs text-[#A0B0B5]">
                <li>
                  <a href="#" className="hover:text-white">
                    Adoption
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Shelter Networking
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-3">Our Partner</h4>
              <ul className="space-y-2 text-xs text-[#A0B0B5]">
                <li>
                  <a href="#" className="hover:text-white">
                    People for the Ethical Treatment of Animals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blue Cross of India
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    People For Animals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    World Animal Protection
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-[11px] text-[#A0B0B5] mt-6 gap-4">
            <p>Copyright © 2026 Fur & Feather. All Rights Reserved.</p>
            <div className="flex gap-4">
              {["f", "i", "in", "x"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="hover:text-white uppercase font-bold"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PetAdoptionPage;
