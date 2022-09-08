import {IonChip,useIonAlert} from "@ionic/react"
import tinycolor from "tinycolor2"
import {useLongPress} from "use-long-press"
const PlayerChip: React.FC<{name: string,color: string, active?: boolean, onClick: () => void, onDelete: () => void }> = ({name,active,color,onClick,onDelete}) => {
  const [presentAlert] = useIonAlert(); 
  const bind = useLongPress(()=> {
    presentAlert({ 
      header: "Do you want to delete the player?",
      buttons: [{ text: "No", role: "cancel"}, {text: "Yes", role: "confirm" ,handler: onDelete }]
    });
  });
    

return (<IonChip {...bind()}   style={{background: tinycolor(color).setAlpha(.3).toHex8String(), color: tinycolor(color).darken(10).toHex8String(), fontWeight: active ? "800" : "400"}} onClick={onClick}> {name}</IonChip>)
}

export default PlayerChip;
