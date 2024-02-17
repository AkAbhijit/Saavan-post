import { OceanicPoster } from './structs/OceanicPoster'
import { BasePoster } from './structs/BasePoster'
import { PosterOptions } from './typings'

export function AutoPoster(token: string, client: any, options?: PosterOptions): BasePoster {
  if (!token) throw new Error('Top.gg token is missing')
  if (!client) throw new Error('Client is missing')
  let Oceanic
  try {
    Oceanic = require.cache[require.resolve('oceanic.js')]
  } catch (err) { }

  if (Oceanic && client instanceof Oceanic.exports.Client) return new OceanicPoster(token, client, options)
  throw new Error('Unsupported client')
}
export { OceanicPoster } from './structs/OceanicPoster'

export default AutoPoster