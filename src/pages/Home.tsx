import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import {IonGrid,IonCol,IonRow,IonButton} from "@ionic/react"; 

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>GameScoring</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>  
      <IonGrid>
        <IonRow>
          <IonCol size="6">
            <IonButton  href="/moelkky" style={{height: "10vh"}} expand="block">
             <div> Mölkky </div>
            </IonButton>
          </IonCol>
          <IonCol size="6"><IonButton>
              6 Nimmt
            </IonButton></IonCol>
        </IonRow>
        <IonRow>
          <IonCol></IonCol>
          <IonCol></IonCol>
        </IonRow>
      </IonGrid>
      </IonContent> 	
    </IonPage>
  );
};

export default Home
