import { css } from "styled-components"

/**
 *
 * @param {String} color  - secondary | primary
 */
const linkHover = color => {
  return css`
    a {
      color: ${({ theme }) =>
        color === "pink" ? theme.palette.pink.light : theme.palette.info.main};
      text-decoration: none;
      position: relative;
      ${({ theme }) => theme.breakpoints.down("sm")} {
        text-decoration: underline;
      }
    }

    a:after {
      background: none repeat scroll 0 0 transparent;
      bottom: 0;
      content: "";
      display: block;
      height: 1px;
      left: 50%;
      position: absolute;
      background: ${({ theme }) =>
        color === "pink" ? theme.palette.pink.light : theme.palette.info.main};
      transition: width 0.3s ease 0s, left 0.3s ease 0s;
      width: 0;
    }
    a:hover:after,
    a:focus:after {
      ${({ theme }) => theme.breakpoints.up("sm")} {
        width: 100%;
        left: 0;
      }
    }
  `
}

export default linkHover
