// src/shared/components/molecules/BrandLogo/BrandLogo.tsx

import { useTheme } from "@providers/ThemeProvider";

interface BrandLogoProps {
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`
        w-full h-20 text-3xl font-extrabold flex items-center justify-center p-4 rounded-lg mb-8 contain-content
        ${
          theme === "dark"
            ? "bg-indigo-700 text-white shadow-md"
            : "bg-indigo-500 text-white shadow-md"
        }
        ${className || ""}
      `}
    >
      <span className="block">
        <img src="blas.jpg" alt="" />
      </span>
    </div>
  );
};
