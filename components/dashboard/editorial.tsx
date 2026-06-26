export default function EditorialNote() {
  return (
    <section
      className="
        mt-16
        border
        border-[#DDD4CA]
        bg-[#FFFEFD]
        px-10
        py-14
        text-center
      "
    >
      <blockquote
        className="
          mx-auto
          max-w-3xl
          font-serif
          text-2xl
          italic
          leading-10
          text-[#444748]
        "
      >
        “A resume is more than a record of experience.
        It&apos;s the story of where you&apos;ve been and where you&apos;re
        going next.”
      </blockquote>

      <div className="mt-8">

        <div className="mx-auto mb-4 h-px w-16 bg-[#DDD4CA]" />

        <p
          className="
            text-xs
            uppercase
            tracking-[0.3em]
            text-[#6A655F]
          "
        >
          Forge Editorial
        </p>

      </div>
    </section>
  );
}