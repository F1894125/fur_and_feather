import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

// Non-lazy Core Layouts & Security Guards (Loaded immediately)
import Wrapper from "../layout/Wrapper";
import AdminWrapper from "../layout/adminWrapper";
import ProtectedRoute from "../utils/protectedRoute";
import ErrorBoundary from "../pages/ErrorBoundary";

// Fallback Loading Component (Customize as needed)
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

// Helper to wrap lazy components in Suspense
const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

// Lazy Loaded Pages
const LoginForm = lazy(() => import("../pages/auth/Login"));
const Signup = lazy(() => import("../pages/auth/Signup"));
const Home = lazy(() => import("../pages/public/Home"));
const Shop = lazy(() => import("../pages/public/Shop"));
const PetAdoptionPage = lazy(() => import("../pages/public/PetAdoptionPage"));
const ContactUs = lazy(() => import("../pages/public/ContactUs"));
const Blog = lazy(() => import("../pages/public/Blog"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const AboutUs = lazy(() => import("../pages/public/AboutUs"));
const FaqPage = lazy(() => import("../pages/public/FaqPage"));
const Testimonials = lazy(() => import("../pages/public/Testimonials"));

// Named export support for AdoptionWizard
const AdoptionWizard = lazy(() =>
  import("../pages/public/AdoptionWizard").then((module) => ({
    default: module.AdoptionWizard,
  })),
);

// Admin Lazy Pages
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const AllPetsDashboard = lazy(() => import("../pages/admin/AllPetsDashboard"));
const PetsDetailsView = lazy(() => import("../pages/admin/PetsdetailsView"));
const AdopterDetailsView = lazy(() => import("../pages/admin/AdopterDetailsView"));
const AllAdoptersContent = lazy(
  () => import("../pages/admin/AllAdoptersContent"),
);
const ShelterDetailsContent = lazy(
  () => import("../pages/admin/ShelterDetailsContent"),
);
const AllSheltersContent = lazy(
  () => import("../pages/admin/AllShelterContent"),
);

const Routes = createBrowserRouter([
  {
    path: "/login",
    element: withSuspense(LoginForm),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/signup",
    element: withSuspense(Signup),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/",
    element: <Wrapper />,
    errorElement: <ErrorBoundary />,
    children: [
      // Public pages
      { index: true, element: withSuspense(Home) },
      { path: "shop", element: withSuspense(Shop) },
      { path: "petspage", element: withSuspense(PetAdoptionPage) },
      { path: "contactus", element: withSuspense(ContactUs) },
      { path: "blog", element: withSuspense(Blog) },
      { path: "aboutus", element: withSuspense(AboutUs) },
      { path: "faq", element: withSuspense(FaqPage) },
      { path: "testimonials", element: withSuspense(Testimonials) },

      // Protected User pages
      {
        element: <ProtectedRoute allowedRoles={["user", "ADMIN", "admin"]} />,
        children: [{ path: "adopt", element: withSuspense(AdoptionWizard) }],
      },
    ],
  },
  // Admin Dashboard Layout
  {
    path: "/admin/",
    element: <ProtectedRoute allowedRoles={["ADMIN", "admin"]} />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        element: <AdminWrapper />,
        children: [
          { index: true, element: withSuspense(AdminDashboard) },
          {
            path: "manage-pet/:petId",
            element: withSuspense(PetsDetailsView),
          },
          {
            path: "manage-adopter/:adopterId",
            element: withSuspense(AdopterDetailsView),
          },
          { path: "all-adopters", element: withSuspense(AllAdoptersContent) },
          { path: "all-pets", element: withSuspense(AllPetsDashboard) },
          {
            path: "shelter-details",
            element: withSuspense(ShelterDetailsContent),
          },
          { path: "all-shelters", element: withSuspense(AllSheltersContent) },
        ],
      },
    ],
  },

  // 404 Fallback
  {
    path: "*",
    element: withSuspense(PageNotFound),
    errorElement: <ErrorBoundary />,
  },
]);

export default Routes;
