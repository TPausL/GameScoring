import { GameContext, GameContextType } from "../providers/GameProvider";
import { IonButton, IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import { useContext } from "react";
import Player from "../providers/Player";
import { nextTick } from "process";
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
  const game = useContext<GameContextType>(GameContext);
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ width: "100%", textAlign: "center", fontWeight: "normal" }}>
        {player.name}
      </h1>
      <p style={{ fontSize: 60, fontWeight: "bold", margin: 0 }}>
        {player.points}
      </p>
      <div style={{ display: "flex", alignItems: "center" }}>
        Failed Attempts:
        {Array(player.negativePoints)
          .fill("I")
          .map((o) => o)}
        <IonButton
          onClick={() => {
            player.addNegativePoints(1);
            if (player.negativePoints > 2) {
              game.playerLost(player);
            } else {
              next();
            }
          }}
        >
          +
        </IonButton>
      </div>
    </div>
  );
}
