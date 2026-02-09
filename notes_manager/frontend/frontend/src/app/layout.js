import "./globals.css";

export const metadata = {
  title: "NoteMark Manager",
  description: "Personal Notes and Bookmarks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}