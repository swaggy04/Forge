import {
  LayoutTemplate,
  FileCheck,
  Eye,
} from "lucide-react";

const features = [
  {
    icon: LayoutTemplate,
    title: "One Great Template",
    description:
      "No endless choices or confusing customization. Start with a thoughtfully designed resume format built for clarity and professionalism.",
  },
  {
    icon: FileCheck,
    title: "ATS-Friendly",
    description:
      "Structured layouts and clean formatting help your resume pass automated screening systems.",
  },
  {
    icon: Eye,
    title: "Real-Time Preview",
    description:
      "See your resume update instantly as you write, making editing faster and more intuitive.",
  },
];

export default function Features() {
  return (
    <section className="border-t py-24">
      <div className="text-center mb-16">
        <h2 className="font-serif text-4xl md:text-5xl">
          Everything You Need.
          <br />
          Nothing You Don&apos;t
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {features.map((feature) => (
          <div key={feature.title}>
            <feature.icon size={22} />

            <h3 className="mt-5 font-serif text-3xl">
              {feature.title}
            </h3>

            <p className="mt-4 text-neutral-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}