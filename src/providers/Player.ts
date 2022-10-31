import { Player as RawPlayer } from "../pages/Home";

export default class Player implements RawPlayer {
  private _name: string;
  private _color: string;
  private _id: string;
  points: number = 0;
  negativePoints: number = 0;
  wins: number = 0;

  constructor(p: RawPlayer) {
    this._id = p.id;
    this._color = p.color;
    this._name = p.name;
  }

  get name() {
    return this._name;
  }

  get color() {
    return this._color;
  }

  get id() {
    return this._id;
  }

  public reset() {
    this.points = 0;
    this.negativePoints = 0;
  }

  get absPoints(): number {
    return this.points - this.negativePoints;
  }
}
