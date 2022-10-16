import { Button, Heading, Text } from "grommet";
import React, { useEffect, useState } from "react";
import RawModal from "./RawModal";

function PlayerCountModal({
  isOpen,
  game,
  max,
  min = 1,
  cur,
  custom,
  onClose,
}: {
  isOpen: boolean;
  max?: number;
  min?: number;
  cur: number;
  game: string;
  custom?: number[];
  onClose?: () => void;
}) {
  const [open, setOpen] = useState<boolean>(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  const getText = () => {
    if (custom) {
      return `Please select ${custom.map((n, i) =>
        i === custom.length - 1
          ? `${n} `
          : i === custom.length - 2
          ? `${n} or `
          : `${n}, `
      )} players`;
    }
    if (max === min) {
      return `In order to play ${game} select exactly ${min} players!`;
    }
    if (max) {
      return `In order to play ${game} select between ${min} and ${max} players!\n You selected ${cur}`;
    } else {
      return `In order to play ${game} select at least ${
        min - cur
      } more players!`;
    }
  };
  return (
    <RawModal isOpen={open} style={{ content: { justifyContent: "center" } }}>
      <Text size="large">{getText()}</Text>
      <Button
        primary
        label="OK"
        margin={{ top: "medium" }}
        onClick={() => {
          setOpen(false);
          onClose && onClose();
        }}
      />
    </RawModal>
  );
}

export default PlayerCountModal;
