// @shared/components/molecules

import { useTheme } from "@providers/ThemeProvider";
import LogoSalazar from "../../../../../public/LOGO.jpg";
interface BrandLogoProps {
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`
        w-full h-10   flex items-center justify-center  mb-8 contain-content
        ${
          theme === "dark"
            ? "bg-indigo-700 text-white shadow-md"
            : "bg-indigo-500 text-white shadow-md"
        }
        ${className || ""}
      `}
    >
      <img src={LogoSalazar} alt="" />
    </div>
  );
};
