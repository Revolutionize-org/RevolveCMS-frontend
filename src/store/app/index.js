export const app = {
    state: {
        isModalOpen: false,
    },
    mutations: {
        updateModalOpened(state, isOpen = false) {
            state.calendly_opened = isOpen
        },
    },
    actions: {
        updateModalOpened(context, isOpen = false) {
            context.commit('updateModalOpened', isOpen)
        },
    }
}