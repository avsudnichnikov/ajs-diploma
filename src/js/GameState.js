import Team from './models/Team';
import CharacterController from './CharacterController';
import Person from './models/Person';

export default class GameState {
  constructor() {
    this.clear();
  }

  clear() {
    this.teams = [];
    this.generateOptions = {};
    this._turn = -1;
    this.level = -1;
    this.score = 0;
  }

  get turn() {
    return this._turn;
  }

  set turn(value) {
    if (value >= this.teams.length) {
      this._turn = 0;
    } else if (value < 0) {
      this._turn = this.teams.length - 1;
    } else {
      this._turn = value;
    }
  }

  static from(object) {
    const state = new GameState();
    state.turn = object._turn;
    state.level = object.level;
    state.score = object.score;
    state.generateOptions = object.generateOptions;
    state.teams = object.teams.map((rowTeam) => {
      const persons = rowTeam.persons.map(
        (member) => {
          const character = CharacterController.restoreChar(member.character);
          return new Person(character, member.position);
        },
      );
      return new Team(rowTeam.nation, rowTeam.startPos, rowTeam.ai, persons);
    });
    return state;
  }
}
