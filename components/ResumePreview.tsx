export default function ResumePreview() {
  return (
    <div className="flex justify-center">
      <div className="w-[360px] h-[480px] bg-white border rotate-2 hover:rotate-0 transition-all duration-500 p-6">

        <div className="flex gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-neutral-300" />
          <div className="w-2 h-2 rounded-full bg-neutral-300" />
          <div className="w-2 h-2 rounded-full bg-neutral-300" />
        </div>

        <div className="space-y-4">
          <div className="h-4 w-2/3 bg-neutral-300 rounded" />
          <div className="h-2 w-full bg-neutral-200 rounded" />
          <div className="h-2 w-full bg-neutral-200 rounded" />
          <div className="h-2 w-3/4 bg-neutral-200 rounded" />
        </div>

        <div className="mt-auto pt-20">
          <div className="h-px bg-neutral-200 mb-5" />
          <div className="h-2 w-20 bg-neutral-300 rounded" />
        </div>

      </div>
    </div>
  );
}