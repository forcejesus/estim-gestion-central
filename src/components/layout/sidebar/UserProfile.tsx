
import React from "react";
import { User } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type UserProfileProps = {
  user: {
    name?: string;
    role?: string;
  } | null;
  collapsed: boolean;
};

const UserProfile: React.FC<UserProfileProps> = ({ user, collapsed }) => {
  if (collapsed) {
    return (
      <>
        <div className="flex items-center justify-center p-4">
          <div className="h-10 w-10 rounded-full bg-estim-green flex items-center justify-center text-white">
            <User size={16} />
          </div>
        </div>
        <Separator />
      </>
    );
  }

  return (
    <>
      <div className="flex items-center gap-3 p-4">
        <div className="h-10 w-10 rounded-full bg-estim-green flex items-center justify-center text-white">
          <User size={16} />
        </div>
        <div>
          <p className="text-sm font-medium">{user?.name}</p>
          <div className="flex items-center">
            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            <span className="ml-2 h-2 w-2 rounded-full bg-green-500"></span>
          </div>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default UserProfile;
