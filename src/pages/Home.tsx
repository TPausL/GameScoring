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
import { Game, GameContext } from "../providers/GameProvider";
import { Box, Button, Grid, Main, Text } from "grommet";
import { Add, Gamepad, Group, LocationPin } from "grommet-icons";
import { Divider } from "@react-md/divider";
import tinycolor from "tinycolor2";
import GameCard from "../components/GameCard";
import PlayerCountModal from "../components/PlayerCountModal";
import { useNavigate } from "react-router";
import { ReactComponent as MoelkkyIcon } from "../icons/Moelkky.svg";
import { ReactComponent as Take6Icon } from "../icons/Take6.svg";
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
  const navigate = useNavigate();
  const game = useContext(GameContext);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [playerCountData, setPlayerCountData] = useState<{
    isOpen: boolean;
    max?: number;
    min?: number;
    cur: number;
    game: string;
  }>({
    isOpen: false,
    cur: 0,
    max: 1,
    min: 1,
    game: "",
  });

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

  const startGame = (selection: Game) => {
    switch (selection) {
      case Game.Moelkky:
        if (game.players.length < 1) {
          setPlayerCountData({
            isOpen: true,
            min: 1,
            cur: game.players.length,
            game: "Moelkky",
          });
        } else {
          navigate("moelkky");
        }
        break;
      case Game.TakeSix:
        if (game.players.length < 2) {
          setPlayerCountData({
            isOpen: true,
            min: 2,
            cur: game.players.length,
            game: "Take 6!",
          });
        } else {
          navigate("takesix");
        }
        break;
    }
  };
  return (
    <Main
      background="background-back"
      height="100%"
      style={{ display: "block" }}
    >
      <Box
        direction="row"
        justify="start"
        align="center"
        margin={{ left: "large", top: "medium" }}
      >
        <Group />
        <Text color="text-xweak" margin={{ left: "xsmall" }}>
          Players
        </Text>
      </Box>
      <Box direction="row" margin={{ top: "8px", left: "12px" }} wrap>
        {players.map((p) => (
          <PlayerChip
            key={p.id}
            name={p.name}
            color={p.color}
            active={filter(game.players, (pl) => pl.id === p.id).length > 0}
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
      <div
        style={{
          backgroundColor: tinycolor("grey").setAlpha(0.4).toHex8String(),
          height: 1,
          width: "calc(100% - 16px)",
          margin: 8,
        }}
      ></div>
      <Box
        direction="row"
        justify="start"
        align="center"
        margin={{ left: "large", top: "medium" }}
      >
        <Gamepad />
        <Text color="text-xweak" margin={{ left: "xsmall" }}>
          Games
        </Text>
      </Box>
      <Box wrap width="100%" direction="row" justify="center">
        <GameCard
          desc="Throw a pin at other pins"
          name="Moelkky"
          Icon={MoelkkyIcon}
          onClick={() => startGame(Game.Moelkky)}
        />
        <GameCard
          desc="Take the 6th card"
          name="Take 6!"
          Icon={Take6Icon}
          iconProps={{ fill: "#ccc" }}
          onClick={() => startGame(Game.TakeSix)}
        />
      </Box>
      <PlayerModal
        isOpen={modalOpen}
        onConfirm={addPlayer}
        onClose={() => setModalOpen(false)}
      />
      <PlayerCountModal
        {...playerCountData}
        onClose={() =>
          setPlayerCountData({ ...playerCountData, isOpen: false })
        }
      />
    </Main>
  );
};

export default Home;
