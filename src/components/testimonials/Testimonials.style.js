import styled from "styled-components"

const StyledTestimonials = styled.div`
  position: relative;
  max-width: 100vw;
  margin: 0 auto;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    max-width: 90vw;
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    max-width: 800px;
  }

  ${({ theme }) => theme.breakpoints.up("lg")} {
    max-width: 1200px;
  }

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100px;
    background: ${({ theme }) => theme.palette.pink.light};

    ${({ theme }) => theme.breakpoints.up("md")} {
      top: calc(50% - 85px);
      width: 85%;
      height: 170px;
      left: 12%;
      padding: 10px 60px 10px calc(50px + 10vw);
      grid-template-columns: 300px 1fr;
    }
  }

  .testimonial {
    display: grid;
    grid-gap: 20px;
    align-items: center;
    justify-content: center;

    ${({ theme }) => theme.breakpoints.up("md")} {
      margin: 10px 60px 10px calc(50px + 10vw);
      grid-template-columns: 300px 1fr;
    }
  }

  .image {
    width: 150px;
    height: 150px;
    border-radius: 50vh;
    border: 8px solid ${({ theme }) => theme.palette.background.default};

    ${({ theme }) => theme.breakpoints.up("sm")} {
      width: 250px;
      height: 250px;
      border: 10px solid ${({ theme }) => theme.palette.background.default};
    }
  }
  .avatar {
    text-align: center;
    justify-self: center;
  }

  .arrows {
    display: none;
   ${({ theme }) => theme.breakpoints.up("md")} {
     display: inherit;
     color: #555;
     font-size: 30px;
    }
  }
  .slick-prev:before,
  .slick-next:before {
    display: none;
  }

  .text {
    max-height: 220px;
    ${({ theme }) => theme.breakpoints.up("sm")} {
      max-height: 180px;
    }
    ${({ theme }) => theme.breakpoints.up("md")} {
      max-height: 150px;
    }

    &::-webkit-scrollbar {
      width: 8px;
      cursor: grab;
    }

    & {
      scrollbar-width: thin;
      scrollbar-color: rgba(77, 77, 77, 0.99);
    }
    &::-webkit-scrollbar-track {
      background: rgba(77, 77, 77, 0.5);
      border-radius: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.palette.pink.dark};
      border-radius: 6px;
    
  }
`

export default StyledTestimonials
