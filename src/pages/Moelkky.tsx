import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/react";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { GameContext, PA } from "../providers/GameProvider";
import Player from "../providers/Player";
import PlayerSlide from "../components/PlayerSlide";
import Carousel from "nuka-carousel";

import "./slider.css";
import WinModal from "../components/WinModal";
import { Box, Button, Grid, Main, Text } from "grommet";
import { range } from "lodash";
import tinycolor from "tinycolor2";
import { Edit, FormNext, FormPrevious, Launch, Next } from "grommet-icons";

export default function Moelkky() {
  const game = useContext(GameContext);
  const [ap, setAp] = useState<Player>(game.players[0]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [index, setIndex] = useState<number>(0);
  useEffect(() => {
    setAp(game.players[index]);
  }, [index]);

  useEffect(() => {
    if (game.players.length <= 1) {
      setModalOpen(true);
    }
  }, [game.players]);
  return (
    <>
      <Main
        background="background"
        justify="between"
        style={{ position: "relative" }}
      >
        <Carousel
          slideIndex={index}
          wrapAround
          style={{ paddingBottom: 32, height: "100%" }}
          renderCenterLeftControls={(props) => (
            <Box
              justify="around"
              style={{
                height: "calc(100% - 64px)",
                zIndex: 100,
                position: "absolute",
                top: 0,
                left: 8,
              }}
            >
              <Box direction="row" align="center">
                <Text color="text-weak" size="large">
                  2
                </Text>
                <Next color="text-weak" />
              </Box>
              <Box direction="row" align="center">
                <Text color="text-weak" size="large">
                  1
                </Text>
                <Next color="text-weak" />
              </Box>
              <Box direction="row" align="center">
                <Text color="text-weak" size="large">
                  0
                </Text>
                <Next color="text-weak" />
              </Box>
            </Box>
          )}
          renderCenterRightControls={() => <></>}
          afterSlide={(d) => setIndex(d)}
        >
          {game.players.map((p) => (
            <PlayerSlide
              next={() => setIndex((index + 1) % game.players.length)}
              key={p.id}
              player={p}
            />
          ))}
        </Carousel>
        <div style={{ position: "relative" }}>
          <Box
            background={tinycolor("#bf1363").darken().toHexString()}
            style={{
              position: "absolute",
              top: -64,
              height: 64,
              width: "100%",
            }}
            align="end"
          >
            <Button
              onClick={() => {
                const p = game.players[index];
                game.points(p, PA.addN, 1);
                setTimeout(() => {
                  if (p.negativePoints > 2) {
                    game.playerLost(p);
                  } else {
                    setIndex((index + 1) % game.players.length);
                  }
                }, 1500);
              }}
              margin="2px"
              style={{
                borderRadius: 4,
                width: "calc(25% - 2px)",
                height: "100%",
                marginRight: 0,
              }}
              primary
              color="#bf1363"
              label={<Launch />}
            />
          </Box>
          <Grid
            gap="2px"
            style={{
              background: tinycolor("#bf1363").darken().toHexString(),
            }}
            columns={{ count: 4, size: "auto" }}
          >
            {range(12).map((v) => (
              <Box height={window.innerWidth / 4 - 3 + "px"}>
                <Button
                  onClick={() => {
                    const p = game.players[index];
                    const ps = p.points + v + 1;
                    if (ps > 50) {
                      game.points(p, PA.setP, 25);
                    } else {
                      game.points(p, PA.addP, v + 1);
                    }
                    setTimeout(() => {
                      if (ps === 50) {
                        game.playerWon(p);
                      } else {
                        setIndex((index + 1) % game.players.length);
                      }
                    }, 500);
                  }}
                  fill
                  style={{ borderRadius: 4 }}
                  primary
                  color="#bf1363"
                  label={v + 1}
                ></Button>
              </Box>
            ))}
          </Grid>
        </div>
      </Main>
      <WinModal open={false} />
    </>
  );
}
