import Image from "next/image";

interface Props {
  variant?: "light" | "dark";
  className?: string;
}

export default function Logo({ variant = "dark", className = "" }: Props) {
  const src =
    variant === "light"
      ? "/images/logo/לוגו לבן.png"
      : "/images/logo/לוגו שחור.png";

  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src={src}
        alt="ELIYA Studio"
        width={400}
        height={120}
        className="h-16 md:h-24 w-auto object-contain"
        priority
      />
    </span>
  );
}
