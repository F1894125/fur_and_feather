import React from "react";

import {
  FaCalendar,
  FaHandHoldingHeart,
  FaHome,
  FaPaw,
  FaPeopleArrows,
} from "react-icons/fa";

import AdoptionCharts from "../../components/AdoptionCharts";
import RecentPetsListing from "../../components/RecentPetsListing";
import TopPerformingShelters from "../../components/TopPerformingShelters";
import AdoptionRequestsTable from "../../components/AdoptionRequestsTable";

interface MetricCardProps {
  icon: React.ReactNode;
  value: string;
  title: string;
  change: string;
  changeColor?: "green" | "red";
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  value,
  title,
  change,
  changeColor = "green",
}) => {
  return (
    <div
      className="
        w-full
        min-h-[195px]
        p-5
        rounded-2xl
        bg-[#F5F9FA]
        border
        border-slate-200
        shadow-sm
        flex
        flex-col
        justify-between
      "
    >
      {/* Top section */}
      <div className="flex items-start justify-between">
        {/* Icon */}
        <div
          className="
            w-14
            h-14
            rounded-2xl
            bg-[#A9E99C]
            flex
            items-center
            justify-center
            text-[#0B3942]
            text-2xl
          "
        >
          {icon}
        </div>

        {/* Change */}
        <div className="flex flex-col items-end gap-2">
          <span
            className={`
              min-w-[70px]
              px-4
              py-1.5
              rounded-full
              text-center
              text-sm
              font-bold
              ${
                changeColor === "red"
                  ? "bg-[#FF9292] text-[#B42318]"
                  : "bg-[#A9E99C] text-[#0B3942]"
              }
            `}
          >
            {change}
          </span>

          <span className="text-xs text-gray-500">this month</span>
        </div>
      </div>

      {/* Value */}
      <div>
        <p
          className="
            text-3xl
            sm:text-4xl
            font-bold
            text-black
            tracking-tight
          "
        >
          {value}
        </p>

        <p
          className="
            mt-2
            text-lg
            sm:text-xl
            font-medium
            text-gray-500
          "
        >
          {title}
        </p>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* ================= QUICK METRICS ================= */}

      <section className="w-full">
        <h2
          className="
            mb-4
            text-xl
            sm:text-2xl
            font-semibold
            text-[#0B3942]
          "
        >
          Quick Metrics
        </h2>

        <div
          className="
            w-full
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-5
          "
        >
          {/* Total Pets */}

          <MetricCard
            icon={<FaPaw />}
            value="2,847"
            title="Total Pets"
            change="+12%"
          />

          {/* Total Shelters */}

          <MetricCard
            icon={<FaHome />}
            value="143"
            title="Total Shelters"
            change="+2"
          />

          {/* Total Adopters */}

          <MetricCard
            icon={<FaPeopleArrows />}
            value="8,392"
            title="Total Adopters"
            change="+2"
          />

          {/* Successful Adoptions */}

          <MetricCard
            icon={<FaHandHoldingHeart />}
            value="1204"
            title="Successful Adoptions"
            change="+1"
            changeColor="red"
          />

          {/* Pending Requests */}

          <MetricCard
            icon={<FaCalendar />}
            value="8"
            title="Pending Requests"
            change="+2"
            changeColor="red"
          />

          {/* Rejected Applications */}

          <MetricCard
            icon={<FaCalendar />}
            value="12"
            title="Rejected Applications"
            change="+2"
          />
        </div>
      </section>

      {/* ================= ADOPTION CHARTS ================= */}

      <section>
        <AdoptionCharts />
      </section>

      {/* ================= RECENT PETS ================= */}

      <section>
        <RecentPetsListing />
      </section>

      {/* ================= TOP SHELTERS ================= */}

      <section>
        <TopPerformingShelters />
      </section>

      {/* ================= ADOPTION REQUESTS ================= */}

      <section>
        <AdoptionRequestsTable />
      </section>
    </div>
  );
};

export default AdminDashboard;
