import { ComponentProps, forwardRef } from "react";
import clsx from "clsx";

interface Props extends ComponentProps<"input"> {
  full: boolean;
}

const Input = forwardRef<HTMLInputElement, Props>(function BaseInput(
  { full, className, disabled, ...props },
  ref,
) {
  return (
    <input
      {...props}
      ref={ref}
      className={clsx(
        className,
        disabled && "cursor-not-allowed bg-light/40",
        full && "w-full",
        "input-primary",
      )}
    />
  );
});

export default Input;
