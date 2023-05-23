import { FlagResponse } from '@/types/flagResponse'

export type SettingsResponse = {
  api_url: string,
  flags: FlagResponse[],
}

export type UserConfig = {
  serverUrlPrefix: string
}
