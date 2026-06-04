import { revalidateTag } from "next/cache";
import { PUBLIC_CACHE_TAG } from "@/lib/public-data";

export function revalidatePublicCache() {
  revalidateTag(PUBLIC_CACHE_TAG, "max");
}
