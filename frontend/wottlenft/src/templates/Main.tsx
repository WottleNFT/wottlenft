import React, { ReactNode } from 'react';

import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';

import SideMenu, { MenuButton } from '../Components/SideMenu';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div>
    {props.meta}
    <SideMenu />
    <IonPage id="main">
      <IonHeader className="ion-no-border h-1/6">
        <IonToolbar color="primary" className="h-1/2">
          <div className="flex flex-row">
            <MenuButton />
            <IonTitle>Wottlenft</IonTitle>
          </div>

          <IonButtons slot="end">
            <IonButton routerLink="/about">About</IonButton>
            <IonButton routerLink="/">
              <IonIcon size="large" icon={personCircleOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {props.children}
    </IonPage>
  </div>
);

export { Main };
