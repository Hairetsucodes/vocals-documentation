import type { ReactNode } from "react";
import { useEffect } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            Vocals Documentation
          </Heading>
          <p className={styles.heroSubtitle}>
            Comprehensive guides and API references for integrating Vocals Voice
            AI into your applications across multiple programming languages and
            frameworks.
          </p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button--primary button--lg",
                styles.getStartedButton
              )}
              to="/docs/intro"
            >
              Get Started
            </Link>
            <Link
              className={clsx(
                "button button--secondary button--lg",
                styles.viewDocsButton
              )}
              to="/docs/installation"
            >
              Installation Guide
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    // Add gradient class to body when this page loads
    document.body.classList.add("gradient-page");

    // Remove gradient class when component unmounts
    return () => {
      document.body.classList.remove("gradient-page");
    };
  }, []);

  return (
    <Layout
      title={`Documentation`}
      description="Comprehensive documentation for Vocals Voice AI - Integration guides for Python, Next.js, Node.js, Go, and React"
      wrapperClassName="gradient-background"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
