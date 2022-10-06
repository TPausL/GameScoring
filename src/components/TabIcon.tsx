import { Box, Text } from "grommet";
import { Icon } from "grommet-icons";
import { unset } from "lodash";
import { NavLink } from "react-router-dom";

export default function TabIcon({
  link,
  label,
  ...rest
}: {
  link: string;
  icon: Icon;
  label: string;
}) {
  return (
    <NavLink to={link} style={{ textDecoration: "none", color: "unset" }}>
      {({ isActive }) => (
        <Box
          align="center"
          style={{
            position: "relative",
            transition: ".1s ease-in-out",
            transform: isActive ? "translateY(-15px)" : "unset",
          }}
        >
          <rest.icon />
          <Text> {label}</Text>
          <Box
            background="background-front"
            style={{
              zIndex: -1,
              position: "absolute",
              height: 72,
              width: 72,
              borderRadius: "50%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "unset",
            }}
          ></Box>
        </Box>
      )}
    </NavLink>
  );
}
