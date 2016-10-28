const students = localStorage.getItem('students')
const dates = localStorage.getItem('dates')

export default {
	students: students ? students.split(',') : [],
	dates: dates ? dates.split(',') : [],

	set(key, value) {
		localStorage.setItem(key, value)
		this[key] = value
	},

	get(key) {
		console.log(key);
		const value = localStorage.getItem(key)
		return value ? value.split(',') : []
	}
}
