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
import { home, personCircle, search, construct } from "ionicons/icons";

function SideMenu() {
  return (
    <IonMenu menuId="side-menu" contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle className="text-black font-serif">Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle>
            <IonItem routerLink="/">
              <IonIcon color="primary" icon={home} slot="start" />
              <IonLabel>Home</IonLabel>
            </IonItem>
            <IonItem routerLink="/auctions">
              <IonIcon color="primary" icon={search} slot="start" />
              <IonLabel>Explore Auctions</IonLabel>
            </IonItem>
            <IonItem routerLink="/">
              <IonIcon color="primary" icon={personCircle} slot="start" />
              <IonLabel>Profile</IonLabel>
            </IonItem>
            <IonItem routerLink="/mint-nft">
              <IonIcon color="primary" icon={construct} slot="start" />
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
    <IonMenuButton slot="start" />
  </IonButtons>
);

export default SideMenu;
