import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="border-y border-[#E5DDD3] bg-[#F8F5F1]">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-8 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[#8A837B]">
          Ready to Get Started?
        </p>

        <h2 className="mt-6 max-w-4xl font-serif text-5xl leading-tight text-[#1C1C1A] md:text-6xl">
          Build a Resume
          <span className="italic font-normal"> Recruiters Actually Want to Read.</span>
        </h2>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-[#6A655F]">
          Stop fighting with templates and formatting. Focus on your story while
          Forge creates a clean, professional resume that is both ATS-friendly
          and visually polished.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/sign-up"
            className="
              inline-flex
              items-center
              justify-center
              rounded-lg
              bg-[#1C1C1A]
              px-8
              py-3
              text-sm
              font-medium
              text-white
              transition-all
              duration-300
              hover:bg-[#33312E]
            "
          >
            Start Building
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>

          <Link
            href="/about"
            className="
              inline-flex
              items-center
              justify-center
              rounded-lg
              border
              border-[#D8CEC2]
              bg-white
              px-8
              py-3
              text-sm
              font-medium
              text-[#1C1C1A]
              transition-all
              duration-300
              hover:bg-[#F7F3EE]
            "
          >
            Learn More
          </Link>
        </div>

        <p className="mt-8 text-sm text-[#8A837B]">
          No credit card required • Free to get started
        </p>
      </div>
    </section>
  );
}