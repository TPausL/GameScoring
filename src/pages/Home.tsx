import {
  IonList,
  IonListHeader,
  IonChip,
  IonIcon,
  IonLabel,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import { IonGrid, IonCol, IonRow, IonButton } from "@ionic/react";
import PlayerChip from "../components/PlayerChip";
import { useContext, useRef, useState, useEffect } from "react";
import { get, set } from "../utils/store";
import { includes, without } from "lodash";
import { add } from "ionicons/icons";
import PlayerModal from "../components/PlayerModal";
import { v4 as uuid } from "uuid";
import { filter } from "lodash";
import { GameContext } from "../providers/GameProvider";
export interface Player {
  name: string;
  color: string;
  id: string;
}
const Home: React.FC = () => {
  const [players, setPlayers] = useState<
    { name: string; id: string; color: string }[]
  >([]);
  const [activePlayers, setActivePlayers] = useState<string[]>([]);

  const game = useContext(GameContext);

  useEffect(() => {
    get("players").then((p: Player[]) => {
      if (p && p.length) {
        setPlayers(p);
      }
    });
  }, []);

  const toggleActive = (id: string): void => {
    if (includes(activePlayers, id)) {
      setActivePlayers(without(activePlayers, id));
    } else {
      setActivePlayers([...activePlayers, id]);
    }
  };
  useEffect(() => {
    game.setPlayers(
      filter(players, (p: Player) => activePlayers.includes(p.id))
    );
  }, [activePlayers]);
  const addPlayer = (name: string, color: string) => {
    const id = uuid();
    set("players", [...players, { name, color, id }]);
    setPlayers([...players, { name, color, id }]);
  };

  const removePlayer = (id: string) => {
    const newPlayers = filter(players, (o: Player, i: number) => {
      return o.id != id;
    });
    setPlayers(newPlayers);
    set("players", newPlayers);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>GameScoring</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          {players.map((p) => (
            <PlayerChip
              name={p.name}
              color={p.color}
              active={includes(activePlayers, p.id)}
              onClick={() => toggleActive(p.id)}
              onDelete={() => removePlayer(p.id)}
            />
          ))}

          <IonChip id="open-player-modal">
            <IonIcon icon={add} style={{ margin: 0 }}></IonIcon>
          </IonChip>
        </IonGrid>
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <IonButton
                routerLink="/games/moelkky"
                style={{ height: "10vh" }}
                expand="block"
              >
                Moelkky
              </IonButton>
            </IonCol>
            <IonCol size="6">
              <IonButton>6 Nimmt</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol></IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
        <PlayerModal onConfirm={addPlayer} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
