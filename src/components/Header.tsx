import { Header, Heading } from "grommet";
import { compact } from "lodash";
import { useLocation, useNavigation } from "react-router";

export default function CustomHeader() {
  const location = useLocation();

  const getText = (path: string) => {
    const arr = compact(path.split("/"));
    console.log(arr);
    if (arr[0] == "games") {
      if (arr[1] == "moelkky") {
        return "Moellky";
      } else {
        return "Home";
      }
    }
    return "GameScoring";
  };
  return (
    <Header
      background="brand"
      style={{ position: "fixed", top: 0, width: "100%", height: 64 }}
    >
      <Heading margin="small" level={2}>
        {getText(location.pathname)}
      </Heading>
    </Header>
  );
}
