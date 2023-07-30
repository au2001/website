"use client";

import { useEffect } from "react";

export default function Admin() {
  useEffect(() => {
    import("netlify-cms/dist/netlify-cms");
  }, []);

  return (
    <>
      <link href="/admin/config.yml" type="text/yaml" rel="cms-config-url" />
    </>
  );
}
