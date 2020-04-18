import styled from "styled-components"

const StyledTestimonials = styled.div`
  position: relative;
  max-width: 100vw;
  margin: 0 calc(-50vw + 50%);

  ${({ theme }) => theme.breakpoints.up("sm")} {
    margin: 0 auto;
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
    align-items: center;
    justify-content: center;
    padding: 0 ${({ theme }) => theme.spacing(2)};

    ${({ theme }) => theme.breakpoints.up("md")} {
      padding: 0;
      margin: 10px 60px 10px calc(50px + 10vw);
      grid-template-columns: 300px 1fr;
      grid-gap: 20px;
    }
  }

  .image {
    width: 180px;
    height: 180px;
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
`

export default StyledTestimonials
