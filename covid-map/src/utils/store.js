
import create from "zustand"
 
const [useStore] = create(set => ({
  center: [0, 0],
  updateCenter: newCenter => set(() => ({ center: newCenter })),
}))

export const [useMapFocus] = create(set => ({
  mapFocus: null,
  mapZoom: null,
  mapFocusData: null,
  updateMapFocus: (newMapFocus, newMapFocusData, mapZoom) => set(() => ({ mapFocus: newMapFocus, mapFocusData: newMapFocusData, mapZoom }))
}))

export const [useTabStore] = create(set => ({
  currentTab: 1,
  updateTab: newTab => set(() => ({ currentTab: newTab })),
}))

export const [useDataDate] = create(set => ({
  currentDate: null,
  updateDate: newDate => set(() => ({ currentDate: newDate })),
}))

export const [useDataTypeStore] = create(set => ({
  currentDataType: 0,
  updateDataType: newType => set(() => ({ currentDataType: newType }))
}))

export default useStore
