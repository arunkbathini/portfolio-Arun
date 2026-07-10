"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function LiveRefresh() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [lastRefresh, setLastRefresh] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      startTransition(() => {
        router.refresh();
        setLastRefresh(new Date());
      });
    }, 10_000);

    return () => window.clearInterval(timer);
  }, [router]);

  return (
    <div className={styles.liveStatus} aria-live="polite">
      <span className={styles.liveDot} aria-hidden="true" />
      <span>{isPending ? "Refreshing" : "Live"}</span>
      <time>{lastRefresh.toLocaleTimeString()}</time>
    </div>
  );
}
