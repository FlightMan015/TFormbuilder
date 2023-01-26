/* eslint-disable prettier/prettier */
import {newFieldData, componentName} from '../constant';

export const addField = (
  type,
  previousFormData,
  indexes,
  addInfo,
) => {
  const groupIndex = indexes.groupIndex;
  const tabIndex = indexes.tabIndex;
  const tempNewFieldData = JSON.parse(JSON.stringify(newFieldData[type]));
  // if (tempNewFieldData.role) {
  //   previousFormData.checkedRoles.map(e => {
  //     if (e.name !== 'admin') {
  //       if (type === componentName.LINECHART || type === componentName.RADARCHART) {
  //         const tempRole = {name: e.name, view: true, editSeries: false, editAxes: false};
  //         tempNewFieldData.role.push(tempRole);
  //       } else if (type === componentName.PAYMENT) {
  //         const tempRole = {name: e.name, read: true, pay: false};
  //         tempNewFieldData.role.push(tempRole);
  //       } else {
  //         const tempRole = {name: e.name, view: true, edit: false};
  //         tempNewFieldData.role.push(tempRole);
  //       }
  //     }
  //   });
  // }
  const newData = {
    ...tempNewFieldData,
    field_name: tempNewFieldData.field_name + '-' + Date.now() + '-0',
    ...addInfo,
  };
  const tempFormData = JSON.parse(JSON.stringify(previousFormData.data));
  if (
    previousFormData.formTabIndex === undefined ||
    previousFormData.formTabIndex === -1
  ) {
    if (groupIndex >= 0 && tabIndex >= 0) {
      tempFormData[groupIndex].meta.childs[tabIndex].meta.childs.push(newData);
    } else if (groupIndex >= 0) {
      tempFormData[groupIndex].meta.childs.push(newData);
    } else {
      tempFormData.push(newData);
    }
  } else {
    const formTabIndex = previousFormData.formTabIndex;
    if (groupIndex >= 0 && tabIndex >= 0) {
      tempFormData[formTabIndex].meta.data[groupIndex].meta.childs[
        tabIndex
      ].meta.childs.push(newData);
    } else if (groupIndex >= 0) {
      tempFormData[formTabIndex].meta.data[groupIndex].meta.childs.push(
        newData,
      );
    } else {
      tempFormData[formTabIndex].meta.data.push(newData);
    }
  }
  return tempFormData;
};

export const deleteField = (previousFormData, indexes) => {
  const groupIndex = indexes.groupIndex;
  const tabIndex = indexes.tabIndex;
  const childIndex = indexes.childIndex;
  const tempFormData = JSON.parse(JSON.stringify(previousFormData.data));

  if (
    previousFormData.formTabIndex === undefined ||
    previousFormData.formTabIndex === -1
  ) {
    if (groupIndex >= 0 && tabIndex >= 0 && childIndex >= 0) {
      tempFormData[groupIndex].meta.childs[tabIndex].meta.childs.splice(
        childIndex,
        1,
      );
    } else if (groupIndex >= 0 && tabIndex >= 0) {
      tempFormData[groupIndex].meta.childs.splice(tabIndex, 1);
    } else if (groupIndex >= 0 && childIndex >= 0) {
      tempFormData[groupIndex].meta.childs.splice(childIndex, 1);
    } else if (groupIndex >= 0) {
      tempFormData.splice(groupIndex, 1);
    } else if (childIndex >= 0) {
      tempFormData.splice(childIndex, 1);
    }
  } else {
    const formTabIndex = previousFormData.formTabIndex;
    if (groupIndex >= 0 && tabIndex >= 0 && childIndex >= 0) {
      tempFormData[formTabIndex].meta.data[groupIndex].meta.childs[
        tabIndex
      ].meta.childs.splice(childIndex, 1);
    } else if (groupIndex >= 0 && tabIndex >= 0) {
      tempFormData[formTabIndex].meta.data[groupIndex].meta.childs.splice(
        tabIndex,
        1,
      );
    } else if (groupIndex >= 0 && childIndex >= 0) {
      tempFormData[formTabIndex].meta.data[groupIndex].meta.childs.splice(
        childIndex,
        1,
      );
    } else if (groupIndex >= 0) {
      tempFormData[formTabIndex].meta.data.splice(groupIndex, 1);
    } else if (childIndex >= 0) {
      tempFormData[formTabIndex].meta.data.splice(childIndex, 1);
    }
  }
  return tempFormData;
};

