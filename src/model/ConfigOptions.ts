import * as request from 'request';
import Config from './Config';

export default class ConfigOptions {
    public application: string;
    public uri: string;
    public profiles: string;
    public label?: string
    public config: Promise<Config>;
    constructor (appName: string, uri: string, profiles: string, label?: string) { 
        this.application = appName;
        this.uri = uri.endsWith('/') ? uri : uri + '/';
        this.profiles = profiles;
        this.label = label;
        this.config = this.init();
    }

    private init(): Promise<Config> {
        return new Promise((resolve, reject) => {
            request(this.getConfigURI(), 
            {
                json: true,
                rejectUnauthorized: false
            },
             (err, res, body) => {
                if (err) { reject(err); }
                return resolve(new Config(body.propertySources[0].source));
            });
        });
    } 

    private getConfigURI = () => {
        let configURI = this.uri + this.application + '/' 
        configURI +=  this.profiles === undefined ? 'default/' : this.profiles + '/';
        return this.label === undefined ? configURI : configURI + '/' + this.label;
    }
}