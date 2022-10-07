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
import { Box, Button, Grid, Main } from "grommet";
import { range } from "lodash";
import tinycolor from "tinycolor2";
import { Edit, FormNext, FormPrevious, Launch } from "grommet-icons";

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
      <Main background="background" justify="between">
        <Carousel
          slideIndex={index}
          wrapAround
          style={{ paddingBottom: 32, height: "100%" }}
          defaultControlsConfig={{
            nextButtonText: "›",
            nextButtonStyle: {
              background: "transparent",
              fontSize: 50,
              color: "black",
            },
            prevButtonText: "‹",
            prevButtonStyle: {
              background: "transparent",
              fontSize: 50,
              color: "black",
            },
          }}
          renderCenterLeftControls={(props) => (
            <FormPrevious
              style={{ cursor: "pointer" }}
              size="32px"
              onClick={() =>
                props.goToSlide((props.currentSlide - 1) % props.slideCount)
              }
            />
          )}
          renderCenterRightControls={(props) => (
            <FormNext
              style={{ cursor: "pointer" }}
              size="32px"
              onClick={() =>
                props.goToSlide((props.currentSlide + 1) % props.slideCount)
              }
            />
          )}
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
                    game.points(game.players[index], PA.addP, v + 1);
                    setTimeout(() => {
                      setIndex((index + 1) % game.players.length);
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
