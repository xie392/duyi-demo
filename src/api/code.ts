import { CodeParams } from '@/types/api'
import { getApi } from '@/utils/request'

export const getCodeApi = (params: CodeParams) => getApi('/code', params)
