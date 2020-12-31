import React from "react"
import styled from "styled-components"
import navigation from "../constants/navigation"
import classNames from "classnames"
import AniLink from "gatsby-plugin-transition-link/AniLink"
const Navigation = ({ className }) => {
  const url = typeof window === "undefined" ? "" : window.location.pathname
  return (
    <div className={className}>
      <ul className="list">
        {navigation.map(nav => (
          <li key={nav.name} className="list-item">
            <AniLink
              fade
              className={classNames("list-link", {
                active:
                  nav.path === "/"
                    ? nav.path === url
                    : new RegExp(`${nav.path.slice(1)}`, "i").test(
                        `${url.slice(1)}`
                      ),
              })}
              to={nav.path}
            >
              <span className="link-icon">{nav.icon()}</span> {nav.name}
            </AniLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default styled(Navigation)`
  padding: 3rem 0;
  .list {
    list-style: none;
  }
  .link-icon {
    font-size: 1.1em;
    margin-right: 0.5rem;
    display: none;
  }
  .list-link {
    color: rgba(0, 0, 0, 0.7);
    text-decoration: none;
    letter-spacing: 0.05em;
    font-weight: bold;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0rem;
    font-family: "Poppins", Arial, sans-serif;
    position: relative;
    text-transform: capitalize;
    font-size: 0.9em;
    transition: background-position 275ms ease;
    &:after {
      content: "";
      background: none repeat scroll 0 0 transparent;
      bottom: 0;
      display: block;
      height: 2px;
      left: 50%;
      position: absolute;
      background: var(--info);
      transition: width 0.3s ease 0s, left 0.3s ease 0s;
      width: 0;
    }
    &:hover {
      color: var(--info);
    }
    &:hover:after {
      width: 100%;
      left: 0;
    }
  }
  .active {
    color: var(--info);
    &:after {
      content: "";
      background: none repeat scroll 0 0 transparent;
      bottom: 0;
      display: block;
      height: 2px;
      left: 50%;
      position: absolute;
      background: var(--info);
      transition: width 0.3s ease 0s, left 0.3s ease 0s;
      width: 100%;
      left: 0;
    }
  }
  @media screen and (min-width: 992px) {
    .link-icon {
      display: inline-block;
    }
    .list-link {
      font-size: 1em;
    }
  }
`
