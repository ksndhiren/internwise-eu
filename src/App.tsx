import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "./components/internwise/ScrollToTop.tsx";

const queryClient = new QueryClient();
const Index = lazy(() => import("./pages/Index.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Terms = lazy(() => import("./pages/Terms.tsx"));
const Privacy = lazy(() => import("./pages/Privacy.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const CandidateFaq = lazy(() => import("./pages/CandidateFaq.tsx"));
const EmployerFaq = lazy(() => import("./pages/EmployerFaq.tsx"));
const CandidateDashboard = lazy(() => import("./pages/CandidateDashboard.tsx"));
const CandidateMatchDetail = lazy(() => import("./pages/CandidateMatchDetail.tsx"));
const CandidateOnboarding = lazy(() => import("./pages/CandidateOnboarding.tsx"));
const CandidateMatches = lazy(() => import("./pages/CandidateMatches.tsx"));
const EmployerOnboarding = lazy(() => import("./pages/EmployerOnboarding.tsx"));
const CandidateFeed = lazy(() => import("./pages/CandidateFeed.tsx"));
const EmployerDashboard = lazy(() => import("./pages/EmployerDashboard.tsx"));
const CandidateDetail = lazy(() => import("./pages/CandidateDetail.tsx"));
const ShortlistedCandidates = lazy(() => import("./pages/ShortlistedCandidates.tsx"));

const RouteFallback = () => (
  <div className="grid min-h-screen place-items-center bg-slate-950 text-white">
    <div className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-semibold text-white/72 backdrop-blur">
      Loading Internwise...
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/candidate-faq" element={<CandidateFaq />} />
            <Route path="/employer-faq" element={<EmployerFaq />} />
            <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
            <Route path="/candidate/matches/:id" element={<CandidateMatchDetail />} />
            <Route path="/candidate-onboarding" element={<CandidateOnboarding />} />
            <Route path="/candidate-matches" element={<CandidateMatches />} />
            <Route path="/employer-onboarding" element={<EmployerOnboarding />} />
            <Route path="/candidate-feed" element={<CandidateFeed />} />
            <Route path="/employer/dashboard" element={<EmployerDashboard />} />
            <Route path="/employer-dashboard" element={<EmployerDashboard />} />
            <Route path="/employer/candidates/:candidateId" element={<CandidateDetail />} />
            <Route path="/employer-dashboard/candidate/:candidateId" element={<CandidateDetail />} />
            <Route path="/shortlisted-candidates" element={<ShortlistedCandidates />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
