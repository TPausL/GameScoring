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
import { GameContext } from "../providers/GameProvider";
import Player from "../providers/Player";
import PlayerSlide from "../components/PlayerSlide";
import Carousel from "nuka-carousel";

import "./slider.css";
import { wait } from "@testing-library/react";
import WinModal from "../components/WinModal";

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
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Moelkky</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div>
            <Carousel
              slideIndex={index}
              wrapAround
              style={{ paddingBottom: 32 }}
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
          </div>
          <div>
            <IonGrid
              style={{
                marginTop: "auto",
                padding: 18,
                paddingBottom: 32,
                display: "flex",
                width: "100%",
                height: (window.innerWidth * 3) / 4,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {[1, 2, 3].map((_v, i) => {
                return (
                  <IonRow
                    key={`ionRow${i}`}
                    style={{ width: "100%", display: "fley", flex: 1 }}
                  >
                    {[1, 2, 3, 4].map((_w, j) => {
                      return (
                        <IonCol key={`ionCol${i + 1 * j + 1}`}>
                          <IonButton
                            onClick={() => {
                              ap.addPoints(4 * i + 1 + j);
                              if (ap.points > 50) {
                                ap.points = 25;
                              }
                              setIndex((index + 1) % game.players.length);
                            }}
                            key={`ionButton${i + 1 * j + 1}`}
                            style={{ width: "100%", height: "100%" }}
                          >
                            {i * 4 + j + 1}
                          </IonButton>
                        </IonCol>
                      );
                    })}
                  </IonRow>
                );
              })}
            </IonGrid>
          </div>
        </div>
        <WinModal open={modalOpen} />
      </IonContent>
    </IonPage>
  );
}
