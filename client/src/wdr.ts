import whyDidYouRender from '@welldone-software/why-did-you-render';
import React from 'react';
import * as ReactRedux from 'react-redux';
export default whyDidYouRender(React, {
  trackAllPureComponents: true,
  trackExtraHooks: [[ReactRedux, 'useSelector']],
});
