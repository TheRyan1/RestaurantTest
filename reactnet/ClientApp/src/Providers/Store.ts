import create from 'zustand'
import RestaurantType from '../Types/Restaurant.type';

interface UserStore {
    user: any
}

export const useStore = create<UserStore>((set) => ({
    user: localStorage.getItem('user')
}))

