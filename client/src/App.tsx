import { BrowserRouter, Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CardNav from "./components/layout/CardNav";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import ReportPage from "./pages/ReportPage";
import TutorialPage from "./pages/TutorialPage";
import NotFound from "@/pages/not-found";

function App() {
  const navItems = [
    {
      label: "Report & View",
      bgColor: "#001219", // darkBg
      textColor: "#ffd60a", // royalGold
      links: [
        { label: "New Report", href: "/report", ariaLabel: "Create new hazard report" },
        { label: "Crisis Map", href: "/map", ariaLabel: "View existing hazard reports" }
      ]
    },
    {
      label: "Resources",
      bgColor: "#005f73", // oceanBlue
      textColor: "#ffffff",
      links: [
        { label: "How to Use", href: "/tutorial", ariaLabel: "Learn how to use the app" },
      ]
    }
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-dark-bg text-foreground">
            <CardNav
              logo="/vite.svg"
              logoAlt="The Chola Citadel Logo"
              items={navItems}
              baseColor="rgba(0, 18, 25, 0.95)"
              menuColor="#ffd60a"
              buttonBgColor="#20b2aa"
              buttonTextColor="#001219"
            />
            
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/tutorial" element={<TutorialPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
