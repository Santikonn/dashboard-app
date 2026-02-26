"use client";

import { useState } from "react";
import { navigation } from "../navigation/navigation";
import { ChevronLeft } from "lucide-react";

export default function Sidebar({ collapsed, setCollapsed, activeItem, setActiveItem }) {

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen flex flex-col border-r border-sidebar-border bg-gradient-sidebar ${
        collapsed ? "w-[72px]" : "w-[256px]"
      }`}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        <a href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg font-bold text-primary-foreground bg-gradient-primary">
                E
            </div>
            {!collapsed && <span className="text-lg font-semibold text-sidebar-foreground opacity-100 transform-none">Elevate</span>}
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-none py-4 px-3 space-y-1">
        {navigation.map((item, index) => {
        const Icon = item.icon;
        return (
            <button
            key={index}
            onClick={() => setActiveItem(item.key)}
            className={`relative flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium transition-all duration-150 ${
                item.key === activeItem 
                ? 'bg-sidebar-accent text-sidebar-foreground' 
                : 'text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground'}`}
            >
                {/* Barra izquierda activa */}
                <div
                    className={`absolute left-0 w-1 h-6 rounded-r-full bg-gradient-primary transition-all duration-200 ${
                    item.key === activeItem ? "opacity-100" : "opacity-0"
                    }`}
                />

                {/* Icono */}
                <Icon className="h-5 w-5 flex-shrink-0" />

                {/* Texto */}
                {!collapsed && (
                    <span className="truncate transition-all duration-200">
                    {item.name}
                    </span>
                )}
            </button>
        );
        })}
      </nav>

      {/* Collapse */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
        >
          <ChevronLeft
            className={`w-5 h-5 transition-transform ${
              collapsed ? "rotate-180" : ""
            }`}
          />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}