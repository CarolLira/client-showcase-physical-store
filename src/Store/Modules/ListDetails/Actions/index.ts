import {IGlobalStoreId} from './../Types/index';

export function setNewStoreID(storeId: IGlobalStoreId) {
  return {
    type: 'SET',
    payload: storeId,
  };
}
