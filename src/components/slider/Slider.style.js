import styled from "styled-components"

export const SliderBaseStyle = styled.div`
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
