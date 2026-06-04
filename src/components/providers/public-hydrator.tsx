"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { PublicContent } from "@/lib/public-data";
import { hydratePublicContent } from "@/store/slices/public-content-slice";

export function PublicHydrator({
  content,
  children,
}: {
  content: PublicContent;
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hydratePublicContent(content));
  }, [content, dispatch]);

  return <>{children}</>;
}
