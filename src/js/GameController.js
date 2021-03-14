import themes from "./themes";
import {nations} from "./Nation/nations";
import {generateTeam} from "./generators";
import {getTooltipMsg} from "./utils";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {

    this.stateService.teams = {
      player: generateTeam(nations.humans, 2, 1, 'left', this.gamePlay.boardSize),
      ai: generateTeam(nations.undead, 2, 1, 'right', this.gamePlay.boardSize),
    }

    this.gamePlay.drawUi(themes.prairie);
    this.gamePlay.redrawPositions([...this.stateService.teams.ai, ...this.stateService.teams.player]);
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
  }

  getCharByPos(pos){
    return this.stateService.teams.player.findByPos(pos) || this.stateService.teams.ai.findByPos(pos);
  }

  onCellClick(index) {
    console.log(this.getCharByPos(index));

  }



  onCellEnter(index) {
    const person = this.getCharByPos(index);
    if (person) {
      this.gamePlay.showCellTooltip(getTooltipMsg(person.character), index);
    }
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
  }
}
