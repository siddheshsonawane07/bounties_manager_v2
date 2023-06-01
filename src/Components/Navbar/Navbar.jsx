import React from "react";
import "./navBar.css";

const NavbarComponent = (account) => {
  let account_no = JSON.stringify(account);
  console.log(account_no);
  return (
    <div className="nav-container">
      <div className="navbar">
        <a className="navbar-item" href="/">
          Welcome to Bounties
        </a>
        <a className="navbar-item" href="/allBounties">
          All Bounties
        </a>
        <a className="navbar-item" href="/createBounty">
          Create a Bounty
        </a>
        <span>
          <button
            type="button"
            class="btn btn-dark"
            style={{ "margin-right": "5rem" }}
          >
            {`${account_no.substring(12, 20)}`}
          </button>
        </span>
      </div>
    </div>
  );
};

export default NavbarComponent;
