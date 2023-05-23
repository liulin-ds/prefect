import axios from 'axios'
import { mapper } from '@/services/mapper'
import { SettingsResponse, UserConfig } from '@/types/settingsResponse'
import { MODE, BASE_URL } from '@/utilities/meta'
import { FeatureFlag } from '@/utilities/permissions'

export type Settings = {
  apiUrl: string,
  flags: FeatureFlag[],
  user?: string,
}

async function getUserConfig(): Promise<UserConfig> {
  const baseUrl = MODE() === 'development' ? 'http://127.0.0.1:4288/aa/prefect' : BASE_URL() ?? window.location.origin

  var rst: UserConfig = {serverUrlPrefix: baseUrl}
  await axios.get<UserConfig>('/config.json').then(res => {
    rst = res.data
  }).catch(err => {
    console.log(':: >>> Error while getting user configs', err)
  })
  return rst
}


export class UiSettings {
  public static settings: Settings | null = null

  private static promise: Promise<Settings> | null = null
  public static async load(): Promise<Settings> {
    if (this.settings !== null) {
      return this.settings
    }

    if (this.promise !== null) {
      return this.promise
    }
    const userConfig:UserConfig = await getUserConfig()
    console.log(':: >>> Check user config:', userConfig)
    this.promise = new Promise(resolve => {
      return axios.get<SettingsResponse>('/ui-settings', {
        baseURL: userConfig.serverUrlPrefix,
        params: {user: window.localStorage.getItem('prefect-user')}
      })
        .then(({ data }) => mapper.map('SettingsResponse', data, 'Settings'))
        .then(resolve)
    })

    const settings = await this.promise

    return this.settings = settings
  }

  public static async get<T extends keyof Settings>(setting: T, defaultValue?: Settings[T]): Promise<Settings[T]> {
    await this.load()

    const value = this.settings?.[setting]

    if (value === undefined) {
      if (defaultValue) {
        return defaultValue
      }

      throw `UI setting "${setting}" does not exist and no default was provided.`
    }

    return value
  }
}

export const uiSettings: {
  getApiUrl: () => Promise<string>,
  getFeatureFlags: () => Promise<FeatureFlag[]>,
} = {
  getApiUrl: () => {
    return UiSettings.get('apiUrl')
  },
  getFeatureFlags: () => {
    return UiSettings.get('flags')
  },
}