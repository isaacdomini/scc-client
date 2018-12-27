export default class Config {
  private values: any;
  constructor(values: any) {
    this.values = values;
  }
  public get = (key: string): string => {
    return this.values[key];
  };
}
