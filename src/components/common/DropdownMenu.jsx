import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useClick,
  useDismiss,
  useInteractions
} from "@floating-ui/react";

import { useState } from "react";

export default function DropdownMenu({
  trigger,
  children,
  placement = "bottom-end"

}) {

  const [open, setOpen] = useState(false);

  const {
    refs,
    floatingStyles,
    context
  } = useFloating({

    open,

    onOpenChange: setOpen,

    placement,

    whileElementsMounted: autoUpdate,

    middleware: [

      offset(8),
      flip(),
      shift({
        padding: 8
      })

    ]

  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const {
    getReferenceProps,
    getFloatingProps
  } = useInteractions([
    click,
    dismiss
  ]);

  return (

    <>

      <div

        ref={refs.setReference}

        {...getReferenceProps()}

        className="inline-flex"

      >

        {trigger}

      </div>

      {

        open && (

          <div

            ref={refs.setFloating}

            style={floatingStyles}

            {...getFloatingProps()}

            className="
              z-50

              min-w-[220px]

              rounded-xl

              border

              bg-white

              shadow-xl

              p-2
            "

          >

            {children({ close: () => setOpen(false) })}

          </div>

        )

      }

    </>

  );

}