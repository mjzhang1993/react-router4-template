// @flow

/*
* ActionType 创建
* 传入的第二个参数为对象类型
* */

const joinActionTypeName = (storeName, typeName) => `${storeName}_/_${typeName}`;

export default function BaseActionTypesCreator(storeName: string, ActionTypesMap: {[string]: string}): {[string]: string} {
  const mappedType = {
    UPDATE_STORE_DATA: 'UPDATE_STORE_DATA',
    RESET_STORE_DATA: 'RESET_STORE_DATA',
    ...ActionTypesMap
  }


  const descriptor = Object.keys(mappedType).reduce((prev, typeName) => {
    prev[typeName] = {
      writable: false,
      enumerable: true,
      value: joinActionTypeName(storeName, mappedType[typeName])
    };
    return prev;
  }, {});

  return Object.defineProperties({}, descriptor)
}

