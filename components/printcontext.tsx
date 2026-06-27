"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";

import { useReactToPrint } from "react-to-print";

import PreviewPage from "@/components/previewpage";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";

interface PrintContextType {
  printResume: (resume: ResumeServerData) => void;
}

const PrintContext = createContext<PrintContextType | null>(null);

export function PrintProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [resume, setResume] =
    useState<ResumeServerData | null>(null);

  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrint = useReactToPrint({
    contentRef,
    documentTitle: resume?.title || "Resume",
  });

  useEffect(() => {
    if (!resume) return;

    const timeout = setTimeout(() => {
      reactToPrint();
    }, 100);

    return () => clearTimeout(timeout);
  }, [resume, reactToPrint]);

  return (
    <PrintContext.Provider
      value={{
        printResume: setResume,
      }}
    >
      {children}

      {resume && (
        <div
          className="fixed left-[-9999px] top-0"
          aria-hidden
        >
          <PreviewPage
            disableZoom
            resumeData={mapToResumeValues(resume)}
            contentRef={contentRef}
          />
        </div>
      )}
    </PrintContext.Provider>
  );
}

export function usePrintResume() {
  const context = useContext(PrintContext);

  if (!context) {
    throw new Error(
      "usePrintResume must be used inside PrintProvider"
    );
  }

  return context;
}