import create from 'zustand';
import { updateField, addField, deleteField } from '../actions/formdata';

const formStore = create(set => ({
  formData: {
    title: 'New TForm',
    logo: '',
    data: [],
    theme: 'Native',
    lightStyle: {
      formBackgroundColor: '#F8F8F8',
      backgroundPatternImage: '',
      foregroundColor: '#FFFFFF',
      headings: {
        fontSize: 18,
        color: '#000000',
        fontFamily: 'PublicSans-SemiBold',
      },
      labels: {
          fontSize: 16,
          color: '#080808',
          fontFamily: 'PublicSans-Regular',
      },
      values: {
          fontSize: 14,
          color: '#080808',
          fontFamily: 'PublicSans-Regular',
      },
    },
    darkStyle: {
      formBackgroundColor: '#1F2128',
      backgroundPatternImage: '',
      foregroundColor: '#242731',
      headings: {
        fontSize: 18,
        color: '#FFFFFF',
        fontFamily: 'PublicSans-SemiBold',
      },
      labels: {
          fontSize: 16,
          color: '#FFFFFF',
          fontFamily: 'PublicSans-Regular',
      },
      values: {
          fontSize: 14,
          color: '#FFFFFF',
          fontFamily: 'PublicSans-Regular',
      },
    },
    checkedRoles: [],
  },
  setFormData: newFormData => set(() => ({formData: newFormData})),
  preview: false,
  setPreview: newRenderMode => set(() => ({preview: newRenderMode})),
  selectedFieldIndex: {},
  setSelectedFieldIndex: newIndex =>
    set(() => ({selectedFieldIndex: newIndex})),
  selectedField: null,
  setSelectedField: newFieldData => set(() => ({selectedField: newFieldData})),
  openMenu: false,
  setOpenMenu: newOpenMenu => set(() => ({openMenu: newOpenMenu})),
  openSetting: false,
  setOpenSetting: newOpenSetting => set(() => ({openSetting: newOpenSetting})),
  indexToAdd: {},
  setIndexToAdd: newIndexToAdd => set(() => ({indexToAdd: newIndexToAdd})),
  settingType: 'setting',
  setSettingType: newType => set(() => ({settingType: newType})),
  updateFormData: (index, newField) => set(state => ({formData: {...state.formData, data: updateField(state.formData, index, newField)}})),
  addFormData: (index, component) => set(state => ({formData: {...state.formData, data: addField(component, state.formData, index)}})),
  deleteFormData: (index) => set(state => ({formData: {...state.formData, data: deleteField(state.formData, index)}})),
  roles: [
    {name: 'builder'},
    {name: 'submitter'},
    {name: 'reviewer'},
    {name: 'approver'},
  ],
  setRoles: newRoles => set(() => ({roles: newRoles})),
  viewMode: 'light',
  setViewMode: newViewMode => set(() => ({viewMode: newViewMode})),
  userRole: 'admin',
  setUserRole: newUserRole => set(() => ({userRole: newUserRole})),
  formValue: {},
  setFormValue: newFormValue => set(() => ({formValue: newFormValue})),
  visibleDlg: {},
  setVisibleDlg: newVisibleDlg => set(() => ({visibleDlg: newVisibleDlg})),
  visibleJsonDlg: false,
  setVisibleJsonDlg: newVisible => set(() => ({visibleJsonDlg: newVisible})),
  formDatas: [],
  setFormDatas: newFormDatas => set(() => ({formDatas: newFormDatas,})),
}));

export default formStore;
