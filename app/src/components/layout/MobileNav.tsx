"use client";

import { useState, type ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  /**
   * The sidebar, passed as a slot from the server. Receiving it as children
   * rather than importing it keeps the whole navigation tree out of the
   * client bundle.
   */
  children: ReactNode;
}

/**
 * The sidebar as a drawer below `lg`.
 *
 * `Dialog` is modal by default, which traps focus, locks page scroll and
 * closes on Escape — the accessibility behaviour we would otherwise have to
 * reimplement.
 */
export function MobileNav({ children }: Props) {
  const [open, setOpen] = useState(false);

  // Navigating from inside the drawer should close it. Anchor clicks are the
  // only navigation the drawer contains.
  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("a")) {
      setOpen(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Abrir navegación"
          >
            <Menu />
          </Button>
        }
      />

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-[2px] lg:hidden" />

        <Dialog.Popup
          className="fixed inset-y-0 left-0 z-50 h-full outline-none lg:hidden"
          onClick={handleContentClick}
        >
          <Dialog.Title className="sr-only">Navegación</Dialog.Title>
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
