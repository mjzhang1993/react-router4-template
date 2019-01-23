import {BaseActionTypesCreator} from '../../../ReduxStoreGenerator';

const RootActionType = BaseActionTypesCreator('root', {
  UPDATE_SOMETHING: 'UPDATE_SOMETHING'
});

export default RootActionType;
