
import BaseReduxActions from '../../ReduxStore/BaseReduxActions'
import { obtainMemberList, postNewMember } from '../../api/home';

class HomeActions extends BaseReduxActions {
  getMemberList() {
    return obtainMemberList()
      .then(res => this.dispatch({ type: this.ActionTypes.GET_MEMBER_LIST, msg: res }))
      .catch(err => console.log('error ', err));
  }

  changeInputInfo(newMember) {
    // this.dispatch({ type: this.ActionTypes.CHANGE_INPUT_INFO, msg: newMember });
    this.updateStoreData({
      inputInfo: Immutable(newMember)
    });

    this.globalHandleError({
      status: +newMember.name
    })
  }

  async postNewInfo(newMember) {
    await postNewMember(newMember);
    const newData = await obtainMemberList();

    this.dispatch({ type: this.ActionTypes.GET_MEMBER_LIST, msg: newData });
  }
}

export default HomeActions;
