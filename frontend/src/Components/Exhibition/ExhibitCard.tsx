import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import Image from "next/image";

interface Props {
  image: StaticImageData;
  description: string;
  author: string;
  title: string;
}

const ExhibitCard = ({ image, description, author, title }: Props) => {
  return (
    <IonCard className="px-2 pt-3 m-0 rounded-3xl md:px-4">
      <div className="flex flex-col">
        <a
          href="https://trcl.sg/13-19-art-prize/auction/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="relative w-full aspect-w-1 aspect-h-1">
            <Image
              className="rounded-2xl"
              alt="Artwork"
              layout="fill"
              objectFit="cover"
              src={image}
            />
          </div>
        </a>
        <div className="flex flex-col justify-center w-full h-1/3">
          <IonCardHeader className="px-2 truncate">
            <IonCardTitle className="mb-2 text-base font-bold text-center truncate">
              {" "}
              {title}
            </IonCardTitle>
            <p className="italic">by {author}</p>
            <p className="h-12 mt-2 text-left whitespace-normal line-clamp-3 overflow-ellipsis">
              {description}
            </p>
          </IonCardHeader>
        </div>
      </div>
    </IonCard>
  );
};
export default ExhibitCard;
