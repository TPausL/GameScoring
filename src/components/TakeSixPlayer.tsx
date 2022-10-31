import { Box, Button, Heading, TextInput } from "grommet";
import { useContext, useState } from "react";
import Player from "../providers/Player";
import Tally from "./Tally";
import { normalizeColor } from "grommet/utils";
import theme from "../theme";
import { GameContext, PA } from "../providers/GameProvider";
import { Checkmark } from "grommet-icons";
function TakeSixPlayer({ player }: { player: Player }) {
  const game = useContext(GameContext);
  const [textInput, setTextInput] = useState(0);
  return (
    <Box
      style={{
        height: "15vh",
        background: player.color,
      }}
      direction="row"
      align="center"
      justify="around"
    >
      <Heading level={3}>{player.name}</Heading>
      <div style={{ display: "flex", alignItems: "end" }}>
        <Heading margin="0" level={2}>
          {player.points}
        </Heading>
        <div style={{ alignItems: "center", display: "flex" }}>
          <Tally
            stroke={normalizeColor("text", theme)}
            count={player.negativePoints}
            strokeWidth={50}
            viewHeight={300}
            height="16px"
            display={"inline"}
            style={{ margin: 2 }}
          ></Tally>
        </div>
        <div style={{ display: "flex" }}>
          <TextInput
            type={"number"}
            style={{ border: "none", boxShadow: "none", background: "" }}
            focusIndicator={false}
            onChange={(e) => {
              setTextInput(Number(e.target.value));
              console.log("type");
            }}
          />
        </div>
        <Button
          icon={<Checkmark />}
          onClick={() => {
            game.points(player, PA.addP, textInput);
            console.log("click");
          }}
          style={{ margin: 2 }}
        />
      </div>
    </Box>
  );
}

export default TakeSixPlayer;
