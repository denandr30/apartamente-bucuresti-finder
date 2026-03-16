import "./globals.css";

export const metadata = {
  title: "Radar Apartamente București",
  description: "Finder personalizat pentru apartamente în București",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
