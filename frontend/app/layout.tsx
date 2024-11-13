"use client";
import GlobalStyle from "@/styles/globals"; 
import StyledComponentsRegistry from "@/lib/registry"; 
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <GlobalStyle /> {/* Apply global styles */}
        <StyledComponentsRegistry>
          <AuthProvider>{children}</AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
