import themes from './themes';
import {nations} from './Nation/nations';
import {getTooltipMsg, randInt} from './utils';
import Player from './Player/Player';
import cursors from "./cursors";

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.state = this.stateService.gameState;
    this.hoverCell = -1;
    this.actions = {
      attack: 'attack',
      move: 'move',
      change: 'change',
      self: 'self',
      nothing: null,
    };
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
    this.gamePlay.redrawPositions(this.getPersons());

    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
  }

  onCellClick(index) {
    if (this.selectedPerson) {
      switch (this.getSelectedPersAllowableAction(index)) {
        case this.actions.move:
          this.moveSelectedPers(index);
          break;
        case this.actions.attack:
          this.attackSelectedPers(index);
          break;
        case this.actions.change:
          this.selectPerson(index);
          break;
        default:
          this.deselect();
          break;
      }
    } else {
      this.selectPerson(index);
    }
  }

  onCellEnter(index) {
    if (this.selectedPerson) {
      this.setCell(index, this.getSelectedPersAllowableAction(index));
    } else {
      this.gamePlay.setCursor(cursors.auto)
    }
    this.showTooltip(index);
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
  }

  nextTurn() {
    this.deselect();
    this.gamePlay.redrawPositions(this.getPersons());
    this.state.turn += 1;
    if (this.state.turn >= this.state.players.length) {
      this.state.turn = 0;
    }
    if (this.state.players[this.state.turn].ai) {
      this.aiTurn();
    }
  }

  aiTurn() {
    const team = this.state.players[this.state.turn].team;
    const enemyPersons = this.getPersons(this.state.turn, false);
    let attacked;
    team.persons.forEach((person) => {
      const attackedCells = person.getAttackCells(this.gamePlay.boardSize);
      const targets = [...enemyPersons.filter((item) => attackedCells.includes(item.position))];
      targets.forEach((target) => {
        const damage = person.damage(target);
        if (!attacked || attacked.damage < damage) {
          attacked = {
            person,
            target,
            damage
          }
        }
      })
    })
    if (attacked) {
      this.selectedPerson = attacked.person;
      this.attackSelectedPers(attacked.target.position);
    } else {
      let allowedCells = [];
      while (allowedCells.length === 0) {
        this.selectedPerson = team.rand();
        allowedCells = this.selectedPerson.getMoveCells(this.gamePlay.boardSize);
      }
      this.moveSelectedPers(allowedCells[randInt(allowedCells.length - 1)]);
    }
  }

  getPersons(playerIndex, directSearch) {
    const player = (typeof (playerIndex) === 'number') ? playerIndex : -1;
    const direct = directSearch || (typeof (playerIndex) === 'number' && typeof (directSearch) !== 'boolean');
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

  getTeamByPosition(pos) {
    return this.state.players.find((player) =>
      player.persons.find((person) => person.position === pos)
    ).team;
  }

  getSelectedPersAllowableAction(index) {
    if (this.selectedPerson.position === index) {
      return this.actions.self;
    }
    if (this.canSelectedPersMove(index)) {
      return this.actions.move;
    }
    if (this.canSelectedPersAttack(index)) {
      return this.actions.attack;
    }
    if (this.canSelectedPersChange(index)) {
      return this.actions.change;
    }
    return this.actions.nothing;
  }

  canSelectedPersMove(index) {
    const canMoveCell = this.selectedPerson.isMoveCell(index, this.gamePlay.boardSize);
    const isEmptyCell = !this.getPersByPos(index);
    return canMoveCell && isEmptyCell;
  }

  canSelectedPersAttack(index) {
    const canAttackCell = this.selectedPerson.isAttackCell(index, this.gamePlay.boardSize);
    const isEnemyCell = !!this.getPersByPos(index, this.state.turn, false);
    return canAttackCell && isEnemyCell;
  }

  canSelectedPersChange(index) {
    return !!this.getPersByPos(index, this.state.turn);
  }

  selectPerson(index) {
    const person = this.getPersByPos(index, this.state.turn);
    this.deselect();
    if (person) {
      this.selectedPerson = person;
      this.gamePlay.selectCell(index);
    }
  }

  deselect() {
    if (this.selectedPerson) {
      this.gamePlay.deselectCell(this.selectedPerson.position);
    }
    this.selectedPerson = undefined;
  }

  moveSelectedPers(index) {
    this.gamePlay.deselectCell(this.selectedPerson.position);
    this.selectedPerson.position = index;
    this.nextTurn();
  }

  attackSelectedPers(index) {
    const target = this.getPersByPos(index);
    const damage = this.selectedPerson.damage(target);
    this.gamePlay.showDamage(index, damage)
      .then(() => {
        target.character.health -= damage;
        this.gamePlay.deselectCell(this.hoverCell);
        this.gamePlay.deselectCell(target.position);
        if (target.character.health === 0) {
          this.getTeamByPosition(target.position).deleteMember(target.position);
        }
        this.nextTurn();
      });
  }

  showTooltip(index) {
    const person = this.getPersByPos(index);
    if (person) {
      this.gamePlay.showCellTooltip(getTooltipMsg(person.character), index);
    }
  }

  setCell(index, type) {
    if (this.hoverCell >= 0 && this.hoverCell !== this.selectedPerson.position) {
      this.gamePlay.deselectCell(this.hoverCell);
    }
    if (type === this.actions.self) {
      this.gamePlay.setCursor(cursors.pointer);
      this.hoverCell = index;
    }
    if (type === this.actions.attack) {
      this.gamePlay.selectCell(index, 'red');
      this.gamePlay.setCursor(cursors.crosshair);
      this.hoverCell = index;
    }
    if (type === this.actions.move) {
      this.gamePlay.selectCell(index, 'green');
      this.gamePlay.setCursor(cursors.pointer);
      this.hoverCell = index;
    }
    if (type === this.actions.change) {
      this.gamePlay.setCursor(cursors.pointer);
      this.hoverCell = index;
    }
    if (type === this.actions.nothing) {
      this.gamePlay.setCursor(cursors.notallowed);
      this.hoverCell = index;
    }
  }
}
