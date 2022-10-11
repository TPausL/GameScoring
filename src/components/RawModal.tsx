import { normalizeColor } from "grommet/utils";
import React, { SVGProps, useContext } from "react";
import theme from "../theme";
import Modal from "react-modal";
import { Box, ThemeContext, ThemeType } from "grommet";
import { Icon, IconProps } from "grommet-icons";

function RawModal({
  icon,
  iconProps,
  style,
  children,
  ...rest
}: Modal.Props & {
  icon?: Icon;
  iconProps?: IconProps & SVGProps<SVGSVGElement>;
}) {
  const Icon = icon;
  let iconStyle, iconRest;
  if (iconProps) {
    iconStyle = iconProps.style;
    const { style: weg, ...r } = iconProps;
    iconRest = r;
  }
  return (
    <Modal
      closeTimeoutMS={500}
      style={{
        content: {
          fontFamily: "Asap",
          maxWidth: "80%",
          border: "none",
          borderRadius: 12,
          boxShadow: "2px 4px 10px grey",
          background: normalizeColor("background-front", theme),
          height: "fit-content",
          position: "unset",
          ...style?.content,
        },
        overlay: {
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          ...style?.overlay,
        },
      }}
      {...rest}
    >
      <Box style={{ position: "relative" }} align="center">
        {Icon ? (
          <Icon
            size="large"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              opacity: 0.3,
              ...iconStyle,
            }}
            {...iconProps}
          />
        ) : (
          <></>
        )}
        {children}
      </Box>
    </Modal>
  );
}

export default RawModal;
