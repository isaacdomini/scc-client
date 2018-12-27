import axios, { AxiosResponse } from 'axios';
import Config from './Config';

export default class ConfigOptions {
  public application: string;
  public uri: string;
  public profiles: string;
  public label?: string;
  public config: Promise<Config>;

  constructor(name: string, uri: string, profiles: string, label?: string) {
    this.application = name;
    this.uri = uri.endsWith('/') ? uri : uri + '/';
    this.profiles = profiles;
    this.label = label;
    this.config = this.init();
  }

  private init(): Promise<Config> {
    // Add AxiosRequestConfig later for auth and proxy
    return new Promise((resolve, reject) => {
      axios
        .get(this.getConfigURI())
        .then(response => {
          resolve(new Config(response.data.propertySources[0].source));
        })
        .catch(err => {
          resolve(err);
        });
    });
  }

  private getConfigURI = () => {
    let configURI = this.uri + this.application + '/';
    configURI += this.profiles === undefined ? 'default/' : this.profiles + '/';
    return this.label === undefined ? configURI : configURI + this.label;
  };
}
