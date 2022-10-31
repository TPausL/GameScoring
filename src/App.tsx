import { IonPage, setupIonicReact } from "@ionic/react";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import Home from "./pages/Home";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Moelkky from "./pages/Moelkky";
import GameContextProvider from "./providers/GameProvider";
import { Grommet, Nav } from "grommet";
import theme from "./theme";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import TabIcon from "./components/TabIcon";
import Header from "./components/Header";
import "./App.css";
import "react-spring-bottom-sheet/dist/style.css";
import Tabs from "./components/Tabs";
import TakeSix from "./pages/TakeSix";

setupIonicReact();
const App: React.FC = () => (
  <Grommet plain theme={theme} style={{ fontFamily: "Asap" }}>
    <GameContextProvider>
      <IonPage>
        <BrowserRouter>
          <Header />
          <div
            style={{
              height: "100%",
              overflow: "scroll",
              marginBottom: 72,
              marginTop: 64,
            }}
          >
            <Routes>
              <Route
                path="games*"
                element={
                  <>
                    <Routes>
                      <Route path="" element={<Home />} />
                      <Route path="moelkky" element={<Moelkky />} />
                      <Route path="takesix" element={<TakeSix />} />
                    </Routes>
                  </>
                }
              />
              <Route path="history*" element={<History />} />
              <Route path="settings*" element={<Settings />} />
              <Route path="/" element={<Navigate to="/games" replace />} />
            </Routes>
          </div>
          <Tabs />
        </BrowserRouter>
      </IonPage>
    </GameContextProvider>
  </Grommet>
);

export default App;
