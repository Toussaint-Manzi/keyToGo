import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  variant?: "default" | "inverted" | "footer";
  href?: string;
  className?: string;
  priority?: boolean;
};

const sizes = {
  default: { width: 180, height: 50, className: "h-10 w-auto sm:h-11" },
  inverted: { width: 180, height: 50, className: "h-10 w-auto brightness-0 invert sm:h-11" },
  footer: { width: 360, height: 100, className: "h-20 w-auto brightness-0 invert" },
};

export function BrandLogo({
  variant = "default",
  href,
  className = "",
  priority = false,
}: BrandLogoProps) {
  const size = sizes[variant];
  const src = variant === "footer" ? "/images/logo-2.png" : "/images/logo.png";

  const img = (
    <Image
      src={src}
      alt="KeyTOGO Group Inc."
      width={size.width}
      height={size.height}
      className={`${size.className} ${className}`}
      priority={priority}
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex shrink-0 items-center">
        {img}
      </Link>
    );
  }

  return img;
}
