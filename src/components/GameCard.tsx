import { Button, Card, CardBody, CardHeader, Heading, Text } from "grommet";
import { Icon as IconDef } from "grommet-icons";
import { Link } from "react-router-dom";
export default function GameCard({
  name,
  desc,
  Icon,
  onClick,
  iconProps,
  ...rest
}: {
  name: string;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  onClick: () => void;
  desc: string;
  iconProps?: React.SVGProps<SVGSVGElement> & { title?: string };
}) {
  let iconStyle,
    iconRest = {};
  if (iconProps) {
    const { style, ...rest } = iconProps;
    iconStyle = style;
    iconRest = rest;
  }
  return (
    <Button
      onClick={onClick}
      style={{ width: "calc(50% - 24px)", margin: 8, minHeight: "15vh" }}
    >
      <Card
        pad="medium"
        fill
        background="secondary"
        style={{ position: "relative" }}
      >
        <Icon
          style={{
            position: "absolute",
            top: "2vw",
            right: "2vw",
            zIndex: 10,
            opacity: 0.5,
            width: "7vh",
            ...iconStyle,
          }}
          fill="#BF1363"
          stroke="#CCCCCC"
          {...iconRest}
        />
        <CardHeader style={{ zIndex: 11 }}>
          <Heading level={3}>{name}</Heading>
        </CardHeader>
        <CardBody style={{ zIndex: 11 }}>
          <Text color="text-weak">{desc}</Text>
        </CardBody>
      </Card>
    </Button>
  );
}
