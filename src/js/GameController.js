import themes from './themes';
import {nations} from './Nation/nations';
import {getTooltipMsg} from './utils';
import Player from './Player/Player';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.state = this.stateService.gameState;
  }

  init() {
    const generateOptions = {
      characterCount: 2,
      maxLevel: 1,
      boardSize: this.gamePlay.boardSize,
    };

    const humanPlayer = new Player(nations.humans, 'left', false);
    const aiPlayer = new Player(nations.undead, 'right', true);

    humanPlayer.team.generate(generateOptions);
    aiPlayer.team.generate(generateOptions);

    this.state.players.push(humanPlayer);
    this.state.players.push(aiPlayer);

    this.gamePlay.drawUi(themes.prairie);

    console.log(this.getPersons());

    this.gamePlay.redrawPositions(this.getPersons());

    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
  }

  onCellClick(index) {
    const person = this.getPersByPos(index, this.state.turn);

    this.gamePlay.deselectCell(this.selectedCell);

    if (person) {
      this.selectedCell = index;
      this.gamePlay.selectCell(index);
    }
  }

  onCellEnter(index) {
    this.showTooltip(index);
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
  }

  getPersons(playerIndex, directSearch) {
    const player = (typeof (playerIndex) === 'number') ? playerIndex : -1;
    const direct = directSearch || typeof (playerIndex) === 'number';
    const persons = [];
    this.state.players.forEach((current, index) => {
      if ((direct && (index === player)) || (!direct && (index !== player))) {
        persons.push(...current.persons);
      }
    });
    return persons;
  }

  getPersByPos(pos, player, direct) {
    return this.getPersons(player, direct).find((item) => item.position === pos) || null;
  }

  showTooltip(index) {
    const person = this.getPersByPos(index);
    if (person) {
      this.gamePlay.showCellTooltip(getTooltipMsg(person.character), index);
    }
  }
}
