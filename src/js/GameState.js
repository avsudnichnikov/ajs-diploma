import Team from './models/Team';
import CharacterController from './CharacterController';
import PositionedCharacter from './models/PositionedCharacter';

export default class GameState {
  constructor(turn = -1, level = 1, score = 0) {
    this.players = [];
    this.turn = turn;
    this.level = level;
    this.score = score;
  }

  static from(object) {
    const state = new GameState(object.turn, object.level, object.score);
    state.teams = object.teams.map((rowTeam) => {
      const persons = rowTeam.persons.map(
        (member) => {
          const character = CharacterController.restoreChar(member.character);
          return new PositionedCharacter(character, member.position);
        },
      );
      return new Team(rowTeam.nation, rowTeam.startPos, rowTeam.ai, persons);
    });

    return state;
  }
}
