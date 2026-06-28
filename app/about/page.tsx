
import { FileText, LayoutTemplate, ShieldCheck } from "lucide-react";

export default function AboutSection() {
  const features = [
    {
      icon: FileText,
      title: "Built for Clarity",
      description:
        "Every template is designed with readability first, helping recruiters focus on your experience instead of distracting layouts.",
    },
    {
      icon: LayoutTemplate,
      title: "Thoughtfully Designed",
      description:
        "Inspired by editorial design and minimalist typography, Forge creates resumes that feel clean, balanced, and professional.",
    },
    {
      icon: ShieldCheck,
      title: "ATS Friendly",
      description:
        "Modern formatting without compromising compatibility, ensuring your resume remains optimized for applicant tracking systems.",
    },
  ];

  return (
    <section className="border-t border-[#E5DDD3]  py-28">
      <div className="mx-auto max-w-6xl px-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8A837B]">
            About Forge
          </p>

          <h2 className="mt-6 font-serif text-5xl leading-tight text-[#1C1C1A]">
            A Resume Builder Designed
            <span className="italic font-normal"> With Purpose.</span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-[#6A655F]">
            Forge was created with a simple belief: great resumes shouldn&apos;t be
            difficult to create. Instead of overwhelming users with endless
            customization, Forge focuses on thoughtful design, simplicity, and
            professional presentation—helping you showcase your skills with
            confidence.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className=" p-8 "
            >
              <feature.icon
                className="mb-6 h-10 w-10 text-[#1C1C1A]"
                strokeWidth={1.5}
              />

              <h3 className="font-serif text-2xl text-[#1C1C1A]">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-[#6A655F]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
