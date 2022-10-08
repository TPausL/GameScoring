import { GameContext, GameContextType } from "../providers/GameProvider";
import { IonButton, IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import { useContext } from "react";
import Player from "../providers/Player";
import { nextTick } from "process";
import { play } from "ionicons/icons";
import tinycolor from "tinycolor2";
import { Box, Header, Heading, Text } from "grommet";
import { FormNext, Launch, Next } from "grommet-icons";
export interface PlayerSlideProps {
  children?: React.ReactNode;
  player: Player;
  next(): void;
}

export default function PlayerSlide({
  children,
  player,
  next,
}: PlayerSlideProps) {
  return (
    <div
      style={{
        position: "relative",
        height: "calc(100% - 32px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: tinycolor(player.color).setAlpha(0.7).toHex8String(),
      }}
    >
      <Heading level={2}>{player.name}</Heading>
      <p style={{ fontSize: 60, fontWeight: "bold", margin: 0 }}>
        {player.points}
      </p>

      <Launch
        color="status-critical"
        style={{
          position: "absolute",
          top: `${
            85 - (player.negativePoints <= 2 ? player.negativePoints : 3.5) * 33
          }%`,
          left: 0,
          transform: "translateX(80%)",
          transition: "1s cubic-bezier(0.32, 0, 0.67, 0)",
        }}
        size="large"
      />
    </div>
  );
}
