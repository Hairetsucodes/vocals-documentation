import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import ThemedImage from "@theme/ThemedImage";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

type LanguageItem = {
  title: string;
  icon: string;
  description: string;
  docLink: string;
  status: "available" | "coming-soon";
};

const LanguageList: LanguageItem[] = [
  {
    title: "Python",
    icon: "python",
    description: "Full-featured SDK for backend services and AI applications.",
    docLink: "/docs/vocals-sdk-python",
    status: "available",
  },
  {
    title: "Next.js",
    icon: "nextjs",
    description:
      "Integrate voice AI into your React and Next.js web applications.",
    docLink: "/docs/quickstart",
    status: "coming-soon",
  },
  {
    title: "Node.js",
    icon: "node",
    description:
      "Build server-side voice applications with TypeScript support.",
    docLink: "/docs/quickstart",
    status: "coming-soon",
  },
  {
    title: "Go",
    icon: "go",
    description: "High-performance SDK for scalable backend services.",
    docLink: "/docs/quickstart",
    status: "coming-soon",
  },
  {
    title: "React",
    icon: "react",
    description:
      "Components and hooks for building interactive voice interfaces.",
    docLink: "/docs/quickstart",
    status: "coming-soon",
  },
];

function LanguageCard({
  title,
  icon,
  description,
  docLink,
  status,
}: LanguageItem) {
  const isComingSoon = status === "coming-soon";
  const CardElement = isComingSoon ? "div" : Link;

  return (
    <CardElement
      to={docLink}
      className={clsx(styles.languageCard, isComingSoon && styles.comingSoon)}
    >
      {isComingSoon && (
        <span className={styles.comingSoonBadge}>Coming Soon</span>
      )}
      <div className={styles.languageIcon}>
        <ThemedImage
          alt={`${title} Logo`}
          sources={{
            light: useBaseUrl(`/img/language/${icon}.svg`),
            dark: useBaseUrl(`/img/language/${icon}-light.svg`),
          }}
        />
      </div>
      <Heading as="h3" className={styles.languageTitle}>
        {title}
      </Heading>
      <p className={styles.languageDescription}>{description}</p>
    </CardElement>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2" className={styles.featuresTitle}>
            Choose Your Language or Framework
          </Heading>
          <p className={styles.featuresSubtitle}>
            Get started with Vocals using your preferred programming language or
            framework.
          </p>
        </div>
        <div className={styles.languageGrid}>
          {LanguageList.map((props, idx) => (
            <LanguageCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
