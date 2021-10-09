import { IonContent, IonLabel } from "@ionic/react";

import { Meta } from "../layout/Meta";
import { Main } from "../templates/Main";

const About = () => (
  <Main meta={<Meta title="About" description="Wottlenft About" />}>
    <IonContent className="text-center">
      <IonLabel color="primary" className="text-5xl">
        Wottlenft
      </IonLabel>
      <div className="p-12 flex flex-col gap-5">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fuga
          recusandae quidem. Quaerat molestiae blanditiis doloremque possimus
          labore voluptatibus distinctio recusandae autem esse explicabo
          molestias officia placeat, accusamus aut saepe.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fuga
          recusandae quidem. Quaerat molestiae blanditiis doloremque possimus
          labore voluptatibus distinctio recusandae autem esse explicabo
          molestias officia placeat, accusamus aut saepe.
        </p>
      </div>
    </IonContent>
  </Main>
);

export default About;
