import create from 'zustand';
import { updateField, addField, deleteField } from '../actions/formdata';

const formStore = create(set => ({
  formData: {
    title: 'New TForm',
    logo: '',
    data: [],
    useTheme: 'true',
    defaultTheme: 'Default',
    style: {
      formBackgroundColor: '#FFFFFF',
      foregroundColor: '#FFFFFF',
      headings: {
        fontFamily: 'PublicSans-Bold',
        fontSize: 16,
        color: '#000000',
      },
      labels: {
        fontFamily: 'PublicSans-Regular',
        fontSize: 14,
        color: '#000000',
      },
      values: {
        fontFamily: 'PublicSans-Regular',
        fontSize: 14,
        color: '#000000',
      },
    },
    checkedRoles: []
  },
  setFormData: newFormData => set(() => ({formData: newFormData})),
  renderMode: false,
  setRenderMode: newRenderMode => set(() => ({renderMode: newRenderMode})),
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
}));

export default formStore;
