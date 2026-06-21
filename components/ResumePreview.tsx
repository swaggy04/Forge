export default function ResumePreview() {
  return (
    <div className="flex justify-center lg:justify-end">
      <div className="relative">

        {/* Paper 3 */}
        <div className="absolute inset-0 translate-x-6 -translate-y-4 rotate-6 bg-[#f4f1ed] border border-neutral-300" />

        {/* Paper 2 */}
        <div className="absolute inset-0 translate-x-2 translate-y-2 -rotate-3 bg-[#faf8f5] border border-neutral-300" />

        {/* Main A4 Resume */}
        <div
          className="
            relative
            w-[380px]
            aspect-[210/297]
            bg-white
            border-2
            border-neutral-300
            shadow-[0_30px_80px_rgba(0,0,0,0.12)]
            rotate-2
            hover:rotate-0
            hover:-translate-y-2
            transition-all
            duration-500
            overflow-hidden
            p-8
          "
        >
          {/* Header */}
          <div className="pb-6 border-b border-neutral-200">
            <div className="h-6 w-40 mx-auto rounded bg-neutral-300 blur-[1px]" />

            <div className="h-2 w-28 mx-auto mt-3 rounded bg-neutral-200 blur-[1px]" />
          </div>

          {/* Experience */}
          <section className="mt-8">
            <div className="h-4 w-24 bg-neutral-300 rounded blur-[0.5px]" />

            <div className="mt-5 space-y-3">
              <div className="h-3 w-full bg-neutral-200 rounded blur-[1px]" />
              <div className="h-3 w-[90%] bg-neutral-200 rounded blur-[1px]" />
              <div className="h-3 w-[80%] bg-neutral-200 rounded blur-[1px]" />

              <div className="h-3 w-full bg-neutral-200 rounded blur-[1px] mt-4" />
              <div className="h-3 w-[85%] bg-neutral-200 rounded blur-[1px]" />
            </div>
          </section>

          {/* Education */}
          <section className="mt-8">
            <div className="h-4 w-20 bg-neutral-300 rounded blur-[0.5px]" />

            <div className="mt-4 space-y-3">
              <div className="h-3 w-[75%] bg-neutral-200 rounded blur-[1px]" />
              <div className="h-3 w-[50%] bg-neutral-200 rounded blur-[1px]" />
            </div>
          </section>

          {/* Skills */}
          <section className="mt-8">
            <div className="h-4 w-16 bg-neutral-300 rounded blur-[0.5px]" />

            <div className="mt-4 flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="
                    h-7
                    w-16
                    rounded-sm
                    bg-neutral-100
                    border
                    border-neutral-200
                    blur-[0.5px]
                  "
                />
              ))}
            </div>
          </section>

          {/* Footer */}
          <div className="absolute bottom-8 left-8 right-8">
            <div className="h-px bg-neutral-200" />

            <div className="mt-4 flex justify-between">
              <div className="h-2 w-20 bg-neutral-200 rounded blur-[1px]" />
              <div className="h-2 w-8 bg-neutral-200 rounded blur-[1px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}