export const updateField = (previousFormData, indexes, updatedField) => {
  const groupIndex = indexes.groupIndex;
  const tabIndex = indexes.tabIndex;
  const childIndex = indexes.childIndex;
  const tempFormData = JSON.parse(JSON.stringify(previousFormData.data));

  if (
    previousFormData.formTabIndex === undefined ||
    previousFormData.formTabIndex === -1
  ) {
    if (groupIndex >= 0 && tabIndex >= 0 && childIndex >= 0) {
      tempFormData[groupIndex].meta.childs[tabIndex].meta.childs.splice(
        childIndex,
        1,
        updatedField,
      );
    } else if (groupIndex >= 0 && tabIndex >= 0) {
      tempFormData[groupIndex].meta.childs.splice(tabIndex, 1, updatedField);
    } else if (groupIndex >= 0 && childIndex >= 0) {
      tempFormData[groupIndex].meta.childs.splice(childIndex, 1, updatedField);
    } else if (groupIndex >= 0) {
      tempFormData.splice(groupIndex, 1, updatedField);
    } else if (childIndex >= 0) {
      tempFormData.splice(childIndex, 1, updatedField);
    }
  } else {
    const formTabIndex = previousFormData.formTabIndex;
    if (groupIndex >= 0 && tabIndex >= 0 && childIndex >= 0) {
      tempFormData[formTabIndex].meta.data[groupIndex].meta.childs[
        tabIndex
      ].meta.childs.splice(childIndex, 1, updatedField);
    } else if (groupIndex >= 0 && tabIndex >= 0) {
      tempFormData[formTabIndex].meta.data[groupIndex].meta.childs.splice(
        tabIndex,
        1,
        updatedField,
      );
    } else if (groupIndex >= 0 && childIndex >= 0) {
      tempFormData[formTabIndex].meta.data[groupIndex].meta.childs.splice(
        childIndex,
        1,
        updatedField,
      );
    } else if (groupIndex >= 0) {
      tempFormData[formTabIndex].meta.data.splice(groupIndex, 1, updatedField);
    } else if (childIndex >= 0) {
      tempFormData[formTabIndex].meta.data.splice(childIndex, 1, updatedField);
    }
  }
  return tempFormData;
};

export const addFieldToGridCell = (previousData, type) => {
  const tempNewFieldData = JSON.parse(JSON.stringify(newFieldData[type]));
  const tempFormData = JSON.parse(JSON.stringify(previousData));
  tempFormData.push({
    ...tempNewFieldData,
    field_name: tempNewFieldData.field_name + '-' + Date.now() + '-1',
  });
  return tempFormData;
};

export const updateFieldToGridCell = (previousData, index, newData) => {
  const tempFormData = JSON.parse(JSON.stringify(previousData));
  tempFormData.splice(index, 1, newData);
  return tempFormData;
};

export const deleteFieldToGridCell = (previousData, index) => {
  const tempFormData = JSON.parse(JSON.stringify(previousData));
  tempFormData.splice(index, 1);
  return tempFormData;
};

