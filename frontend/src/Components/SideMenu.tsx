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
  IonMenuToggle,
} from "@ionic/react";
import {
  construct,
  personCircle,
  storefront,
  information,
} from "ionicons/icons";
import { GiHamburgerMenu } from "react-icons/gi";

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
            <IonItem routerLink="/nft-drops">
              <IonIcon color="primary" icon={storefront} slot="start" />
              <IonLabel>NFT Drops</IonLabel>
            </IonItem>
            <IonItem routerLink="/marketplace">
              <IonIcon color="primary" icon={storefront} slot="start" />
              <IonLabel>Marketplace</IonLabel>
            </IonItem>
            <IonItem routerLink="/guides">
              <IonIcon color="primary" icon={information} slot="start" />
              <IonLabel>Guides</IonLabel>
            </IonItem>
            <IonItem routerLink="/mint-nft">
              <IonIcon color="primary" icon={construct} slot="start" />
              <IonLabel>Mint NFTs</IonLabel>
            </IonItem>
            <IonItem routerLink="/profile">
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
    <IonMenuToggle menu="side-menu" slot="end">
      <GiHamburgerMenu className="text-3xl" />
    </IonMenuToggle>
  </IonButtons>
);

export default SideMenu;
