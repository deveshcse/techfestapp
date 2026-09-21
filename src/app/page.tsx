import LandingPage from "@/features/landing/components/landing-page";
import { JsonLd } from "@/components/seo/json-ld";
import {
  SITE_KEYWORDS,
  SITE_NAME,
  createPageMetadata,
  getHomeJsonLd,
} from "@/lib/seo";

export const metadata = createPageMetadata({
  title: `${SITE_NAME} | Technical Festival Management`,
  description:
    "Create techfests, schedule activities, automate waitlists, and track attendance from one campus dashboard.",
  path: "/",
  keywords: [...SITE_KEYWORDS],
});

export default function Home() {
  return (
    <>
      <JsonLd data={getHomeJsonLd()} />
      <LandingPage />
    </>
  );
}
