import { IonItem, IonLabel, IonList, IonModal } from "@ionic/react";
import { reverse } from "lodash";
import { useContext, useEffect, useRef } from "react";
import GameContextProvider, {
  GameContext,
  GameContextType,
} from "../providers/GameProvider";

export default function WinModal({ open }: { open: boolean }) {
  const modRef = useRef<HTMLIonModalElement>(
    undefined as unknown as HTMLIonModalElement
  );

  const game = useContext<GameContextType>(GameContext);

  useEffect(() => {
    open ? modRef.current?.present() : modRef.current?.dismiss();
  }, [open]);

  let currentPlace = 0;
  return (
    <IonModal id="winModal" ref={modRef}>
      <IonList>
        {game.wonPlayers.map((p) => {
          currentPlace++;
          return (
            <IonItem>
              <IonLabel>{`${currentPlace} ${p.name}`}</IonLabel>
            </IonItem>
          );
        })}
        {game.players.map((p) => {
          currentPlace++;
          return (
            <IonItem>
              <IonLabel>{`${currentPlace} ${p.name}`}</IonLabel>
            </IonItem>
          );
        })}
        {reverse(game.lostPlayers).map((p) => {
          currentPlace++;
          return (
            <IonItem>
              <IonLabel>{`${currentPlace} ${p.name}`}</IonLabel>
            </IonItem>
          );
        })}
      </IonList>
    </IonModal>
  );
}
