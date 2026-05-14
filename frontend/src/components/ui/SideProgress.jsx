import React from "react";
import { navItems } from "../../data/portfolioContent";

export default function SideProgress({ activeSection }) {
  return (
    <aside className="side-progress" aria-label="Page sections">
      {navItems.map((item) => {
        const id = item.href.replace("#", "");
        return (
          <a
            key={item.href}
            href={item.href}
            className={activeSection === id ? "is-active" : ""}
            aria-label={item.label}
          >
            <span />
          </a>
        );
      })}
    </aside>
  );
}
