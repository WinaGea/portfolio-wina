// components/ProjectCard.tsx
"use client";

import { useEffect, useState } from "react";
import type { Project } from "../app/types/project";

export default function ProjectCard({ project }: { project: Project }) {
  const images = project.images || [];
  const [index, setIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const hasImages = images.length > 0;
  const current = hasImages ? images[index] : null;

  const openLightbox = () => {
    if (!hasImages) return;
    setIsZoomOpen(true);
  };

  const closeLightbox = () => {
    setIsZoomOpen(false);
  };

  const next = () => {
    if (!hasImages) return;
    setIndex((i) => (i + 1) % images.length);
  };

  const prev = () => {
    if (!hasImages) return;
    setIndex((i) => (i - 1 + images.length) % images.length);
  };

  // reset loading setiap buka / ganti gambar
  useEffect(() => {
    if (isZoomOpen) setIsImgLoaded(false);
  }, [isZoomOpen, index]);

  // lock scroll saat lightbox open
  useEffect(() => {
    if (!isZoomOpen) {
      document.body.classList.remove("lightbox-open");
      document.body.style.overflow = "";
      return;
    }

    document.body.classList.add("lightbox-open");
    document.body.style.overflow = "hidden";

    return () => {
      document.body.classList.remove("lightbox-open");
      document.body.style.overflow = "";
    };
  }, [isZoomOpen]);

  // ESC close + arrow navigation
  useEffect(() => {
    if (!isZoomOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isZoomOpen, images.length]);

  return (
    <article
      className={`project-card project-card--${project.kind} ${
        hasImages ? "project-card--with-thumb" : ""
      }`}
    >
      <div className="project-strip" aria-hidden="true" />

      <div className="project-content">
        <div className="project-meta-row">
          <span className="project-badge">{project.badge}</span>
          <span className="project-year">{project.year}</span>
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-role">{project.role}</p>

        {hasImages && current && (
          <figure className="project-thumb carousel">
            <img
              className="carousel-img"
              src={current.src}
              alt={current.alt || project.title}
              loading="lazy"
              style={{ cursor: "zoom-in" }}
              onClick={openLightbox}
              draggable={false}
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="carousel-btn left"
                  onClick={prev}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="carousel-btn right"
                  onClick={next}
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}
          </figure>
        )}

        <p className="project-summary">{project.summary}</p>

        {/* IMPACT (OPSIONAL – SUPPORTING BISA TIDAK PUNYA) */}
        {project.impact ? (
          <p className="project-impact">
            <span>Impact</span> {project.impact}
          </p>
        ) : null}

        <div className="project-tags-block">
          <div className="project-tags-label">Tech</div>
          <div className="project-tags">
            {project.tech.map((t) => (
              <span key={t} className="project-tag">
                {t}
              </span>
            ))}
          </div>
        </div>

        {project.tools && project.tools.length > 0 && (
          <div className="project-tools-block">
            <div className="project-tools-label">Tools</div>
            <div className="project-tools">
              {project.tools.map((tool) => (
                <span key={tool} className="project-tool">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      {isZoomOpen && current && (
        <div className="image-lightbox-backdrop" onClick={closeLightbox}>
          <div
            className="image-lightbox-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="image-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close image"
              title="Close"
            >
              <span aria-hidden>✕</span>
            </button>

            {!isImgLoaded && (
              <div className="image-lightbox-loading">Loading…</div>
            )}

            <img
              src={current.src}
              alt={current.alt || project.title}
              className="image-lightbox-img"
              onLoad={() => setIsImgLoaded(true)}
              draggable={false}
            />

            {images.length > 1 && (
              <div className="image-lightbox-nav">
                <button type="button" onClick={prev} aria-label="Prev">
                  ‹
                </button>
                <span>
                  {index + 1} / {images.length}
                </span>
                <button type="button" onClick={next} aria-label="Next">
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
