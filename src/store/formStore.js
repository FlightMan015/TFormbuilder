import create from 'zustand';
import {updateField, addField, deleteField} from '../actions/formdata';
import {newFormData} from '../constant';
import {I18n} from 'i18n-js';
import en from '../languages/en.json';
import ar from '../languages/ar.json';
import fr from '../languages/fr.json';

const i18n = new I18n({
  ...en,
  ...ar,
  ...fr,
});
i18n.defaultLocale = 'en';

const formStore = create(set => ({
  formData: newFormData,
  setFormData: newFormData => set(() => ({formData: newFormData})),
  tempFormData: {data: newFormData, type: 'form', element: {}, index: []},
  setTempFormData: newData => set(() => ({tempFormData: newData})),
  preview: false,
  setPreview: newRenderMode => set(() => ({preview: newRenderMode})),
  selectedFieldIndex: [],
  setSelectedFieldIndex: newIndex =>
    set(() => ({selectedFieldIndex: newIndex})),
  selectedField: null,
  setSelectedField: newFieldData => set(() => ({selectedField: newFieldData})),
  openMenu: false,
  setOpenMenu: newOpenMenu => set(() => ({openMenu: newOpenMenu})),
  openSetting: false,
  setOpenSetting: newOpenSetting => set(() => ({openSetting: newOpenSetting})),
  indexToAdd: [],
  setIndexToAdd: newIndexToAdd => set(() => ({indexToAdd: newIndexToAdd})),
  settingType: 'setting',
  setSettingType: newType => set(() => ({settingType: newType})),
  updateFormData: (index, newField) =>
    set(state => ({
      formData: {
        ...state.formData,
        data: updateField(state.formData, index, newField),
      },
    })),
  addFormData: (index, component) =>
    set(state => ({
      formData: {
        ...state.formData,
        data: addField(component, state.formData, index),
      },
    })),
  deleteFormData: index =>
    set(state => ({
      formData: {...state.formData, data: deleteField(state.formData, index)},
    })),
  roles: [
    {name: 'builder', view: false, edit: false, setting: true},
    {name: 'submitter', view: false, edit: true, setting: false},
    {name: 'reviewer', view: false, edit: true, setting: false},
    {name: 'approver', view: true, edit: false, setting: false},
  ],
  setRoles: newRoles => set(() => ({roles: newRoles})),
  viewMode: 'light',
  setViewMode: newViewMode => set(() => ({viewMode: newViewMode})),
  userRole: {},
  setUserRole: newUserRole => set(() => ({userRole: newUserRole})),
  formValue: {},
  setFormValue: newFormValue => set(() => ({formValue: newFormValue})),
  formValues: [],
  setFormValues: newFormValues => set(() => ({formValues: newFormValues})),
  visibleDlg: {},
  setVisibleDlg: newVisibleDlg => set(() => ({visibleDlg: newVisibleDlg})),
  visibleJsonDlg: false,
  setVisibleJsonDlg: newVisible => set(() => ({visibleJsonDlg: newVisible})),
  formDatas: [],
  setFormDatas: newFormDatas => set(() => ({formDatas: newFormDatas})),
  formsIsSet: [],
  setFormsIsSet: newFormDatas => set(() => ({formsIsSet: newFormDatas})),
  formsIsView: [],
  setFormsIsView: newFormDatas => set(() => ({formsIsView: newFormDatas})),
  formsIsEdit: [],
  setFormsIsEdit: newFormDatas => set(() => ({formsIsEdit: newFormDatas})),
  formsIsEditAndView: [],
  setFormsIsEditAndView: newFormDatas => set(() => ({formsIsEditAndView: newFormDatas})),
  submit: false,
  setSubmit: newSubmit => set(() => ({submit: newSubmit})),
  validation: {},
  setValidation: newValidation => set(() => ({validation: newValidation})),
  formValidation: true,
  setFormValidation: newFormValidation =>
    set(() => ({formValidation: newFormValidation})),
  visibleCalendarDlg: {},
  setVisibleCalendarDlg: newVisible =>
    set(() => ({visibleCalendarDlg: newVisible})),
  visibleMapDlg: {},
  setVisibleMapDlg: newVisible => set(() => ({visibleMapDlg: newVisible})),
  visibleSchedularDlg: {},
  setVisibleSchedularDlg: newVisible =>
    set(() => ({visibleSchedularDlg: newVisible})),
  i18nValues: i18n,
  seti18nValues: newI18nValues => set(() => ({i18nValues: newI18nValues})),
  visibleMarkerAddDlg: false,
  setVisibleMarkerAddDlg: newVisible =>
    set(() => ({visibleMarkerAddDlg: newVisible})),
  userEmail: '',
  setUserEmail: newUserEmail => set(() => ({userEmail: newUserEmail})),
  users: [
    '111@gmail.com',
    '222@gmail.com',
    '333@gmail.com',
    '444@gmail.com',
    '555@gmail.com',
    '666@gmail.com',
    '777@gmail.com',
  ],
  setUsers: users => set(() => ({users: users})),
  selectedFormValueId: '',
  setSelectedFormValueId: newSelectedFormValueId => set(() => ({selectedFormValueId: newSelectedFormValueId})),
  visibleDialogFieldDlg: {visible: false, data: []},
  setVisibleDialogFieldDlg: newData => set(() => ({visibleDialogFieldDlg: newData}))
}));

export default formStore;
