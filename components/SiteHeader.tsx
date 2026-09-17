"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/Wordmark";
import { buttonClass } from "@/components/ui/Button";
import { contact, navLinks } from "@/content/site";

export function SiteHeader({ overlay = true }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(!overlay);
  const [menuOpen, setMenuOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDialogElement>(null);

  /* Solidify the bar once we've left the hero. */
  useEffect(() => {
    if (!overlay) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 28);
        frame = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [overlay]);

  /* Track which section is in view so the nav can mark it. */
  useEffect(() => {
    if (!overlay || typeof IntersectionObserver === "undefined") return;

    const ids = navLinks.map((link) => link.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setCurrent(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [overlay]);

  /* Native <dialog> gives the mobile menu focus trapping and Escape for free. */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (menuOpen && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!menuOpen && dialog.open) {
      dialog.close();
    }
  }, [menuOpen]);

  const closeMenu = () => {
    document.body.style.overflow = "";
    setMenuOpen(false);
  };

  const solid = scrolled || !overlay;

  /** On the home page the section links are plain hashes; elsewhere they go home first. */
  const sectionHref = (href: string) => {
    if (!href.startsWith("#")) return href;
    return overlay ? href : `/${href}`;
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out ${
          solid
            ? "bg-night/85 text-bone shadow-[0_1px_0_rgba(244,237,226,0.10)] backdrop-blur-xl"
            : "text-bone bg-transparent"
        }`}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
          <Link
            href="/"
            className="shrink-0 transition-opacity duration-200 hover:opacity-70"
            aria-label="Arizona Sound System home"
          >
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const active = current === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={sectionHref(link.href)}
                      aria-current={active ? "true" : undefined}
                      className={`relative block rounded-full px-3.5 py-2 text-[0.875rem] transition-colors duration-200 hover:bg-current/[0.07] ${
                        active ? "opacity-100" : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-current transition-transform duration-300 ease-out ${
                          active ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={contact.phoneHref}
              className="text-bone/80 hover:text-bone hidden text-[0.875rem] tracking-[0.02em] transition-colors duration-200 md:inline-block"
            >
              {contact.phone}
            </a>
            {/* Wrapped rather than given `hidden` directly: buttonClass sets
                inline-flex at the same layer, and whichever utility lands
                later in the stylesheet wins, so the button showed on phones
                and wrapped onto two lines. */}
            <span className="hidden sm:block">
              <a
                href={sectionHref("#contact")}
                className={buttonClass("sun", "sm", "whitespace-nowrap")}
              >
                Get a quote
              </a>
            </span>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 hover:bg-current/[0.09] lg:hidden"
            >
              <span className="sr-only">Open menu</span>
              <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5">
                <path
                  d="M3 6h14M3 10h14M3 14h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <dialog
        ref={dialogRef}
        onClose={closeMenu}
        onCancel={closeMenu}
        aria-label="Site menu"
        className="bg-night text-bone m-0 h-dvh max-h-none w-screen max-w-none p-0 backdrop:bg-transparent lg:hidden"
      >
        <div className="flex h-full flex-col">
          <div className="shell flex h-[4.5rem] shrink-0 items-center justify-between">
            <Wordmark />
            <button
              type="button"
              onClick={closeMenu}
              className="border-bone/20 hover:border-bone/50 flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-200"
            >
              <span className="sr-only">Close menu</span>
              <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
                <path
                  d="m5 5 10 10M15 5 5 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="shell flex flex-1 flex-col justify-center overflow-y-auto py-8"
          >
            <ul className="space-y-1">
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={sectionHref(link.href)}
                    onClick={closeMenu}
                    style={{ ["--rise-delay" as string]: `${index * 45}ms` }}
                    className="animate-rise border-bone/12 font-display hover:text-sun block border-b py-4 text-[2rem] leading-tight tracking-[-0.02em] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3">
              <a
                href={sectionHref("#contact")}
                onClick={closeMenu}
                className={buttonClass("sun", "lg", "w-full")}
              >
                Get a quote
              </a>
              <a
                href={contact.phoneHref}
                className={buttonClass("outline", "lg", "w-full")}
              >
                Call {contact.phone}
              </a>
            </div>

            <p className="label-xs text-bone/55 mt-10">Phoenix, Arizona</p>
          </nav>
        </div>
      </dialog>
    </>
  );
}
