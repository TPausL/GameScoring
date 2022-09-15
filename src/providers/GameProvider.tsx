import { createContext, useState } from "react";
import { Player } from "../pages/Home";
import { map, extend } from "lodash";

export interface ActivePlayer extends Player {
  points: number;
}

export type GameContextType = {
  setPlayers: (ps: Player[]) => void;
  players: Player[];
  setPoints: (p: ActivePlayer, n: number) => void;
  addPoints: (p: ActivePlayer, n: number) => void;
  subPoints: (p: ActivePlayer, n: number) => void;
};
export const GameContext = createContext<GameContextType>({
  setPlayers: () => undefined,
  players: [],
  setPoints: () => undefined,
  addPoints: () => undefined,
  subPoints: () => undefined,
});

export default function GameContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [players, setActivePlayers] = useState<ActivePlayer[]>([]);

  const setPlayers = (ps: Player[]) => {
    setActivePlayers(map(ps, (p: Player) => extend({ points: 0 }, p)));
  };

  const setPoints = (player: ActivePlayer, n: number) => {
    setActivePlayers(
      players.map((p: ActivePlayer) =>
        player.id === p.id ? { ...p, points: n } : p
      )
    );
  };

  const addPoints = (player: ActivePlayer, n: number) => {
    setActivePlayers(
      players.map((p: ActivePlayer) =>
        player.id === p.id ? { ...p, points: p.points + n } : p
      )
    );
  };
  const subPoints = (player: ActivePlayer, n: number) => {
    setActivePlayers(
      players.map((p: ActivePlayer) =>
        player.id === p.id ? { ...p, points: p.points - n } : p
      )
    );
  };

  return (
    <GameContext.Provider
      value={{ setPlayers, players, setPoints, addPoints, subPoints }}
    >
      {children}
    </GameContext.Provider>
  );
}
