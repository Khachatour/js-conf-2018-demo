import contraLarge from "./imgs/contra-large.jpg";
import contraSmall from "./imgs/contra-small.jpg";
import spaceLarge from "./imgs/space-invaders-large.jpg";
import spaceSmall from "./imgs/space-invaders-small.jpg";
import zeldaLarge from "./imgs/zelda-large.jpg";
import zeldaSmall from "./imgs/zelda-small.jpg";
const data = {
  1: {
    title: "Contra",
    creator: "Konami",
    createdAt: "February 20, 1987",
    largeThumb: contraLarge,
    smallThumb: contraSmall,
    description:
      "Contra is a run and gun video game developed and published by Konami, originally released as a coin-operated arcade game on February 20, 1987. A home version was released for the Nintendo Entertainment System in 1988, along with ports for various computer formats, including the MSX2."
  },
  2: {
    title: "Zelda",
    creator: "Koji Kondo",
    createdAt: "February 21, 1986",
    largeThumb: zeldaLarge,
    smallThumb: zeldaSmall,
    description:
      "The Legend of Zelda is a action-adventure video-game series created by Japanese game designers Shigeru Miyamoto and Takashi Tezuka. It is primarily developed and published by Nintendo, although some portable installments and re-releases have been outsourced to Capcom, Vanpool and Grezzo"
  },
  3: {
    title: "Space Invaders",
    creator: "Tomohiro Nishikado ",
    createdAt: "June 21, 1978",
    largeThumb: spaceLarge,
    smallThumb: spaceSmall,
    description:
      "Space Invaders is an arcade game created by Tomohiro Nishikado and released in 1978. It was manufactured and sold by Taito in Japan, and licensed in the United States by the Midway division of Bally"
  }
};

export default data;
