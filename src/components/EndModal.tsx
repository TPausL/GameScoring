import { IonItem, IonLabel, IonList, IonModal } from "@ionic/react";
import { Box, Button, Heading, Text } from "grommet";
import { BarChart } from "grommet-icons";
import { reverse } from "lodash";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import tinycolor from "tinycolor2";
import GameContextProvider, {
  GameContext,
  GameContextType,
} from "../providers/GameProvider";
import RawModal from "./RawModal";

export default function EndModal({
  open,
  onClose,
  texts,
}: {
  open: boolean;
  onClose: () => void;
  texts?: {
    win?: string;
    lose?: string;
    rest?: string;
  };
}) {
  const game = useContext<GameContextType>(GameContext);
  const [isOpen, setIsOpen] = useState<boolean>(open);
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  function close() {
    setIsOpen(false);
    onClose && onClose();
  }
  return (
    <RawModal
      isOpen={isOpen}
      icon={BarChart}
      style={{ content: { width: "90%" } }}
    >
      <Heading color="text">Results</Heading>
      {game.wonPlayers.length > 0 ? (
        <>
          <Text color="status-ok">
            {texts?.win ?? "The following players won:"}
          </Text>
          {game.wonPlayers.map((p, i) => (
            <span>
              <Text size="large" weight="bold">
                {i + 1}.
              </Text>
              <Text size="large">{"\t\t" + p.name}</Text>
            </span>
          ))}
          <div
            style={{
              backgroundColor: tinycolor("grey").setAlpha(0.4).toHex8String(),
              height: 1,
              width: "calc(100% - 16px)",
              margin: 8,
            }}
          ></div>
        </>
      ) : (
        <></>
      )}
      {game.lostPlayers.length ? (
        <>
          <Text color="status-critical">
            {texts?.lose ?? "The following players lost:"}
          </Text>
          {game.lostPlayers.map((p, i) => (
            <span>
              <Text size="large" weight="bold">
                •
              </Text>
              <Text size="large">{"\t\t" + p.name}</Text>
            </span>
          ))}
        </>
      ) : (
        <></>
      )}
      <Box direction="row" justify="between" fill pad={{ top: "large" }}>
        <Button
          primary
          label={"Restart"}
          onClick={() => {
            game.reset();
            setIsOpen(false);
          }}
        />
        <Button
          secondary
          label={"Main Menu"}
          onClick={() => {
            game.reset();
            navigate("/games");
          }}
        />
      </Box>
    </RawModal>
  );
}
