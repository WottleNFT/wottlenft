import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonButtons,
  IonMenuButton,
  IonMenuToggle,
} from "@ionic/react";
import { construct, personCircle, cash, storefront } from "ionicons/icons";

function SideMenu() {
  return (
    <IonMenu menuId="side-menu" contentId="main" side="end">
      <IonHeader>
        <IonToolbar>
          <IonTitle className="font-serif text-black">WottleNFT</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle>
            <IonItem routerLink="/coming-soon">
              <IonIcon color="primary" icon={storefront} slot="start" />
              <IonLabel>Market Place</IonLabel>
            </IonItem>
            <IonItem routerLink="/coming-soon">
              <IonIcon color="primary" icon={cash} slot="start" />
              <IonLabel>Auction</IonLabel>
            </IonItem>
            <IonItem routerLink="/mint-nft">
              <IonIcon color="primary" icon={construct} slot="start" />
              <IonLabel>Mint NFTs</IonLabel>
            </IonItem>
            <IonItem routerLink="/user-nfts">
              <IonIcon color="primary" icon={personCircle} slot="start" />
              <IonLabel>Profile</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

export const MenuButton = ({ ...props }) => (
  <IonButtons {...props}>
    <IonMenuButton slot="end" />
  </IonButtons>
);

export default SideMenu;
