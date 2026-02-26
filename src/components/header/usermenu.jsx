import { useState, useRef, useEffect } from "react";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-secondary transition-colors"
      >
        <span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8">
          <img
            src="https://api.dicebear.com/9.x/croodles/svg?scale=120"
            alt="Avatar"
            className="aspect-square w-full h-full"
          />
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-md border bg-popover p-1 shadow-md z-50">
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium">Santiago Moreno</p>
            <p className="text-xs text-muted-foreground">edwin.morneo@elevate.cx</p>
          </div>
          <div className="h-px my-1 bg-muted"></div>
          <button className="w-full text-left text-sm px-2 py-1.5 rounded-sm hover:bg-accent">
            Profile
          </button>
          <button className="w-full text-left text-sm px-2 py-1.5 rounded-sm hover:bg-accent">
            Preferences
          </button>
          <div className="h-px my-1 bg-muted"></div>
          <button className="w-full text-left text-sm px-2 py-1.5 rounded-sm text-destructive hover:bg-accent">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}