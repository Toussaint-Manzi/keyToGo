export type ProductPageItem = {
  key: string;
  title: string;
  description: string;
  href: string;
  hasDemo?: boolean;
  external?: boolean;
};

export function parseProductPageItems(products: unknown): ProductPageItem[] {
  if (!Array.isArray(products)) return [];
  return products.filter(
    (p): p is ProductPageItem =>
      typeof p === "object" &&
      p !== null &&
      "key" in p &&
      "title" in p &&
      "href" in p,
  ) as ProductPageItem[];
}
