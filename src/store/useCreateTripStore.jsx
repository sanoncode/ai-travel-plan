import { create } from "zustand";

export const useCreateTripStore = create((set)=>({
    // data
    formData:[],
    openGenerateDialog: false,
    generatingStatus: "idle", //idle | loading | success | error
    viewTripId:"",
    limitDays:false,

    // action
    setOpenGenerateDialog: (value) => set(({openGenerateDialog: value})),
    setGeneratingStatus: (status) => set({generatingStatus: status}),
    setViewTripId: (id) => set({viewTripId: id}),
    setLimitDays: (limit) => set({limitDays: limit}),
    setFormData:(name, value) => set((state)=>({
       formData: {...state.formData, [name]: value}
    })),
    reset: () => set({
        generatingStatus: "",
        openGenerateDialog: false,
        viewTripId:"",
    })
}))