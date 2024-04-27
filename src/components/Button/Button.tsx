import {PropsWithChildren} from "react";

interface ButtonProps {
  onClick?: () => void,
  className?: string,
  disabled?: boolean
}

export function Button({onClick, children, className, disabled = false}: PropsWithChildren<ButtonProps>) {
  return <button className={"btn m-1 " + (className ? className : "btn-primary")} onClick={onClick} disabled={disabled}>{children}</button>;
}