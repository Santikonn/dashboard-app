"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Building2 } from "lucide-react";
import { organizations } from "../../data/organizations";

export default function OrganizationSwitcher() {
  const [open, setOpen] = useState(false);
  const [activeOrg, setActiveOrg] = useState(organizations[0]);
  const containerRef = useRef(null);

  // Cerrar al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
      >
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Building2 className="w-4 h-4 text-primary" />
        </div>

        <div className="text-left">
          <p className="text-sm font-medium text-foreground">{activeOrg.name}</p>
          <p className="text-xs text-muted-foreground">{activeOrg.role}</p>
        </div>

        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 w-64 z-50 rounded-md border bg-popover text-popover-foreground shadow-md p-1 animate-in fade-in-0 zoom-in-95">
          {organizations.map((org) => (
            <button
              key={org.id}
              onClick={() => {
                setActiveOrg(org);
                setOpen(false);
              }}
              className="relative flex w-full cursor-default select-none items-center gap-3 rounded-sm p-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-primary" />
              </div>

              <div className="text-left">
                <p className="font-medium text-sm leading-none">{org.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{org.role}</p>
              </div>
            </button>
          ))}

          <div className="-mx-1 my-1 h-px bg-muted" />

          <button className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors text-primary hover:bg-accent focus:bg-accent">
            + Add Organization
          </button>
        </div>
      )}
    </div>
  );
}