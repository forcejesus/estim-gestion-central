
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

import SidebarHeader from "./sidebar/SidebarHeader";
import UserProfile from "./sidebar/UserProfile";
import NavigationItems from "./sidebar/NavigationItems";
import SidebarFooter from "./sidebar/SidebarFooter";

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`h-screen bg-sidebar border-r flex flex-col transition-all duration-200 ${
      collapsed ? "w-16" : "w-64"
    }`}>
      <SidebarHeader collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <UserProfile user={user} collapsed={collapsed} />
      
      <div className="flex-1 p-2 overflow-auto custom-scrollbar">
        <NavigationItems collapsed={collapsed} />
      </div>

      <SidebarFooter collapsed={collapsed} onLogout={logout} />
    </div>
  );
};

export default Sidebar;
