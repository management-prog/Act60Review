"use client";

import { useEffect } from "react";

export default function MailchimpScript() {
  useEffect(() => {
    // prevent duplicate injection
    if (document.getElementById("mcjs")) return;

    const script = document.createElement("script");
    script.id = "mcjs";
    script.async = true;
    script.src =
      "https://chimpstatic.com/mcjs-connected/js/users/238e8706cacc18ff4b54d48b0/bee013cf34f2cad29216485ca.js";

      document.head.appendChild(script); 

    return () => {
      document.getElementById("mcjs")?.remove();
    };
  }, []);

  return null;
}
