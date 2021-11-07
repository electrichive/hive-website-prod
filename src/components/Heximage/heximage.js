import React from "react";
import * as hexStyles from "./hex.module.css";

/**
 * Component for a Hex Image module (has an size, img, direction and theme prop)
 * @returns JSXElement 
 */

//hexImage div has inline style as the URL cannot be passed to css
export default function Heximage(props){

  //This determines the theme, size and direction.
  const theme = props.theme === "light" ? hexStyles.light : hexStyles.dark;
  const direction = props.direction === "right" ? hexStyles.right : hexStyles.left;
  const size = props.size === "large" ? hexStyles.large : "";

  return (
    <div className={`${hexStyles.hexContainer} ${size}`}>
      <div style={{backgroundImage:`url(${props.img})`}} className={hexStyles.hexImage}></div>
      <div className={`${direction} ${theme} ${hexStyles.hexImageBg}`}></div>
    </div>
  );
}