"use client";

import { useEffect } from "react";
import { AB_VARIANT } from "@/lib/constants";

function track(event: string, params?: Record<string, unknown>, custom = true) {
  const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbq !== "function") return;
  fbq(custom ? "trackCustom" : "track", event, { ab_variant: AB_VARIANT, ...params });
}

/**
 * Efeitos globais da página (monta uma vez em page.tsx, renderiza null):
 * - reveal com stagger em [data-reveal] (filhos ganham --i inline via CSS)
 * - count-up dos .stat-tile strong[data-count]
 * - preenchimento da .timeline ao entrar na viewport
 * - sentinela do header (.is-scrolled) e da mobile bar (.is-visible pós-hero)
 * - ScrollDepth 25/50/75/100 e FaqOpen no Pixel
 */
export function PageEffects() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    /* Reveal com stagger + timeline */
    const revealNodes = document.querySelectorAll<HTMLElement>(
      "[data-reveal], .timeline"
    );
    if (reduced || !("IntersectionObserver" in window)) {
      revealNodes.forEach((node) => node.classList.add("in-view"));
    } else {
      revealNodes.forEach((node) => {
        Array.from(node.children).forEach((child, i) => {
          (child as HTMLElement).style.setProperty("--i", String(i));
        });
      });
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
      );
      revealNodes.forEach((node) => revealObserver.observe(node));
      cleanups.push(() => revealObserver.disconnect());
    }

    /* Count-up dos tiles do placar */
    const counters = document.querySelectorAll<HTMLElement>("[data-count]");
    if (reduced || !("IntersectionObserver" in window)) {
      counters.forEach((node) => {
        node.textContent = node.dataset.count ?? node.textContent;
      });
    } else {
      const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
      const runCounter = (node: HTMLElement) => {
        let target = node.dataset.count ?? "";
        let prefix = node.dataset.prefix ?? "";
        const suffix = node.dataset.suffix ?? "";
        if (target.startsWith("+")) {
          prefix += "+";
          target = target.slice(1);
        }
        const decimals = (target.split(",")[1] ?? "").length;
        const value = parseFloat(target.replace(",", "."));
        if (Number.isNaN(value)) return;
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min((now - start) / 900, 1);
          const current = value * easeOutExpo(t);
          node.textContent =
            prefix + current.toFixed(decimals).replace(".", ",") + suffix;
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runCounter(entry.target as HTMLElement);
              counterObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach((node) => counterObserver.observe(node));
      cleanups.push(() => counterObserver.disconnect());
    }

    /* Header: .is-scrolled após 32px */
    const header = document.querySelector<HTMLElement>(".site-header");
    if (header) {
      const onScroll = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 32);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", onScroll));
    }

    /* Mobile bar: visível só depois do fim do hero */
    const bar = document.querySelector<HTMLElement>(".mobile-cta-bar");
    const hero = document.querySelector<HTMLElement>("#topo");
    if (bar && hero && "IntersectionObserver" in window) {
      const barObserver = new IntersectionObserver(
        ([entry]) => {
          bar.classList.toggle(
            "is-visible",
            !entry.isIntersecting && entry.boundingClientRect.bottom < 0
          );
        },
        { threshold: 0 }
      );
      barObserver.observe(hero);
      cleanups.push(() => barObserver.disconnect());
    } else if (bar) {
      bar.classList.add("is-visible");
    }

    /* ScrollDepth 25/50/75/100 — uma vez por pageview */
    const fired = new Set<number>();
    const onDepth = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = (window.scrollY / max) * 100;
      [25, 50, 75, 100].forEach((mark) => {
        if (pct >= mark && !fired.has(mark)) {
          fired.add(mark);
          track("ScrollDepth", { depth: mark });
        }
      });
    };
    window.addEventListener("scroll", onDepth, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onDepth));

    /* FaqOpen */
    const details = document.querySelectorAll<HTMLDetailsElement>(".faq details");
    const onToggle = (event: Event) => {
      const el = event.currentTarget as HTMLDetailsElement;
      if (el.open) {
        const question = el.querySelector("summary")?.textContent?.trim() ?? "";
        track("FaqOpen", { question: question.slice(0, 80) });
      }
    };
    details.forEach((el) => el.addEventListener("toggle", onToggle));
    cleanups.push(() =>
      details.forEach((el) => el.removeEventListener("toggle", onToggle))
    );

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
