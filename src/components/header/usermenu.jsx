import { useState, useRef, useEffect } from "react";
import { useMsal } from "@azure/msal-react";

export default function UserMenu( { user } ) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { instance } = useMsal();

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

  const signOut = async () => {
    await instance.logoutRedirect({
      account: instance.getActiveAccount(),
    });
  };

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
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <div className="h-px my-1 bg-muted"></div>
          <button 
          onClick={signOut}
          className="w-full text-left text-sm px-2 py-1.5 rounded-sm text-destructive hover:bg-accent">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}