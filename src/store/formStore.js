import create from 'zustand';

const formStore = create(set => ({
  formData: {data: []},
  setFormData: newFormData => set(() => ({formData: newFormData})),
  renderMode: false,
  setRenderMode: newRenderMode => set(() => ({renderMode: newRenderMode})),
  selectedFieldIndex: -1,
  setSelectedFieldIndex: newIndex =>
    set(() => ({selectedFieldIndex: newIndex})),
  selectedField: null,
  setSelectedField: newFieldData => set(() => ({selectedField: newFieldData})),
  openMenu: false,
  setOpenMenu: newOpenMenu => set(() => ({openMenu: newOpenMenu})),
  openSetting: false,
  setOpenSetting: newOpenSetting => set(() => ({openSetting: newOpenSetting})),
}));

export default formStore;
