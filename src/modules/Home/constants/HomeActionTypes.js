import {BaseActionTypesCreator} from '../../../ReduxStore'

export default function createHomeActionTypes(storeName) {
  return BaseActionTypesCreator(storeName, {
    CHANGE_INPUT_INFO: 'CHANGE_INPUT_INFO',
    GET_MEMBER_LIST: 'GET_MEMBER_LIST'
  })
}
