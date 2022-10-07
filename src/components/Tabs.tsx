import { Nav } from "grommet";
import { HomeRounded, History, Configure } from "grommet-icons";
import { compact } from "lodash";
import { useLocation } from "react-router";
import TabIcon from "./TabIcon";

export default function Tabs() {
  return (
    <Nav
      justify="evenly"
      style={{ position: "fixed", bottom: 0, width: "100%" }}
      direction="row"
      background="brand"
      pad="medium"
    >
      <TabIcon icon={HomeRounded} label="Home" link="/games" />
      <TabIcon icon={History} label="History" link="/history" />
      <TabIcon icon={Configure} label="Settings" link="/settings" />
    </Nav>
  );
}
