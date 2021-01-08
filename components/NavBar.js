import { withRouter } from "next/router";
import React from "react";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  render() {
    const { isActive } = this.state;
    const { router } = this.props;

    return (
      <div className="" style={{ marginLeft: "50%", width: "50%" }}>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img
                src="/rg_logo.svg"
                width="200"
                height="28"
                alt="RECHTEGEWALT.INFO"
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
              data-target="navbarBasicExample"
              onClick={() => this.setState({ isActive: !this.state.isActive })}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div
            id="navbarBasicExample"
            className={isActive ? "navbar-menu is-active" : "navbar-menu"}
          >
            <div className="navbar-start">
              {[
                ["/chronik", "Taten"],
                ["/hintergrund", "Hintergrund"],
                ["/stories", "Stories"],
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
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">Mehr</a>

                <div className="navbar-dropdown">
                  <a className="navbar-item">Daten</a>
                  <a className="navbar-item">Kontakt</a>
                  <hr className="navbar-divider" />
                  <a className="navbar-item">Impressum</a>
                  <a className="navbar-item">Datenschutzerklärung</a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(NavBar);
