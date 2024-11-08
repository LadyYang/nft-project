import React, { FC } from "react";
import { Button as SemiButton } from "@douyinfe/semi-ui";
import { ButtonProps } from "@douyinfe/semi-ui/lib/es/button/Button";
import clsx from "clsx";

const Button: FC<ButtonProps> = ({ className, ...props }) => (
  <SemiButton
    className={clsx(
      "bg-gradient-to-r from-violet-500 to-fuchsia-500 !text-white",
      className
    )}
    {...props}
  />
);

export default Button;
