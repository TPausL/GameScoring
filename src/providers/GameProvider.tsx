import { createContext, useEffect, useRef, useState } from "react";
import { Player as RawPlayer } from "../pages/Home";
import { map, filter, forEach, remove } from "lodash";
import Player from "./Player";
import { play } from "ionicons/icons";

export enum PA {
  addP,
  addN,
  subP,
  subN,
  setP,
  setN,
}

export type GameContextType = {
  setPlayers: (ps: RawPlayer[]) => void;
  players: Player[];
  points: (player: Player, action: PA, p: number) => void;
  reset: () => void;
  lostPlayers: Player[];
  playerLost: (p: Player) => void;
  wonPlayers: Player[];
  playerWon: (p: Player) => void;
};
export const GameContext = createContext<GameContextType>({
  setPlayers: () => undefined,
  players: [],
  reset: () => undefined,
  lostPlayers: [],
  playerLost: () => undefined,
  wonPlayers: [],
  playerWon: () => undefined,
  points: () => undefined,
});

export default function GameContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activePlayers, setActivePlayers] = useState<Player[]>([]);
  const [lostPlayers, setLostPlayers] = useState<Player[]>([]);
  const [wonPlayers, setWonPlayers] = useState<Player[]>([]);

  const [curPlayer, setCurPlayer] = useState<Player>(
    undefined as unknown as Player
  );

  const sortedIds = useRef<string[]>([]);

  useEffect(() => {
    if (!curPlayer && activePlayers.length) {
      setCurPlayer(activePlayers[0]);
    }
  }, [activePlayers]);

  const setPlayers = (ps: RawPlayer[]) => {
    setActivePlayers(
      map(ps, (p: RawPlayer) => {
        sortedIds.current = [...sortedIds.current, p.id];
        return new Player(p);
      })
    );
  };

  const reset = () => {
    console.log(activePlayers, wonPlayers, lostPlayers);
    const ps = [...activePlayers, ...wonPlayers, ...lostPlayers];
    console.log(ps);
    setWonPlayers([]);
    setLostPlayers([]);
    forEach(ps, (p) => p.reset());
    ps.sort(
      (a, b) =>
        sortedIds.current.indexOf(a.id) - sortedIds.current.indexOf(b.id)
    );
    setCurPlayer(ps[0]);
    setPlayers(ps);
  };

  const points = (player: Player, action: PA, points: number) => {
    console.log(activePlayers.indexOf(player));
    if (activePlayers.indexOf(player) < 0) return;
    switch (action) {
      case PA.setP:
        player.points = points;
        break;
      case PA.subP:
        player.points -= points;
        break;
      case PA.addP:
        player.points += points;
        break;
      case PA.setN:
        player.negativePoints = points;
        break;
      case PA.subN:
        player.negativePoints -= points;
        break;
      case PA.addN:
        player.negativePoints += points;
        break;
    }

    const index = activePlayers.indexOf(player);

    const newPlayers = [...filter(activePlayers, (p) => p.id !== player.id)];
    newPlayers.splice(index, 0, player);
    setActivePlayers(newPlayers);
  };

  const playerLost = (p: Player) => {
    console.log(lostPlayers);
    setActivePlayers(filter(activePlayers, (pl: Player) => p.id !== pl.id));
    setLostPlayers([...lostPlayers, p]);
  };

  const playerWon = (p: Player) => {
    setActivePlayers(filter(activePlayers, (pl: Player) => p.id !== pl.id));
    setWonPlayers([...wonPlayers, p]);
  };

  return (
    <GameContext.Provider
      value={{
        setPlayers,
        players: activePlayers,
        reset,
        lostPlayers,
        playerLost,
        wonPlayers,
        playerWon,
        points,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
