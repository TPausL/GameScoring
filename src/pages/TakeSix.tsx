import { List, Main, Text } from "grommet";
import React, { useContext } from "react";
import TakeSixPlayer from "../components/TakeSixPlayer";
import { GameContext } from "../providers/GameProvider";

function TakeSix() {
  const game = useContext(GameContext);
  return (
    <Main
      background="background"
      justify="between"
      style={{ position: "relative" }}
    >
      <div>
        {game.players.map((p) => {
          return <TakeSixPlayer player={p} />;
        })}
      </div>
    </Main>
  );
}

export default TakeSix;
