import { useUsersStore } from '../stores/users'

export function isAuthenticated() {
   return useUsersStore().currentUser
}
