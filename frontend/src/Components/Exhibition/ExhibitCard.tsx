import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  imageUrl: string;
  description: string;
  author: string;
}

const ExhibitCard = ({ imageUrl, description, author }: Props) => {
  return (
    <IonCard className="px-2 pt-3 m-0 rounded-3xl md:px-4">
      <div className="flex flex-col">
        <Link href="/TRCL-13-19-art-prize/1">
          <a>
            <div className="relative w-full aspect-w-1 aspect-h-1">
              <Image
                className="rounded-2xl"
                alt="NFT Image"
                layout="fill"
                objectFit="cover"
                src={imageUrl}
              />
            </div>
          </a>
        </Link>
        <div className="flex flex-col justify-center w-full h-1/3">
          <IonCardHeader className="px-2 truncate">
            <IonCardTitle className="text-base text-center truncate">
              Title of artwork
            </IonCardTitle>
            <p className="italic">by {author}</p>
            <p className="h-16 mt-2 text-left whitespace-normal line-clamp-3 overflow-ellipsis">
              {description}
            </p>
          </IonCardHeader>
        </div>
      </div>
    </IonCard>
  );
};
export default ExhibitCard;
