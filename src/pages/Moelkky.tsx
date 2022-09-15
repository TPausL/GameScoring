import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { useContext } from "react";
import { GameContext } from "../providers/GameProvider";

export default function Moelkky() {
  const game = useContext(GameContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Moelkky</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {game.players.map((p) => (
          <div>{p.name}</div>
        ))}
      </IonContent>
    </IonPage>
  );
}
