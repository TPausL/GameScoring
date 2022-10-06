import {
  IonModal,
  IonContent,
  IonLabel,
  IonInput,
  IonItem,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
} from "@ionic/react";
import { Box, Button, FormField, Header, Text, TextInput } from "grommet";
import { rest } from "lodash";
import { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { BottomSheet } from "react-spring-bottom-sheet";
import tinycolor from "tinycolor2";
export default function PlayerModal({
  isOpen,
  onConfirm,
  onClose,
}: {
  isOpen: boolean;
  onConfirm: (name: string, color: string) => void;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>(tinycolor.random().toHexString());

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  function confirm() {
    onConfirm(name, color);
    reset();
  }

  function reset() {
    setOpen(false);
    setTimeout(() => {
      setName("");
      setColor(tinycolor.random().toHexString());
    }, 500);
  }

  useEffect(() => {
    if (!open) onClose();
  }, [open]);

  return (
    <BottomSheet
      onKeyDown={(e) => {
        if (e.key == "Enter") confirm();
      }}
      open={open}
      onDismiss={reset}
      snapPoints={(p) => [p.minHeight]}
      style={{ backgroundColor: "#fce7ae" }}
      header={
        <Header>
          <Button
            style={{ padding: 4 }}
            color="status-critical"
            focusIndicator={false}
            onClick={reset}
          >
            <Text>Cancel</Text>
          </Button>
          <Button
            onClick={confirm}
            focusIndicator={false}
            style={{ padding: 4 }}
            color="status-ok"
          >
            <Text>Save</Text>
          </Button>
        </Header>
      }
    >
      <Box pad="small" background="background">
        <TextInput
          style={{ border: "none", boxShadow: "none" }}
          focusIndicator={false}
          value={name}
          onChange={(e) => setName(e.target.value!)}
          placeholder="Name..."
        ></TextInput>

        <HexColorPicker
          style={{
            marginTop: 8,
            width: "100%",
            height: 300,
          }}
          color={color}
          onChange={setColor}
        />
      </Box>
    </BottomSheet>
  );
}
