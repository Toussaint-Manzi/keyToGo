import { getPublicContent } from "@/lib/public-data";
import { PublicHome } from "@/components/public/public-home";

export const dynamic = "force-dynamic";
export const revalidate = 300;

export default async function HomePage() {
  const content = await getPublicContent();
  return <PublicHome content={content} />;
}
