import { Sparkles } from "lucide-react";
import ResumePreview from "./ResumePreview";
import Link from "next/link";

export default function Herosection() {
  return (
    <section className="py-24">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}

        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-neutral-500">
            <Sparkles size={14} />
            <span>The New Standard For Modern Resumes</span>
          </div>

          <h1 className="mt-8 font-serif text-6xl leading-none">
            Your Career,
            <br />
            <span className="italic font-normal">
              Beautifully Documented.
            </span>
          </h1>

          <p className="mt-8 text-lg text-neutral-600 max-w-md">
            A minimalist, professional resume builder designed
            for the modern tech era.
          </p>

          <div className="mt-10 flex gap-4 items-center justify-center ">
            <Link href={"/editor"} className="bg-black text-white px-8 py-3 rounded-xl">
              Build Your Resume
            </Link>

           
          </div>
        </div>

        {/* Right */}

        <ResumePreview />
      </div>
    </section>
  );
}