import { cn } from "@/lib/utils";

interface StarIconProps extends React.SVGProps<SVGSVGElement> {
  fill?: "full" | "half" | "none";
}

export default function StarIcon({ fill = "full", className, ...props }: StarIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-yellow-400", className)}
      {...props}
    >
      {fill === "half" && (
        <path d="M12 2 L12 20" stroke="currentColor" fill="currentColor" />
      )}
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        fill={fill === "none" ? "none" : "currentColor"}
      />
    </svg>
  );
}
