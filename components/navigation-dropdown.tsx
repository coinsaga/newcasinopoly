"use client";

import type { ComponentProps } from "react";

type NavigationDropdownProps = Pick<
  ComponentProps<"details">,
  "children" | "className" | "name"
>;

export function NavigationDropdown(props: NavigationDropdownProps) {
  return (
    <details
      {...props}
      onClick={(event) => {
        const target = event.target;

        if (
          target instanceof Element &&
          target.closest("a[href]") &&
          event.currentTarget.open
        ) {
          event.currentTarget.open = false;
        }
      }}
      onKeyDown={(event) => {
        if (event.key !== "Escape" || !event.currentTarget.open) return;

        event.preventDefault();
        event.stopPropagation();
        event.currentTarget.open = false;
        event.currentTarget
          .querySelector<HTMLElement>(":scope > summary")
          ?.focus();
      }}
    />
  );
}
