import Config from './model/Config';
import ConfigOptions from './model/ConfigOptions';

export const client = {
  init(opts: any): Promise<Config> {
    const options = new ConfigOptions(opts.name, opts.uri, opts.profiles, opts.label);
    return options.config;
  }
};

