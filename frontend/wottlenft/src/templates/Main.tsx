import React, { ReactNode } from 'react';

import {
  IonApp,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';

import SideMenu from '../Components/SideMenu';

type IMainProps = {
  meta: ReactNode;
  contentId: string;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <IonApp>
    {props.meta}
    <SideMenu contentId={props.contentId} />
    <IonPage>
      <IonHeader className="ion-no-border h-1/6">
        <IonToolbar color="primary" className="h-1/2">
          <div className="flex flex-row">
            <IonMenuButton
              menu={`${props.contentId}-side-menu`}
            ></IonMenuButton>
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
  </IonApp>
);

export { Main };
