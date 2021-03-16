import Nation from './models/Nation';
import Swordsman from './models/Character/Humans/Swordsman';
import Bowman from './models/Character/Humans/Bowman';
import Magician from './models/Character/Humans/Magician';
import Undead from './models/Character/Undead/Undead';
import Vampire from './models/Character/Undead/Vampire';
import Daemon from './models/Character/Undead/Daemon';

export const nations = {
  humans: new Nation('Humans', [Swordsman, Bowman, Magician]),
  undead: new Nation('Undead', [Undead, Vampire, Daemon]),
};
