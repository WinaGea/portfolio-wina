"use client";

import { useEffect, useMemo, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Wajib: biar tidak mismatch versi worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type PdfViewerModalProps = {
  open: boolean;
  title?: string;
  file?: string;      // contoh: "/sertifikat/1.pdf"
  onClose: () => void;
};

export default function PdfViewerModal({ open, title, file, onClose }: PdfViewerModalProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.05);

  const safeFile = useMemo(() => {
    if (!file) return "";
    const fixed = /^https?:\/\//i.test(file) ? file : file.startsWith("/") ? file : `/${file}`;
    return encodeURI(fixed);
  }, [file]);

  // reset tiap buka modal / ganti file
  useEffect(() => {
    if (!open) return;
    setNumPages(0);
    setPage(1);
    setScale(1.05);
  }, [open, safeFile]);

  // keyboard control (esc, panah, +/-)
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setPage((p) => Math.min(numPages || 1, p + 1));
      if (e.key === "ArrowLeft") setPage((p) => Math.max(1, p - 1));
      if (e.key === "+" || (e.key === "=" && e.ctrlKey)) setScale((s) => Math.min(2.2, +(s + 0.1).toFixed(2)));
      if (e.key === "-") setScale((s) => Math.max(0.6, +(s - 0.1).toFixed(2)));
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, numPages, onClose]);

  if (!open || !safeFile) return null;

  const total = numPages || 1;

  return (
    <div className="pdfm-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="pdfm-shell" onClick={(e) => e.stopPropagation()}>
        {/* TOPBAR */}
        <div className="pdfm-topbar">
          <button className="pdfm-iconbtn" type="button" aria-label="Menu" title="Menu">
            ☰
          </button>

          <div className="pdfm-title" title={title || "Certificate"}>
            {title || "Certificate"}
          </div>

          <div className="pdfm-spacer" />

          <div className="pdfm-controls">
            <span className="pdfm-page">
              {page} / {total}
            </span>

            <button
              className="pdfm-iconbtn"
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              title="Previous"
              disabled={page <= 1}
            >
              ‹
            </button>

            <span className="pdfm-zoom">{Math.round(scale * 100)}%</span>

            <button
              className="pdfm-iconbtn"
              type="button"
              onClick={() => setScale((s) => Math.max(0.6, +(s - 0.1).toFixed(2)))}
              title="Zoom out"
            >
              –
            </button>

            <button
              className="pdfm-iconbtn"
              type="button"
              onClick={() => setScale((s) => Math.min(2.2, +(s + 0.1).toFixed(2)))}
              title="Zoom in"
            >
              +
            </button>

            <a className="pdfm-iconbtn" href={safeFile} download title="Download">
              ⤓
            </a>

            <button className="pdfm-close" type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="pdfm-body">
          {/* KIRI: THUMBNAILS */}
          <aside className="pdfm-side" aria-label="Preview thumbnail">
            <Document
              file={safeFile}
              onLoadSuccess={({ numPages }) => {
                setNumPages(numPages);
                setPage((p) => Math.min(Math.max(1, p), numPages));
              }}
              loading={<div className="pdfm-loading">Loading PDF…</div>}
              error={<div className="pdfm-loading">Failed to load PDF.</div>}
            >
              <div className="pdfm-side-inner">
                {Array.from({ length: total }, (_, i) => {
                  const p = i + 1;
                  return (
                    <button
                      key={p}
                      type="button"
                      className={`pdfm-thumb ${p === page ? "is-active" : ""}`}
                      onClick={() => setPage(p)}
                    >
                      <Page pageNumber={p} width={180} renderTextLayer={false} renderAnnotationLayer={false} />
                      <div className="pdfm-thumb-no">{p}</div>
                    </button>
                  );
                })}
              </div>
            </Document>
          </aside>

          {/* KANAN: HALAMAN UTAMA */}
          <main className="pdfm-main" aria-label="PDF preview">
            <div className="pdfm-canvas">
              <Document
                file={safeFile}
                loading={<div className="pdfm-loading">Loading page…</div>}
                error={<div className="pdfm-loading">Failed to load PDF.</div>}
              >
                <Page pageNumber={page} scale={scale} renderTextLayer={false} renderAnnotationLayer={false} />
              </Document>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
