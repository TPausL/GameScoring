import { Card, CardBody, CardHeader, Heading, Text } from "grommet";
import { Icon } from "grommet-icons";
import { Link } from "react-router-dom";
import { ReactComponent as Moelkky } from "../icons/Moelkky.svg";
export default function GameCard({
  name,
  desc,
  link,
  ...rest
}: {
  name: string;
  icon: Icon;
  link: string;
  desc: string;
}) {
  return (
    <Link
      to={link}
      style={{ width: "calc(50% - 24px)", margin: 8, minHeight: "15vh" }}
    >
      <Card
        pad="medium"
        fill
        background="secondary"
        style={{ position: "relative" }}
      >
        <Moelkky
          style={{
            position: "absolute",
            top: "2vw",
            right: "2vw",
            zIndex: 10,
            opacity: 0.5,
            width: "7vh",
          }}
          fill="#BF1363"
          stroke="#CCCCCC"
        />
        <CardHeader style={{ zIndex: 11 }}>
          <Heading level={3}>{name}</Heading>
        </CardHeader>
        <CardBody style={{ zIndex: 11 }}>
          <Text color="text-weak">{desc}</Text>
        </CardBody>
      </Card>
    </Link>
  );
}
