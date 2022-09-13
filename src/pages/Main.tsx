import { IonPage, IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import Moelkky from "./Moelkky";
import Home from "./Home";

export default function Main() {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Route exact path="/games">
          <Home />
        </Route>
        <Route path="/games/moelkky">hello</Route>
      </IonRouterOutlet>
    </IonPage>
  );
}
