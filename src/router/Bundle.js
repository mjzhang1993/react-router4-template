// 一个 按需加载组件
import React from 'react';

export default class Bundle extends React.Component {
   state = {
      mod: null
   }
   componentWillMount() {
      this.load(this.props);
   }
   componentWillReceiveProps(nextProps) {
      if (nextProps.load !== this.props.load) {
         this.load(nextProps);
      }
   }
   load(props) {
      this.setState({
         mod: null
      });

      props.load(mod => {
         this.setState({
            mod: mod.default ? mod.default : mod
         });
      });
   }

   render() {
      return this.state.mod ? this.props.children(this.state.mod) : null;
   }
}
