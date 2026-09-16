import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { footer } from "../content/landing-copy";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-landing-ink/8 bg-landing-surface py-14 font-landing-body sm:py-16">
      <div className="landing-container">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-10">
          <div className="md:col-span-2">
            <BrandMark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-landing-ink-muted">
              {footer.blurb}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-landing-ink">
              Product
            </h3>
            <ul className="mt-5 space-y-3">
              {footer.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="landing-link-underline text-sm text-landing-ink-muted transition-colors hover:text-landing-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-landing-ink">
              Company
            </h3>
            <ul className="mt-5 space-y-3">
              {footer.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="landing-link-underline text-sm text-landing-ink-muted transition-colors hover:text-landing-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-landing-ink/8 pt-8 sm:flex-row">
          <p className="text-sm text-landing-ink-muted">
            &copy; {currentYear} TechFestApp. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footer.social.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="landing-link-underline text-sm text-landing-ink-muted transition-colors hover:text-landing-primary"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
