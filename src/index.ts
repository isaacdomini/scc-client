// export const Greeter = (name: string) => `Hello ${name}`;
// npm i @types/request
// const request = require('request');
import Config from './model/Config';
import ConfigOptions from './model/ConfigOptions';

export const client = {
    init(opts: any): Promise<Config> {
        const options = new ConfigOptions(opts.appName, opts.uri, opts.profiles, opts.label);
        return options.config;
    }
}