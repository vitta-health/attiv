export default class EventAttiv {
  listener: Function;
  name: string;

  constructor(listener: Function, name: string) {
    this.listener = listener;
    this.name = name;
  }
}
