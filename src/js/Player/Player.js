import Team from '../Nation/Team';

export default class Player {
  constructor(nation, startPos, ai = false, team = null) {
    this.nation = nation;
    this.team = team || new Team(this.nation, startPos, new.target);
    this.ai = ai;
  }

  get persons() {
    return this.team.persons;
  }
}
