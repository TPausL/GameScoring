import { Player as RawPlayer } from "../pages/Home";

export default class Player implements RawPlayer {
  private _name: string;
  private _color: string;
  private _id: string;
  private _points: number = 0;
  private _negativePoints: number = 0;

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
    this._points = 0;
    this._negativePoints = 0;
  }

  get points(): number {
    return this._points;
  }

  get absPoints(): number {
    return this._points - this._negativePoints;
  }

  get negativePoints(): number {
    return this._negativePoints;
  }

  set points(p: number) {
    this._points = p;
  }

  set negativePoints(p: number) {
    this._negativePoints = p;
  }

  addPoints(p: number) {
    this._points += p;
  }

  removePoints(p: number) {
    this._points -= p;
  }

  addNegativePoints(p: number) {
    this.negativePoints += p;
  }

  removeNegativePoints(p: number) {
    this._negativePoints -= p;
  }
}
