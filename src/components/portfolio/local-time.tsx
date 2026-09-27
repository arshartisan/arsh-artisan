"use client";

import { useEffect, useState } from "react";

/** Digital wall-clock time in `timeZone`, ticking on the minute. Renders empty until mounted to avoid a hydration mismatch. */
export function LocalTime({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", minute: "2-digit" });
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      setTime(format.format(new Date()));
      timer = setTimeout(tick, 60_000 - (Date.now() % 60_000));
    };

    tick();
    return () => clearTimeout(timer);
  }, [timeZone]);

  return (
    <time suppressHydrationWarning className="tabular-nums">
      {time}
    </time>
  );
}
