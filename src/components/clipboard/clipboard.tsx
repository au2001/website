"use client";

import React from "react";

export default function Clipboard({
  text,
  message,
  children,
}: React.PropsWithChildren<{ text: string; message?: string }>) {
  function onClick(e: React.MouseEvent) {
    e.preventDefault();

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    } else {
      const elem = document.createElement("input");
      elem.value = text;
      document.body.appendChild(elem);
      elem.select();
      elem.setSelectionRange(0, 99999);
      document.execCommand("copy");
      document.body.removeChild(elem);
    }

    if (message !== undefined) alert(message);
  }

  return <a onClick={onClick}>{children}</a>;
}
