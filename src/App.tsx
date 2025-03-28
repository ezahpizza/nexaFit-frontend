
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from '@clerk/clerk-react';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import MealPlanner from "./pages/MealPlanner";
import CaloriePredictor from "./pages/CaloriePredictor"
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();
// Make sure to use the env variable and provide a fallback for development
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_Y2xlcmsuYXBwLmRldi1zYWN1by5sY2wtZGVtby0xNDEuMzguMS4xLjkxMTYxLjE';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ClerkProvider 
        publishableKey={CLERK_PUBLISHABLE_KEY}
        clerkJSVersion="5.56.0-snapshot.v20250312225817"
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/calorie-tracker" element={
              <ProtectedRoute>
                <CaloriePredictor />
              </ProtectedRoute>
            } />
            <Route path="/meal-planner" element={
              <ProtectedRoute>
                <MealPlanner />
              </ProtectedRoute>
            } />
            <Route path="/contact" element={<NotFound />} />
            <Route path="/about" element={<NotFound />} />
            <Route path="/terms" element={<NotFound />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ClerkProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
