"use client";

import { useEffect, useState } from "react";
import { navigation } from "../navigation/navigation";
import { ChevronLeft } from "lucide-react";

export default function Sidebar({
  collapsed,
  setCollapsed,
  activeItem,
  setActiveItem,
}) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  // 🔥 Popover
  const [openPopover, setOpenPopover] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

  // 🔥 Detectar tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);

      if (!desktop) {
        setCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setCollapsed]);

  // 🔥 Detectar si un child está activo
  const isChildActive = (item) => {
    return item.children?.some((child) => child.key === activeItem);
  };

  // 🔥 Auto abrir el menú del padre si hay child activo
  useEffect(() => {
    const parent = navigation.find((item) =>
      item.children?.some((child) => child.key === activeItem)
    );

    if (parent) {
      setOpenMenu(parent.key);
    }
  }, [activeItem]);

  return (
    <aside
      className={`
        fixed left-0 top-0 z-40 h-screen flex flex-col
        border-r border-sidebar-border bg-gradient-sidebar
        transition-all duration-300
        ${collapsed ? "w-[72px]" : "w-[256px]"}
      `}
    >
      {/* 🔹 LOGO */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        <a href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg font-bold text-primary-foreground bg-gradient-primary">
            E
          </div>

          {!collapsed && (
            <span className="text-lg font-semibold text-sidebar-foreground">
              Elevate
            </span>
          )}
        </a>
      </div>

      {/* 🔹 NAV */}
      <nav className="flex-1 overflow-y-auto overflow-x-visible scrollbar-none py-4 px-3 space-y-1">
        {navigation.map((item, index) => {
          const Icon = item.icon;
          const isOpen = openMenu === item.key;

          // 🔥 Padre activo si él o un child está activo
          const isActive =
            item.key === activeItem || isChildActive(item);

          return (
            <div key={index} className="relative">
              {/* 🔹 ITEM PRINCIPAL */}
              <button
                onClick={(e) => {
                  e.stopPropagation();

                  if (collapsed && item.children) {
                    const rect = e.currentTarget.getBoundingClientRect();

                    setPopoverPosition({
                      top: rect.top,
                      left: rect.right,
                    });

                    setOpenPopover(
                      openPopover === item.key ? null : item.key
                    );
                  } else if (item.children) {
                    setOpenMenu(isOpen ? null : item.key);
                  } else {
                    setActiveItem(item.key);
                    setOpenPopover(null);
                  }
                }}
                className={`
                  flex items-center gap-3 px-3 py-2.5 w-full
                  rounded-lg text-sm font-medium transition-all duration-150
                  ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-foreground"
                      : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  }
                `}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />

                {!collapsed && (
                  <span className="truncate flex-1 text-left">
                    {item.name}
                  </span>
                )}

                {item.children && !collapsed && (
                  <span className={`transition ${isOpen ? "rotate-90" : ""}`}>
                    ▶
                  </span>
                )}
              </button>

              {/* 🔥 SUBMENU (EXPANDED) */}
              {item.children && isOpen && !collapsed && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <button
                      key={child.key}
                      onClick={() => setActiveItem(child.key)}
                      className={`
                        block w-full text-left px-3 py-2 rounded-md text-sm transition
                        ${
                          activeItem === child.key
                            ? "bg-sidebar-border text-sidebar-foreground"
                            : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground"
                        }
                      `}
                    >
                      {child.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* 🔥 POPOVER (COLLAPSED) */}
      {collapsed && openPopover && (
        <div
          style={{
            position: "fixed",
            top: popoverPosition.top,
            left: popoverPosition.left + 10,
            zIndex: 9999,
          }}
          className="
            min-w-[200px]
            p-2
            rounded-lg shadow-lg
            border border-sidebar-border
            bg-sidebar-accent
          "
        >
          {navigation
            .find((item) => item.key === openPopover)
            ?.children?.map((child) => (
              <button
                key={child.key}
                onClick={() => {
                  setActiveItem(child.key);
                  setOpenPopover(null);
                }}
                className={`
                  w-full text-left px-3 py-2 rounded-md text-sm transition
                  ${
                    activeItem === child.key
                      ? "bg-sidebar-border text-sidebar-foreground"
                      : "text-sidebar-muted hover:bg-sidebar-border hover:text-sidebar-foreground"
                  }
                `}
              >
                {child.name}
              </button>
            ))}
        </div>
      )}

      {/* 🔥 BOTÓN SOLO DESKTOP */}
      {isDesktop && (
        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="
              w-full flex items-center justify-center gap-2
              px-3 py-2 rounded-lg text-sm
              text-sidebar-muted
              hover:bg-sidebar-accent hover:text-sidebar-foreground
              transition
            "
          >
            <ChevronLeft
              className={`
                w-5 h-5 transition-transform
                ${collapsed ? "rotate-180" : ""}
              `}
            />

            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      )}
    </aside>
  );
}