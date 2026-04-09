import { Button } from "@/components/ui/button";

export default function ResumeEditor() {
    return (
        <div className="bg-amber-400  w-full min-h-screen flex grow flex-col">
            <header className="bg-amber-700 w-full text-center py-4">
                <h1 className="font-black text-5xl">Design Your Resume</h1>
                <p>description</p>
            </header>
            <main>

            </main>
            <footer className=" w-full border-t px-3">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <Button variant="secondary" className="bg-slate-950 rounded-5xl text-white">previous</Button>
                        <Button>next</Button>
                    </div>
                </div>
            </footer>
        </div>
    )
}