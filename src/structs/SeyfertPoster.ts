import { BasePoster, BasePosterInterface } from './BasePoster';
import { BotStats } from '@top-gg/sdk';
import { Client } from 'seyfert';
import { PosterOptions } from '../typings';

export class SeyfertPoster extends BasePoster implements BasePosterInterface {
    private client: Client
    constructor(token: string, client: any, options?: PosterOptions) {
        if (!token) throw new Error('Missing Top.gg Token')
        if (!client) throw new Error('Missing client')

        if (!(client instanceof Client)) throw new Error('Not a Seyfert Client')
        super(token, options)
        this.client = client
        this._binder({
            clientReady: () => this.clientReady(),
            waitForReady: (fn) => this.waitForReady(fn),
            getStats: () => this.getStats()
        })
    }

    public clientReady(): boolean {
        return this.client.gateway.latency > 1
    }

    public waitForReady(fn: () => void) {
        (this.client.events!.values.RAW as any) = {
            data: { name: "ready", once: true },
            run: (...args: any[]) => { fn() }
        };
    }

    public async getStats(): Promise<BotStats> {
        const guild = await this.client.rest.request('GET', `/${'users/@me/guilds'}`, { auth: true })
        return {
            serverCount: guild.length,
            shardCount: this.client.gateway.totalShards
        }
    }
}
