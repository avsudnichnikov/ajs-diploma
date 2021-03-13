import Nation from "./Nation";
import Swordsman from "../Character/Humans/Swordsman";
import Bowman from "../Character/Humans/Bowman";
import Magician from "../Character/Humans/Magician";
import Undead from "../Character/Undead/Undead";
import Vampire from "../Character/Undead/Vampire";
import Daemon from "../Character/Undead/Daemon";

export const nations = {
  humans: new Nation('Humans', [Swordsman, Bowman, Magician]),
  undead: new Nation('Undead', [Undead, Vampire, Daemon]),
}
