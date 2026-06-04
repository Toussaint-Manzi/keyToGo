import { getPublicContent } from "@/lib/public-data";
import { PublicHydrator } from "@/components/providers/public-hydrator";
import { StoreProvider } from "@/components/providers/store-provider";
import { PublicSiteShell } from "@/components/public/public-site-shell";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getPublicContent();

  return (
    <StoreProvider>
      <PublicHydrator content={content}>
        <PublicSiteShell>{children}</PublicSiteShell>
      </PublicHydrator>
    </StoreProvider>
  );
}
