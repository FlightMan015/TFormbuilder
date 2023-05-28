import {componentName} from '../../../constant';
import TabSection from './TabSection';
import Section from './Section';
import Grid from './gridSection';
import ListSection from './ListSection';

const componentMap = {
  [componentName.TABSECTION]: {
    component: TabSection,
  },
  [componentName.GROUP]: {
    component: Section,
  },
  [componentName.GRID]: {
    component: Grid,
  },
  [componentName.LISTSECTION]: {
    component: ListSection,
  },
};

export const getComponent = id => componentMap[id]?.component || null;

export const getValidator = id => componentMap[id]?.validator || null;

function inputTextValidator(text, inputType) {
  const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-\.])+.([A-Za-z]{2,4})$/;

  if (inputType === 'email') {
    return text && reg.test(text);
  }

  return true;
}
