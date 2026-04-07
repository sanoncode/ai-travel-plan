import { create } from "zustand";

const useCreateTripStore = create((set)=>({
   formData: [],
    openLoginDialog: false,
    openGenerateDialog: false,
    generatingStatus:"",
    viewTripId: null,
    limitDays: false,
    setFormData: (name, value) => set((formData)=>({
        ...formData,
        [name]: value
    })),
    setOpenLoginDialog:() => set({openLoginDialog: true}),
    setCloseLoginDialog:() => set({openLoginDialog: false}),

    setOpenGenerateDialog:() => set({openGenerateDialog: true}),
    setCloseGenerateDialog:() => set({openGenerateDialog: false}),

    setViewTripId:(id) => set({viewTripId:id}),

    setGeneratingStatus:(status) =>set({generatingStatus: status}),

    setValidateLimitDays:((limit) => set({limitDays: limit}))

}))