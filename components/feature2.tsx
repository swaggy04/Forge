export default function Featuretwo() {
  return (
    <section className="border-t border-neutral-200 py-24">
      <div className="grid lg:grid-cols-2 gap-20 items-center">

        {/* Left Content */}

        <div className="max-w-md">
          <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-neutral-500">
            ✦ AI-Powered Drafting
          </div>

          <h2 className="mt-6 font-serif text-4xl md:text-5xl leading-tight text-neutral-900">
            Generate Content with AI
          </h2>

          <p className="mt-6 text-neutral-600 leading-8">
            Never stare at a blank page again. Our contextual AI
            understands your career path and suggests high-impact
            bullet points tailored to your industry.
          </p>

          <button className="mt-8 bg-black text-white px-6 py-3 text-sm font-medium hover:opacity-90 transition">
            Try AI Writing Assistant
          </button>
        </div>

        {/* Right Mockup */}

        <div className="flex justify-center lg:justify-end">
          <div className="w-[320px] border border-neutral-200 bg-[#faf8f5] p-5">

            {/* Header */}

            <div className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-full bg-black flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>

              <div className="h-2 w-20 bg-neutral-300 rounded-full" />
            </div>

            {/* Content */}

            <div className="mt-8 space-y-3">
              <div className="h-2 w-full bg-neutral-200 rounded-full" />
              <div className="h-2 w-full bg-neutral-200 rounded-full" />
              <div className="h-2 w-4/5 bg-neutral-200 rounded-full" />
              <div className="h-2 w-2/3 bg-neutral-200 rounded-full" />
            </div>

            {/* Suggestion */}

            <div className="flex justify-end mt-8">
              <div className="bg-black text-white text-[10px] px-3 py-1 rounded-md tracking-wide uppercase">
                AI Suggested
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}