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
            onClick={() => this.setState({ isActive: !this.state.isActive })}
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
          {/* <a className="navbar-item" href="/">
            <img
              src="tor_logo2.jpg"
              // src="/rg_logo.svg"
              // width="200"
              // height="28"
              alt="RECHTEGEWALT.INFO"
            />
          </a> */}
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
}

export default withRouter(NavBar);
