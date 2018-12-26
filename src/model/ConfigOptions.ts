import * as request from 'request';
import Properties from './Properties';

export default class ConfigOptions {
    public application: string;
    public uri: string;
    public profiles: string;
    public label?: string
    public properties: Promise<Properties>;
    constructor (appName: string, uri: string, profiles: string, label?: string) { 
        this.application = appName;
        this.uri = uri.endsWith('/') ? uri : uri + '/';
        this.profiles = profiles;
        this.label = label;
        this.properties = this.init();
    }

    private init(): Promise<Properties> {
        return new Promise((resolve, reject) => {
            request(this.getConfigURI(), 
            {
                json: true,
                rejectUnauthorized: false
            },
             (err, res, body) => {
                if (err) { reject(err); }
                return resolve(new Properties(body.propertySources[0].source));
            });
        });
    } 

    private getConfigURI = () => {
        const configURI = this.uri + this.application + '/' + this.profiles + '/';
        return this.label === undefined ? configURI : configURI + '/' + this.label;
    }
}