export const moveUp = (previousFormData, indexes) => {
  const groupIndex = indexes.groupIndex;
  const tabIndex = indexes.tabIndex;
  const childIndex = indexes.childIndex;
  const tempFormData = JSON.parse(JSON.stringify(previousFormData.data));

  if (
    previousFormData.formTabIndex === undefined ||
    previousFormData.formTabIndex === -1
  ) {
    if (groupIndex >= 0 && tabIndex >= 0 && childIndex >= 0) {
      const tempItem = JSON.parse(JSON.stringify(tempFormData[groupIndex].meta.childs[tabIndex].meta.childs[childIndex]));
      tempFormData[groupIndex].meta.childs[tabIndex].meta.childs.splice(
        childIndex,
        1,
      );
      tempFormData[groupIndex].meta.childs[tabIndex].meta.childs.splice(
        childIndex - 1,
        0,
        tempItem,
      );
    } else if (groupIndex >= 0 && tabIndex >= 0) {
      const tempItem = JSON.parse(JSON.stringify(tempFormData[groupIndex].meta.childs[tabIndex]));
      tempFormData[groupIndex].meta.childs.splice(tabIndex, 1);
      tempFormData[groupIndex].meta.childs.splice(tabIndex - 1, 0, tempItem);
    } else if (groupIndex >= 0 && childIndex >= 0) {
      const tempItem = JSON.parse(JSON.stringify(tempFormData[groupIndex].meta.childs[childIndex]));
      tempFormData[groupIndex].meta.childs.splice(childIndex, 1);
      tempFormData[groupIndex].meta.childs.splice(childIndex - 1, 0, tempItem);
    } else if (groupIndex >= 0) {
      const tempItem = JSON.parse(JSON.stringify(tempFormData[groupIndex]));
      tempFormData.splice(groupIndex, 1);
      tempFormData.splice(groupIndex - 1, 0, tempItem);
    } else if (childIndex >= 0) {
      const tempItem = JSON.parse(JSON.stringify(tempFormData[childIndex]));
      tempFormData.splice(childIndex, 1);
      tempFormData.splice(childIndex - 1, 0, tempItem);
    }
  } else {
    const formTabIndex = previousFormData.formTabIndex;
    if (groupIndex >= 0 && tabIndex >= 0 && childIndex >= 0) {
      const tempItem = JSON.parse(JSON.stringify(tempFormData[formTabIndex].meta.data[groupIndex].meta.childs[tabIndex].meta.childs[childIndex]));
      tempFormData[formTabIndex].meta.data[groupIndex].meta.childs[tabIndex].meta.childs.splice(
        childIndex,
        1,
      );
      tempFormData[formTabIndex].meta.data[groupIndex].meta.childs[tabIndex].meta.childs.splice(
        childIndex - 1,
        0,
        tempItem,
      );
    } else if (groupIndex >= 0 && tabIndex >= 0) {
      const tempItem = JSON.parse(JSON.stringify(tempFormData[formTabIndex].meta.data[groupIndex].meta.childs[tabIndex]));
      tempFormData[formTabIndex].meta.data[groupIndex].meta.childs.splice(tabIndex, 1);
      tempFormData[formTabIndex].meta.data[groupIndex].meta.childs.splice(tabIndex - 1, 0, tempItem);
    } else if (groupIndex >= 0 && childIndex >= 0) {
      const tempItem = JSON.parse(JSON.stringify(tempFormData[formTabIndex].meta.data[groupIndex].meta.childs[childIndex]));
      tempFormData[formTabIndex].meta.data[groupIndex].meta.childs.splice(childIndex, 1);
      tempFormData[formTabIndex].meta.data[groupIndex].meta.childs.splice(childIndex - 1, 0, tempItem);
    } else if (groupIndex >= 0) {
      const tempItem = JSON.parse(JSON.stringify(tempFormData[formTabIndex].meta.data[groupIndex]));
      tempFormData[formTabIndex].meta.data.splice(groupIndex, 1);
      tempFormData[formTabIndex].meta.data.splice(groupIndex - 1, 0, tempItem);
    } else if (childIndex >= 0) {
      const tempItem = JSON.parse(JSON.stringify(tempFormData[formTabIndex].meta.data[childIndex]));
      tempFormData[formTabIndex].meta.data.splice(childIndex, 1);
      tempFormData[formTabIndex].meta.data.splice(childIndex - 1, 0, tempItem);
    }
  }
  return tempFormData;
};

