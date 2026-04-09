import { create } from "zustand";

export const useCreateTripStore = create((set)=>({
    formData:[],
    openGenerateDialog: false,
    generatingStatus: "",
    viewTripId:"",
    limitDays:false,
    setOpenGenerateDialog: () => set((state)=> ({openGenerateDialog: !state.openGenerateDialog})),
    setGeneratingStatus: (status) => set({generatingStatus: status}),
    setViewTripId: (id) => set({viewTripId: id}),
    setLimitDays: (limit) => set({limitDays: limit}),
    setFormData:(name, value) => set((state)=>({
       formData: {...state.formData, [name]: value}
    })),
    reset: () => set({generatingStatus: ""})
}))