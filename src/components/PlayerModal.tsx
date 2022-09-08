import {IonModal,IonContent, IonLabel, IonInput, IonItem, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle} from "@ionic/react"
import {useState,useRef} from "react"
import {HexColorPicker} from "react-colorful"

export default function PlayerModal({onConfirm}: {onConfirm: (name: string, color:string) => void} )  {

    const modal = useRef<HTMLIonModalElement>(null);

    const [name,setName] = useState<string>("");
    const [color, setColor] = useState<string>("#c650aa");
    
    function confirm() {
      onConfirm(name,color);
      modal.current?.dismiss({name,color}, 'confirm');
    }


    return (
<IonModal ref={modal} trigger="open-player-modal" breakpoints={[0,0.6,0.8]} initialBreakpoint={0.4}>              
  <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>  
  <IonContent className="ion-padding">
    
      
      <IonInput value={name} onIonChange={(e) => setName(e.detail.value!)} placeholder="Name..."></IonInput>
    
    <HexColorPicker style={{marginTop: 8, width:"100%",height: "25%"  }} color={color} onChange={setColor} />
  </IonContent> 
</IonModal>)


}
