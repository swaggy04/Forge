import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import resume from "@/asset/resume.jpeg";

export default function Navbar() {
    return <header className="shadow-sm">
        <div className="max-w-8xl mx-auto px-10 border flex items-center justify-between gap-3">
            <Link href="/resume" className="flex items-center">
                <Image
                src={resume}
                alt="logo"
                width={40}
                height={40}
                />
            <span className="font-bold text-3xl m-2 p-2"> Forge</span>
            </Link>
            
            <UserButton
                appearance={{
                    elements :{
                        avatarBox :{
                            width:35,
                            height:35,
                        },
                    },
                }}
            
            />        
        </div>
    </header>
}