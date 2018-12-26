// export const Greeter = (name: string) => `Hello ${name}`;
// npm i @types/request
// const request = require('request');
import ConfigOptions from './model/ConfigOptions';
import Properties from './model/Properties';

export const client = {
    load(opts: any): Promise<Properties> {
        let options = new ConfigOptions(opts.appName, opts.uri, opts.profiles, opts.label);
        return options.properties;
    }
}