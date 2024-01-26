import classNames from "classnames";
import React, { ReactNode } from "react";


interface IPropsButton {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  outline?: boolean;
}

const Button = (props: IPropsButton) => {
  const {className,children, onClick, outline = false} = props;

  // color #ffffff
  // background image radial-gradient(ellipse farthest-corner at top left, #c41417 0%, #b31315 100%)

  // color #6f6f6f
  //   hover color #c41417
  return <button className={classNames("rounded-[8px] text-[30px] px-8 py-4 text-white hover:scale-105",{"!text-[#6f6f6f] hover:!text-[#c41417]":outline}, className)}
  style={
    outline ? {}
    : {
      backgroundImage: `radial-gradient(ellipse farthest-corner at top left, #c41417 0%, #b31315 100%)`
    }
  }
  onClick={onClick}>{children}</button>;
};

export default Button;
