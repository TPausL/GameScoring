import { createContext, useState } from "react";
import { Player } from "../pages/Home";
import { map, extend } from "lodash";

export interface ActivePlayer extends Player {
  points: number;
  negativePoints: number;
}

export type GameContextType = {
  setPlayers: (ps: Player[]) => void;
  players: ActivePlayer[];
  setPoints: (p: ActivePlayer, n: number) => void;
  addPoints: (p: ActivePlayer, n: number) => void;
  subPoints: (p: ActivePlayer, n: number) => void;
  reset: () => void;
};
export const GameContext = createContext<GameContextType>({
  setPlayers: () => undefined,
  players: [],
  setPoints: () => undefined,
  addPoints: () => undefined,
  subPoints: () => undefined,
  reset: () => undefined,
});

export default function GameContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [players, setActivePlayers] = useState<ActivePlayer[]>([]);

  const setPlayers = (ps: Player[]) => {
    setActivePlayers(
      map(ps, (p: Player) => extend({ points: 0, negativePoints: 0 }, p))
    );
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

  const reset = () => {
    setPlayers(players.map((p) => ({ ...p, points: 0, negativePoints: 0 })));
  };

  return (
    <GameContext.Provider
      value={{ setPlayers, players, setPoints, addPoints, subPoints, reset }}
    >
      {children}
    </GameContext.Provider>
  );
}
