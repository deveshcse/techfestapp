"use client";

import type { ComponentProps, MouseEvent } from "react";
import Link from "next/link";

function hashFromHref(href: string): string | null {
  const i = href.indexOf("#");
  if (i === -1) return null;
  const id = href.slice(i + 1);
  return id || null;
}

function isSamePageHash(href: string): boolean {
  if (href.startsWith("#")) return true;
  try {
    const url = new URL(href, window.location.origin);
    return url.pathname === window.location.pathname && Boolean(url.hash);
  } catch {
    return false;
  }
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  el.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
  history.pushState(null, "", `#${id}`);
}

export function onSmoothHashClick(
  event: MouseEvent<HTMLAnchorElement>,
  href: string
) {
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const id = hashFromHref(href);
  if (!id || !isSamePageHash(href)) return;

  event.preventDefault();
  scrollToId(id);
}

type SmoothHashLinkProps = ComponentProps<typeof Link> & {
  href: string;
};

/** Same-page hash links with smooth scroll (Next.js Link jumps instantly). */
export function SmoothHashLink({
  href,
  onClick,
  ...props
}: SmoothHashLinkProps) {
  return (
    <Link
      href={href}
      onClick={(event) => {
        onSmoothHashClick(event, href);
        onClick?.(event);
      }}
      {...props}
    />
  );
}
