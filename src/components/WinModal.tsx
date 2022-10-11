import React, { useContext, useEffect, useState } from "react";
import Player from "../providers/Player";
import Modal from "react-modal";
import {
  Box,
  Button,
  Heading,
  List,
  Text,
  ThemeContext,
  ThemeType,
} from "grommet";
import { normalizeColor } from "grommet/utils";
import { Achievement, Close } from "grommet-icons";
import RawModal from "./RawModal";
function WinModal({
  player,
  reason,
  won,
  open,
  onClose,
  remaining,
}: {
  player: Player;
  reason: string;
  won?: boolean;
  open: boolean;
  onClose?: () => void;
  remaining?: Player[];
}) {
  const [isOpen, setIsOpen] = useState<boolean>(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  function close() {
    setIsOpen(false);
    onClose && onClose();
  }

  const Icon = won ? Achievement : Close;

  return (
    <RawModal
      isOpen={isOpen}
      icon={Icon}
      iconProps={{ color: won ? "status-ok" : "status-critical" }}
    >
      <Heading color="text">{`${player.name} ${
        won ? "finished" : "dropped out"
      }!`}</Heading>
      <Text style={{ alignSelf: "start" }}>{reason}</Text>
      {remaining?.length ? (
        <>
          <Heading level={3}>
            Remaing {remaining.length === 1 ? "is" : "are"}:
          </Heading>
          <List
            primaryKey="name"
            style={{ width: "100%" }}
            action={(item) => (
              <Text>
                {item.points} ({item.negativePoints} fail
                {item.negativePoints == 1 ? "" : "s"})
              </Text>
            )}
            data={remaining}
          />
        </>
      ) : (
        <></>
      )}
      <Button
        onClick={close}
        margin={{ top: "medium" }}
        style={{ padding: "8px" }}
        primary
      >
        Keep on playing!
      </Button>
    </RawModal>
  );
}

export default WinModal;
