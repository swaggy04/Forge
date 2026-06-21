export default function SplitEditorPreview() {
  return (
    <div className="mt-16 border bg-white overflow-hidden rounded-sm">
      <div className="grid md:grid-cols-2">

        {/* Left */}
        <div className="bg-[#f6f3ef] p-8 border-r">
          <p className="uppercase tracking-widest text-xs text-neutral-500 mb-6">
            Writer Mode
          </p>

          <div className="space-y-5">
            <div>
              <label className="text-xs text-neutral-500">
                Full Name
              </label>

              <div className="border bg-white p-3 mt-2">
                Sarah Jenkins
              </div>
            </div>

            <div>
              <label className="text-xs text-neutral-500">
                Experience
              </label>

              <div className="border bg-white p-4 h-24 mt-2" />
            </div>

            <div>
              <label className="text-xs text-neutral-500">
                Education
              </label>

              <div className="border bg-white p-3 mt-2" />
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="p-10">
          <div className="text-center border-b pb-6">
            <h3 className="font-serif text-3xl">
              Sarah Jenkins
            </h3>

            <p className="uppercase tracking-[0.2em] text-xs text-neutral-500">
              Product Director
            </p>
          </div>

          <div className="mt-8">
            <h4 className="font-serif text-xl mb-4">
              Experience
            </h4>

            <p className="font-semibold">
              Senior Product Lead
            </p>

            <p className="text-neutral-500 text-sm">
              2020 — Present
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}