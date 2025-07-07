
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { SecureWrapper } from "@/components/common/SecureWrapper";
import { SecurityMonitor } from "@/components/common/SecurityMonitor";
import { ActionHandler } from "@/components/common/ActionHandler";
import Index from "./pages/Index";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <ActionHandler>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <SecureWrapper>
                      <Index />
                      <SecurityMonitor />
                    </SecureWrapper>
                  } 
                />
                <Route 
                  path="/admin" 
                  element={
                    <SecureWrapper requireAuth={true} requiredRole="admin">
                      <AdminPage />
                    </SecureWrapper>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ActionHandler>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
