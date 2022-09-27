import {
  ActivePlayer,
  GameContext,
  GameContextType,
} from "../providers/GameProvider";
import { IonButton, IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import { useContext } from "react";
export interface PlayerSlideProps {
  children?: React.ReactNode;
  player: ActivePlayer;
}

export default function PlayerSlide({ children, player }: PlayerSlideProps) {
  const { addPoints } = useContext<GameContextType>(GameContext);

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
      <div style={{}}> {Array.from("string")}</div>
    </div>
  );
}
