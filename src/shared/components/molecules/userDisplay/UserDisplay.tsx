// @shared/components/molecules
import React from "react";
import { UserAvatar } from "@shared/components/molecules"; // Asegúrate de la ruta correcta

interface UserDisplayProps {
  userName: string;
  avatarUrl: string | null;
  initials?: string;
}

export const UserDisplay: React.FC<UserDisplayProps> = ({
  userName,
  avatarUrl,
  initials,
}) => {
  return (
    <div className="flex flex-col items-center mb-8 mt-4">
      <UserAvatar
        src={avatarUrl}
        alt={userName}
        fallbackText={initials}
        size="large"
        className="mb-2"
      />
      <p className="text-lg font-semibold text-gray-100">
        {userName.split("@")[0]}{" "}
        {/* Muestra solo la parte del email antes del @ */}
      </p>
    </div>
  );
};
