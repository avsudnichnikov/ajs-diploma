import Team from './models/Team';
import { getTooltipMsg, randInt } from './utils';
import themes from './themes';
import cursors from './cursors';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.state = this.stateService.gameState;
    this.actions = {
      attack: 'attack',
      move: 'move',
      change: 'change',
      self: 'self',
      nothing: null,
    };
  }

  get selectedPerson() {
    return this._selectedPerson;
  }

  set selectedPerson(value) {
    if (typeof this._selectedPerson === 'object') {
      this.gamePlay.deselectCell(this._selectedPerson.position);
    }
    if (typeof value === 'object') {
      this.gamePlay.selectCell(value.position);
    }
    this._selectedPerson = value;
  }

  get hoverCell() {
    return this._hoverCell;
  }

  set hoverCell(value) {
    if (typeof this._hoverCell === 'object') {
      this.gamePlay.deselectCell(this._hoverCell.index);
    }
    if (typeof value === 'object') {
      this.gamePlay.selectCell(value.index, value.color);
    }
    this._hoverCell = value;
  }

  init() {
    this.newGame();

    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));

    this.gamePlay.addNewGameListener(this.newGame.bind(this));
    this.gamePlay.addLoadGameListener(this.loadGame.bind(this));
    this.gamePlay.addSaveGameListener(this.saveGame.bind(this));
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
          this.selectedPerson = undefined;
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
      this.gamePlay.setCursor(cursors.auto);
    }
    this.showTooltip(index);
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
  }

  newGame() {
    this.state.clear();
    this.selectedPerson = undefined;
    this.hoverCell = undefined;
    clearTimeout(this.aiTimer);

    this.state.generateOptions = {
      characterCount: 3,
      maxLevel: 1,
      minLevel: 1,
      boardSize: this.gamePlay.boardSize,
    };

    this.state.teams[0] = new Team('humans', 'left', false);
    this.state.teams[1] = new Team('undead', 'right', true);

    this.state.teams[0].generateMembers(this.state.generateOptions, 1);

    this.nextLevel();
  }

  loadGame() {
    clearTimeout(this.aiTimer);
    this.stateService.load();
    this.state = this.stateService.gameState;
    this.gamePlay.drawUi(themes[this.state.level % themes.length]);
    this.gamePlay.redrawPositions(this.getPersons());
    if (this.state.teams[this.state.turn].ai) {
      this.aiTimer = setTimeout(
        this.aiTurn.bind(this),
        500,
      );
    }
  }

  saveGame() {
    this.stateService.save();
  }

  nextTurn() {
    const activeTeams = this.state.teams.filter((team) => team.length > 0);
    this.selectedPerson = undefined;
    this.state.turn += 1;
    if (activeTeams.length === 1) {
      this.endLevel();
    } else if (this.state.teams[this.state.turn].ai) {
      this.aiTimer = setTimeout(
        this.aiTurn.bind(this),
        300,
      );
    }
    this.gamePlay.redrawPositions(this.getPersons());
  }

  endLevel() {
    const playerTeam = this.state.teams[0];
    if (playerTeam.length > 0) {
      this.state.score += playerTeam.persons.reduce((acc, item) => acc + item.character.health, 0);
      if (this.state.score > this.stateService.maxScore) {
        this.stateService.maxScore = this.state.score;
      }
      for (const member of playerTeam) {
        member.character.levelUp();
      }

      if (playerTeam.length < this.gamePlay.boardSize * 2) {
        playerTeam.generateMembers({
          characterCount: 1,
          maxLevel: this.state.generateOptions.maxLevel,
          boardSize: this.state.generateOptions.boardSize,
        }, 2);
      }

      playerTeam.replace(this.gamePlay.boardSize);
      this.nextLevel();
    }
  }

  nextLevel() {
    this.state.level += 1;

    const maxLevel = this.state.level + 1;
    const minLevel = (maxLevel >= 3) ? (maxLevel - 3) : 1;
    this.state.generateOptions.characterCount = this.state.teams[0].length;
    this.state.generateOptions.maxLevel = maxLevel;
    this.state.generateOptions.minLevel = minLevel;
    this.state.teams[1].generateMembers(this.state.generateOptions);

    this.gamePlay.drawUi(themes[this.state.level % themes.length]);
    this.nextTurn();
  }

  aiTurn() {
    const team = this.state.teams[this.state.turn];
    const enemyPersons = this.getPersons(this.state.turn, false);
    let attack;
    let goAttack;
    for (const person of team) {
      const cells = person.getAttackCells(this.gamePlay.boardSize);
      const targets = [...enemyPersons.filter((item) => cells.includes(item.position))];
      targets.forEach((target) => {
        const damage = person.damage(target);
        if (!attack || attack.damage < damage
          || attack.target.character.health > target.character.health) {
          attack = {
            person,
            target,
            damage,
          };
        }
      });
    }
    if (attack) {
      this.selectedPerson = attack.person;
      this.attackSelectedPers(attack.target.position);
    } else {
      let allowedCells = [];
      while (allowedCells.length === 0) {
        this.selectedPerson = team.rand();
        const persons = this.getPersons().map((item) => item.position);
        const cells = this.selectedPerson.getMoveCells(this.gamePlay.boardSize);
        allowedCells = cells.filter((item) => !persons.includes(item));
      }
      this.moveSelectedPers(allowedCells[randInt(allowedCells.length - 1)]);
    }
  }

  getPersons(teamIndex, directSearch) {
    const team = (typeof (teamIndex) === 'number') ? teamIndex : -1;
    const direct = directSearch
      || (typeof (teamIndex) === 'number' && typeof (directSearch) !== 'boolean');
    const persons = [];
    this.state.teams.forEach((current, index) => {
      if ((direct && (index === team)) || (!direct && (index !== team))) {
        persons.push(...current.persons);
      }
    });
    return persons;
  }

  getPersByPosition(pos, team, direct) {
    return this.getPersons(team, direct).find((item) => item.position === pos) || null;
  }

  getTeamByPosition(pos) {
    return this.state.teams.find(
      (team) => team.persons.find((person) => person.position === pos),
    );
  }

  getSelectedPersAllowableAction(index) {
    if (!this.state.teams[this.state.turn].ai) {
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
    }
    return this.actions.nothing;
  }

  canSelectedPersMove(index) {
    const canMoveCell = this.selectedPerson.isMoveCell(index, this.gamePlay.boardSize);
    const isEmptyCell = !this.getPersByPosition(index);
    return canMoveCell && isEmptyCell;
  }

  canSelectedPersAttack(index) {
    const canAttackCell = this.selectedPerson.isAttackCell(index, this.gamePlay.boardSize);
    const isEnemyCell = !!this.getPersByPosition(index, this.state.turn, false);
    return canAttackCell && isEnemyCell;
  }

  canSelectedPersChange(index) {
    return !!this.getPersByPosition(index, this.state.turn);
  }

  selectPerson(index) {
    const person = this.getPersByPosition(index, this.state.turn);
    if (person) {
      this.selectedPerson = person;
    }
  }

  moveSelectedPers(index) {
    this.gamePlay.deselectCell(this.selectedPerson.position);
    this.selectedPerson.position = index;
    this.nextTurn();
  }

  attackSelectedPers(index) {
    const target = this.getPersByPosition(index);
    const damage = this.selectedPerson.damage(target);
    this.gamePlay.showDamage(index, damage)
      .then(() => {
        target.character.health -= damage;
        this.hoverCell = undefined;
        this.gamePlay.deselectCell(target.position);
        if (target.character.health <= 0) {
          this.getTeamByPosition(target.position).delete(target.position);
        }
        this.nextTurn();
      });
  }

  showTooltip(index) {
    const person = this.getPersByPosition(index);
    if (person) {
      this.gamePlay.showCellTooltip(getTooltipMsg(person.character), index);
    }
  }

  setCell(index, type) {
    if (type === this.actions.self) {
      this.gamePlay.setCursor(cursors.pointer);
      this.hoverCell = undefined;
    }
    if (type === this.actions.attack) {
      this.gamePlay.setCursor(cursors.crosshair);
      this.hoverCell = { index, color: 'red' };
    }
    if (type === this.actions.move) {
      this.gamePlay.setCursor(cursors.pointer);
      this.hoverCell = { index, color: 'green' };
    }
    if (type === this.actions.change) {
      this.gamePlay.setCursor(cursors.pointer);
      this.hoverCell = undefined;
    }
    if (type === this.actions.nothing) {
      this.gamePlay.setCursor(cursors.notallowed);
      this.hoverCell = undefined;
    }
  }
}
