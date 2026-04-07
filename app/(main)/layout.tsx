import Navbar from "./resume/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div>
        <Navbar/>
        {children}

    </div>
}