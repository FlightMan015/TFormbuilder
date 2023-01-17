import {componentName} from '../../constant';
import CardListSetting from './CardListSetting';
import InputTextSetting from './InputTextSetting';

const componentMap = {
  [componentName.CARDSLIDER]: {
    component: CardListSetting,
  },
  [componentName.TEXT_INPUT]: {
    component: InputTextSetting,
  },
};

export const getSettingComponent = id => componentMap[id]?.component || null;

export const getSettingValidator = id => componentMap[id]?.validator || null;

function inputTextValidator(text, inputType) {
  const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-\.])+.([A-Za-z]{2,4})$/;

  if (inputType === 'email') {
    return text && reg.test(text);
  }

  return true;
}
