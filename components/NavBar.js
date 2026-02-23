import { useRouter } from "next/router";
import React, { useState } from "react";

export default function NavBar() {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  return (
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img
            src="/tor_logo.svg"
            width="80"
            height="28"
            alt="tatortrechts.de"
          />
        </a>

        <a
          role="button"
          className={
            isActive
              ? "navbar-burger burger is-active"
              : "navbar-burger burger"
          }
          aria-label="menu"
          aria-expanded="false"
          data-target="tor-navbar"
          onClick={() => setIsActive(!isActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="tor-navbar"
        className={isActive ? "navbar-menu is-active" : "navbar-menu"}
      >
        <div className="navbar-start">
          {[
            ["/karte", "Karte"],
            ["/blog", "Blog"],
            ["/ueber", "Über uns"],
            ["/kontakt", "Kontakt"],
          ].map((x) => {
            return (
              <a
                key={x[0]}
                className={
                  router.pathname === x[0]
                    ? "navbar-item is-active"
                    : "navbar-item"
                }
                href={x[0]}
              >
                {x[1]}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
