import { createContext, useRef, useState } from "react";
import { Player as RawPlayer } from "../pages/Home";
import { map, filter, forEach } from "lodash";
import Player from "./Player";

export type GameContextType = {
  setPlayers: (ps: RawPlayer[]) => void;
  players: Player[];
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
});

export default function GameContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activePlayers, setActivePlayers] = useState<Player[]>([]);
  const [lostPlayers, setLostPlayers] = useState<Player[]>([]);
  const [wonPlayers, setWonPlayers] = useState<Player[]>([]);

  const sortedIds = useRef<string[]>([]);

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
    console.log(ps);
    setPlayers(ps);
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
