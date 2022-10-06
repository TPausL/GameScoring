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
import { Box, Button, Grid, Main, Text } from "grommet";
import { Add } from "grommet-icons";
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

  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
  console.log("home");
  return (
    <Main background="background-back" height="100%">
      <Text margin={{ left: "8px", top: "12px" }}> Players </Text>
      <Box direction="row" margin={{ top: "8px", left: "4px" }} wrap>
        {players.map((p) => (
          <PlayerChip
            key={p.id}
            name={p.name}
            color={p.color}
            active={includes(activePlayers, p.id)}
            onClick={() => toggleActive(p.id)}
            onDelete={() => removePlayer(p.id)}
          />
        ))}
        <Button
          onClick={() => setModalOpen(true)}
          primary
          color="#aaa"
          style={{ height: 38, padding: 8, margin: 4 }}
        >
          <Add />
        </Button>
      </Box>
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
      <PlayerModal
        isOpen={modalOpen}
        onConfirm={addPlayer}
        onClose={() => setModalOpen(false)}
      />
    </Main>
  );
};

export default Home;
