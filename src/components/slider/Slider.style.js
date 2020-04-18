import styled from "styled-components"

export const SliderBaseStyle = styled.div`
  margin: 0 calc(-50vw + 50%);

  ${({ theme }) => theme.breakpoints.up("sm")} {
    margin: 0 auto;
  }

  .slick-arrow {
    display: none;
    ${({ theme }) => theme.breakpoints.up("md")} {
      display: inherit;
      color: #555;
      font-size: 130px;
    }
  }
  .slick-prev:before,
  .slick-next:before {
    display: none;
  }
`
