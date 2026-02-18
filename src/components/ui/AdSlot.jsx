import { useEffect, useRef, useState } from "react";

export default function AdSlot({ slot, format = "auto", className = "" }) {
  const adRef = useRef(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded
    }

    // Check if ad filled after a delay
    const timer = setTimeout(() => {
      if (adRef.current) {
        const ins = adRef.current.querySelector("ins");
        if (ins && ins.offsetHeight > 0) {
          setFilled(true);
        }
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={adRef}
      className={className}
      style={{ display: filled ? "block" : "none" }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2599493016668494"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
