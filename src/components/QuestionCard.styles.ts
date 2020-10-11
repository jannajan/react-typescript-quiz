import styled from "styled-components"

type ButtonWrapperProps = {
  isCorrect: boolean
  isClicked: boolean
}

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  transition: all 0.3s ease;
  :hover {
    opacity: 0.8;
  }

  button {
    cursor: pointer;
    user-select: none;
    font-size: 1rem;
    width: 100%;
    height: 2.5rem;
    margin: 5px 0;
    background: ${({ isCorrect, isClicked }) =>
      isCorrect
        ? "linear-gradient(90deg, #56ffa4, #59bc86)"
        : !isCorrect && isClicked
        ? "linear-gradient(90deg, #ff5656, #c16868)"
        : "linear-gradient(90deg, #56ccff, #6eafb4)"};
    border-radius: 10px;
    color: #fff;
  }
`
