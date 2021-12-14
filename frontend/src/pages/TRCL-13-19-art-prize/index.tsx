/* eslint-disable */
import ExhibitCard from "../../Components/Exhibition/ExhibitCard";
import { Main } from "../../templates/Main";
import valerieTan from "../../../public/assets/TRCL_exhibition/artworks/a_dream_is_a_wish_valerie_tan.png";
import irdina from "../../../public/assets/TRCL_exhibition/artworks/all_my_blood_irdina.jpg";
import chewYeeSin from "../../../public/assets/TRCL_exhibition/artworks/girl_with_flowers_chew.jpg";
import luZhiYue from "../../../public/assets/TRCL_exhibition/artworks/make_a_wish_lu_zhi_yue.png";
import zhongRuiYun from "../../../public/assets/TRCL_exhibition/artworks/oppressive_artwork_zhong_rui_yun.jpg";
import elodie from "../../../public/assets/TRCL_exhibition/artworks/our_true_heroes_elodie_guillet.jpg";
import yapChengAn from "../../../public/assets/TRCL_exhibition/artworks/our_world_our_decision_yap.jpg";
import tanFangTing from "../../../public/assets/TRCL_exhibition/artworks/read_my_essay.png";
import jamesLee from "../../../public/assets/TRCL_exhibition/artworks/the_notion_of_innocence.jpg";
import hannah from "../../../public/assets/TRCL_exhibition/artworks/trapped_beginnings_hannah.jpg";
import sofia from "../../../public/assets/TRCL_exhibition/artworks/witch_kitchen_sofia.jpeg";

const artworks = [
  {
		title: "A Dream Is A Wish",
    image: valerieTan,
    description: "Of one's desire to dream upon a wish and make it true",
    author: "Valerie Tan",
  },
	{
		title: "All My Blood", 
		image: irdina,
		description: "A nameless girl depicted as someone entrapped and as a knight",
		author: "Nur Irdina Bte Muhd Amsyari",
	},
	{
		title: "Girl With Flowers",
		image: chewYeeSin, 
		description: "A work with blue flowers surrounding a girl",
		author: "Chew Yee Sin", 
	},
	{
		title: "Make a Wish",
		image: luZhiYue,
		description: "On the theme of positivity and hope especially in difficult times",
		author: "Lu Zhiyue",
	},
	{
		title: "Oppressive artwork",
		image: zhongRuiYun,
		description: "Depicting stifled creativity felt by one in school",
		author: "Zhong Rui Yun",
	},
	{
		title: "Our True Heroes", 
		image: elodie, 
		description: "A tribute to the sacrifices of frontline heroes", 
		author: "Elodie Guillet",
	},
	{
		title: "Our World, Our Decision",
		image: yapChengAn,
		description: "A juxtaposition of a peaceful world with a world at war",
		author: "Yap Cheng An", 
	},
	{
		title: "Read My Essay",
		image: tanFangTing,
		description: "Highlighting the plight of students with learning disabilities",
		author: "Tan Fang Ting Valerie", 
	},
	{
		title: "The Notion of Innocence",
		image: jamesLee,
		description: "A showcase of childish joy and satisfaction from a board game",
		author: "James Lee Rey Chong",
	},
	{
		title: "Trapped Beginnings",
		image: hannah,
		description: "About emerging from darkness and confusion through self-reflection",
		author: "Hannah Chong", 
	},
	{
		title: "Witch's Kitchen",
		image: sofia, 
		description: "An exploration of magical characters using light and soft shades",
		author: "Sofia Liana Piracci",
	}
];
/* eslint-enable */

const Exhibition = () => {
  return (
    <Main title="TRCL 13-19 Art Prize Exhibition">
      <div className="flex flex-col justify-between w-full min-h-full overflow-hidden bg-bottom bg-no-repeat bg-cover lg:flex-row lg:min-w-1200 bg-primary-default">
        <div className="z-10 w-full pl-8 pr-2 lg:w-3/5 md:ml-5 2xl:ml-56 mt-44 mb-22 max-w-maxScreen">
          <p className="text-5xl font-bold leading-snug break-words sm:break-normal md:text-6xl">
            WELCOME TO <br />
          </p>
          <p className="text-3xl font-bold leading-tight md:text-5xl">
            13-19 Art Prize Exhibition
          </p>
          <p className="mb-10 text-2xl font-normal leading-tight md:text-4xl">
            HOSTED BY TRCL
          </p>
          <p className="mb-10 text-lg leading-tight md:text-3xl">
            The auction is held to help children and youth to pursue the arts
            through progressive and sustained training. <br />
            All proceeds will be given to the children.
          </p>
        </div>
        <img
          className="z-0 self-end object-contain lg:self-center lg:pr-32 h-2/6 lg:h-1/2 xl:h-5/6"
          src="/assets/TRCL_exhibition/TRCL_wottle.png"
          alt="all wottles"
        />
      </div>
      <div className="flex flex-col gap-3 px-8 py-10 2xl:px-36 bg-primary-default">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {artworks.map((artwork, idx) => {
            return (
              <div key={idx}>
                <ExhibitCard
                  title={artwork.title}
                  image={artwork.image}
                  description={artwork.description}
                  author={artwork.author}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Main>
  );
};
export default Exhibition;
