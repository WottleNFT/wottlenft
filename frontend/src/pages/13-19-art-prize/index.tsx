import ExhibitCard from "../../Components/Exhibition/ExhibitCard";
import { Main } from "../../templates/Main";

const artworks = [
  {
    imageUrl: "https://placekitten.com/400/400",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    author: "author name here",
  },
  {
    imageUrl: "https://placekitten.com/400/400",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    author: "author name here",
  },
  {
    imageUrl: "https://placekitten.com/400/400",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    author: "author name here",
  },
  {
    imageUrl: "https://placekitten.com/400/400",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    author: "author name here",
  },
];

const Exhibition = () => {
  return (
    <Main title="13-19 Art Prize Exhibition">
      <div className="flex justify-between w-full min-h-full overflow-hidden bg-bottom bg-no-repeat bg-cover min-w-1200 bg-primary-default bg-background-seascape">
        <div className="z-10 w-3/5 pl-8 pr-2 md:ml-14 2xl:ml-56 my-44 max-w-maxScreen">
          <p className="mb-16 text-4xl font-bold leading-snug break-words sm:break-normal md:text-5xl lg:text-6xl">
            TRCL 13-19 Art Prize <br />
          </p>
          <p className="mb-10 text-xl font-bold leading-tight lg:text-3xl">
            Some description of the exhibition here
          </p>
        </div>
        <img
          className="z-0 self-center hidden object-contain pr-32 h-2/6 lg:block lg:h-1/2 xl:h-5/6"
          src="/assets/TRCL_exhibition/art-prize-logo.png"
          alt="all wottles"
        />
      </div>
      <div className="flex flex-col gap-3 px-8 py-10 2xl:px-36">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artworks.map((artwork, idx) => {
            return (
              <div key={idx}>
                <ExhibitCard
                  imageUrl={artwork.imageUrl}
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
