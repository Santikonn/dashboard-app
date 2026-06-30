"use client";

import { Building2 } from "lucide-react";

export default function OrganizationSwitcher({ user }) {

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
        <Building2 className="w-4 h-4 text-primary" />
      </div>

      <div className="text-left">
        <p className="text-sm font-medium text-foreground">
          {user?.empresa || "Loading..."}
        </p>

        <p className="text-xs text-muted-foreground">
          {user?.cargo || ""}
        </p>
      </div>
    </div>
  );
}