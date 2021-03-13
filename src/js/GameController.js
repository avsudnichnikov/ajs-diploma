import themes from "./themes";
import {nationHumans, nationUndead} from "./Nation/nations";
import {generateTeam} from "./generators";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    this.gamePlay.drawUi(themes.prairie);

    const playerTeam = generateTeam(
      nationHumans,
      2,
      1,
      'left',
      this.gamePlay.boardSize
    );

    const aiTeam = generateTeam(
      nationUndead,
      2,
      1,
      'right',
      this.gamePlay.boardSize
    );
    this.gamePlay.redrawPositions([...playerTeam, ...aiTeam]);
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
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
