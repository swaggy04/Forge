const steps = [
  {
    number: "01",
    title: "Add Your Information",
    description:
      "Enter your experience, education, projects, certifications, and skills.",
  },
  {
    number: "02",
    title: "Review Instantly",
    description:
      "Watch your resume update in real time as you make changes.",
  },
  {
    number: "03",
    title: "Export & Apply",
    description:
      "Download a polished ATS-friendly resume and start applying confidently.",
  },
];

export default function Process() {
  return (
    <section className="border-t py-24">
      <h2 className="font-serif text-5xl mb-16">
        From Draft To Application
      </h2>

      <div className="grid md:grid-cols-3 gap-12">
        {steps.map((step) => (
          <div key={step.number}>
            <span className="text-sm text-neutral-400">
              {step.number}
            </span>

            <h3 className="font-serif text-3xl mt-3">
              {step.title}
            </h3>

            <p className="mt-4 text-neutral-600">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}