
import { getApi } from '@/utils/request'

const baseUrl = '/api'

export const getMenuApi = () => getApi(`${baseUrl}/menus`)
