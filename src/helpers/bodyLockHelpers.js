export const bodyHelpers = {
	lock() {
		if (!document.body.classList.contains('--lock')) {
			document.body.classList.add('--lock')
			document.body.dataset.menu = '1'
		}
	},
	unlock() {
		if (document.body.classList.contains('--lock')) {
			document.body.classList.remove('--lock')
			document.body.dataset.menu = '0'
		}
	}
}