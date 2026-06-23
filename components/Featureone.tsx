// import SplitEditorPreview from "./split-editor-preview";

import SplitEditorPreview from "./SplitEditorPreview";

export default function Featureone() {
  return (
    <section className="py-20">
      <div className="text-center max-w-3xl mx-auto">
        <p className="uppercase tracking-[0.25em] text-xs text-neutral-500 mb-5">
          Introducing the Split-Pane Resume Editor
        </p>

        <h1 className="font-serif text-6xl leading-tight">
          Write on the left,
          <br />
          <span className="italic">see results on the right.</span>
        </h1>

        <p className="mt-6 text-neutral-600 max-w-2xl mx-auto">
          A distraction-free, real-time experience engineered for focus.
        </p>

      </div>

      <SplitEditorPreview />
    </section>
  );
}