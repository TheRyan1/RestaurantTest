import create from 'zustand'

interface UserStore {
    user: any
}

export const useStore = create<UserStore>((set) => ({
    user: localStorage.getItem('user')
}))

