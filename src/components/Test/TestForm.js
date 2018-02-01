// 测试

import { PureComponent } from 'react';
import ReactDom from 'react-dom';

export default class TestForm extends PureComponent {
   constructor(props) {
      super(props);
      this.el = document.querySelector('body');
   }
   render() {
      return ReactDom.createPortal(this.props.children, this.el);
   }
}
