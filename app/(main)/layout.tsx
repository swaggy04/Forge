import Navbar from "./resume/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col ">
      <Navbar />
      {children}
    </div>
  );
}
