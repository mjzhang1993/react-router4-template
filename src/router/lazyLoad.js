// 懒加载方法
import React from 'react';
import Bundle from './Bundle';

const Loading = () => <div>Loading...</div>;

const lazyLoad = component => props => (
   <Bundle load={component}>
      {Comp => (Comp ? <Comp {...props} /> : <Loading />)}
   </Bundle>
);

export default lazyLoad;
