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
} from '@ionic/react';
import { home, personCircleOutline, searchOutline } from 'ionicons/icons';

function SideMenu({ contentId }: { contentId: string }) {
  return (
    <IonMenu menuId={`${contentId}-side-menu`} contentId={contentId}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle>
            <IonItem routerLink="/">
              <IonIcon icon={home} slot="start" />
              <IonLabel>Home</IonLabel>
            </IonItem>
            <IonItem routerLink="/">
              <IonIcon icon={searchOutline} slot="start" />
              <IonLabel>Explore Auctions</IonLabel>
            </IonItem>
            <IonItem routerLink="/">
              <IonIcon icon={personCircleOutline} slot="start" />
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