export const moveDown = (previousFormData, indexes) => {
  const groupIndex = indexes.groupIndex;
  const tabIndex = indexes.tabIndex;
  const childIndex = indexes.childIndex;
  const tempFormData = JSON.parse(JSON.stringify(previousFormData.data));

  if (
    previousFormData.formTabIndex === undefined ||
    previousFormData.formTabIndex === -1
  ) {
    if (groupIndex >= 0 && tabIndex >= 0 && childIndex >= 0) {
      const tempItem = JSON.parse(JSON.stringify(tempFormData[groupIndex].meta.childs[tabIndex].meta.childs[childIndex]));
      tempFormData[groupIndex].meta.childs[tabIndex].meta.childs.splice(
        childIndex,
        1,
      );
      tempFormData[groupIndex].meta.childs[tabIndex].meta.childs.splice(
        childIndex + 1,
        0,
        tempItem,
      );
    } else if (groupIndex >= 0 && tabIndex >= 0) {
      const tempItem = JSON.parse(JSON.stringify(tempFormData[groupIndex].meta.childs[tabIndex]));
      tempFormData[groupIndex].meta.childs.splice(tabIndex, 1);
      tempFormData[groupIndex].meta.childs.splice(tabIndex + 1, 0, tempItem);
    } else if (groupIndex >= 0 && childIndex >= 0) {
      const tempItem = JSON.parse(JSON.stringify(tempFormData[groupIndex].meta.childs[childIndex]));
      tempFormData[groupIndex].meta.childs.splice(childIndex, 1);
      tempFormData[groupIndex].meta.childs.splice(childIndex + 1, 0, tempItem);
    } else if (groupIndex >= 0) {
      const tempItem = JSON.parse(JSON.stringify(tempFormData[groupIndex]));
      tempFormData.splice(groupIndex, 1);
      tempFormData.splice(groupIndex + 1, 0, tempItem);
    } else if (childIndex >= 0) {
      const tempItem = JSON.parse(JSON.stringify(tempFormData[childIndex]));
      tempFormData.splice(childIndex, 1);
      tempFormData.splice(childIndex + 1, 0, tempItem);
    }
  } else {
    const formTabIndex = previousFormData.formTabIndex;
    if (groupIndex >= 0 && tabIndex >= 0 && childIndex >= 0) {
      const tempItem = JSON.parse(JSON.stringify(tempFormData[formTabIndex].meta.data[groupIndex].meta.childs[tabIndex].meta.childs[childIndex]));
      tempFormData[formTabIndex].meta.data[groupIndex].meta.childs[tabIndex].meta.childs.splice(
        childIndex,
        1,
      );
      tempFormData[formTabIndex].meta.data[groupIndex].meta.childs[tabIndex].meta.childs.splice(
        childIndex + 1,
        0,
        tempItem,
      );
    } else if (groupIndex >= 0 && tabIndex >= 0) {
      const tempItem = JSON.parse(JSON.stringify(tempFormData[formTabIndex].meta.data[groupIndex].meta.childs[tabIndex]));
      tempFormData[formTabIndex].meta.data[groupIndex].meta.childs.splice(tabIndex, 1);
      tempFormData[formTabIndex].meta.data[groupIndex].meta.childs.splice(tabIndex + 1, 0, tempItem);
    } else if (groupIndex >= 0 && childIndex >= 0) {
      const tempItem = JSON.parse(JSON.stringify(tempFormData[formTabIndex].meta.data[groupIndex].meta.childs[childIndex]));
      tempFormData[formTabIndex].meta.data[groupIndex].meta.childs.splice(childIndex, 1);
      tempFormData[formTabIndex].meta.data[groupIndex].meta.childs.splice(childIndex + 1, 0, tempItem);
    } else if (groupIndex >= 0) {
      const tempItem = JSON.parse(JSON.stringify(tempFormData[formTabIndex].meta.data[groupIndex]));
      tempFormData[formTabIndex].meta.data.splice(groupIndex, 1);
      tempFormData[formTabIndex].meta.data.splice(groupIndex + 1, 0, tempItem);
    } else if (childIndex >= 0) {
      const tempItem = JSON.parse(JSON.stringify(tempFormData[formTabIndex].meta.data[childIndex]));
      tempFormData[formTabIndex].meta.data.splice(childIndex, 1);
      tempFormData[formTabIndex].meta.data.splice(childIndex + 1, 0, tempItem);
    }
  }
  return tempFormData;
};
