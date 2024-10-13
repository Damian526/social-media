"use client";
import GlobalStyle from "@/styles/globals"; // Import global styles
import StyledComponentsRegistry from "@/lib/registry"; // Assuming you already have this set up

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
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
