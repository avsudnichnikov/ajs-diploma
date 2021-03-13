import Nation from "./Nation";
import Swordsman from "../Character/Swordsman";
import Bowman from "../Character/Bowman";
import Magician from "../Character/Magician";
import Undead from "../Character/Undead";
import Vampire from "../Character/Vampire";
import Daemon from "../Character/Daemon";

export const nationHumans = new Nation('Humans', [Swordsman, Bowman, Magician]);
export const nationUndead = new Nation('Undead', [Undead, Vampire, Daemon]);
