import themes from "./themes";
import {nations} from "./Nation/nations";
import {generateTeam} from "./generators";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    this.gamePlay.drawUi(themes.prairie);

    this.teams = {
      player: generateTeam(nations.humans, 2, 1, 'left', this.gamePlay.boardSize),
      ai: generateTeam(nations.undead, 2, 1, 'right', this.gamePlay.boardSize),
    }

    this.gamePlay.redrawPositions([...this.teams.player, ...this.teams.ai]);
    this.gamePlay.addCellEnterListener(this.onCellEnter);
    this.gamePlay.addCellLeaveListener(this.onCellLeave);
    this.gamePlay.addCellClickListener(this.onCellClick);
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}
