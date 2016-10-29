<template>
	<div class="date">
		<div class="date__inner" :id="id"></div>
	</div>
</template>

<script>
	import store from '../store'
	import moment from 'moment'
	import {} from 'moment/locale/fr'
	import rome from 'rome'
	import { forEach } from '../utils'

	export default {
		name: 'form-date',
		props: {
			id: {
				type: String
			}
		},
		data() {
			return {
				options: {
					min: Date.now(),
					time: false,
					weekStart: 1,
					inputFormat: 'dddd DD MMMM',
					dateValidator: (d) => {
						const day = moment(d).day()
						return day !== 6 && day !== 0
					}
				}
			}
		},
		computed: {
			value() {
				return store[this.id]
			}
		},
		methods: {
			setCalendar() {
				const days = this.$el.querySelectorAll('.rd-day-body')
				forEach(days, (day) => {
					const input = day.querySelector('input')
					if (!input) return
					// const value = moment(input.value).format(this.options.inputFormat)
					const value = input.value

					day.addEventListener('focusin', (e) => day.classList.add('has-focus'))
					day.addEventListener('focusout', (e) => day.classList.remove('has-focus'))

					input.checked = this.value.indexOf(value) > -1

					input.addEventListener('change', (e) => {
						const index = this.value.indexOf(value)
						if (input.checked) {
							index < 0 && this.value.push(value)
						} else {
							index > -1 && this.value.splice(index, 1)
						}

						this.value.sort()
						store.set(this.id, this.value)
					})
				})
			}
		},
		mounted() {
			const parent = this.$el.querySelector(`#${this.id}`)
			rome(this.$el, this.options).on('data', (value) => {
				console.log('data');

				this.setCalendar()
				// store.set(this.id, [value])
			}).on('ready', () => {
				this.setCalendar()
			})
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

	.rd-container {
		display: none;
		text-align: center;

		&[style] {
			display: block !important;
		}
	}

	.rd-container-attachment {
		position: absolute;
	}

	.rd-month {
		display: block;
		text-transform: capitalize;
	}

	.rd-month:last-child {
		margin-right: 0;
	}

	.rd-back,
	.rd-next {
		cursor: pointer;
		border: none;
		outline: none;
		background: none;
		padding: 0 0.5em;
		margin: 0;
		color: inherit;

		&:hover {
			color: #fff;
			background: #333;
		}

		&:before {
			content: "➞";
			display: block;
		}
	}

	.rd-back[disabled],
	.rd-next[disabled] {
		cursor: default;
	}

	.rd-back {
		float: left;

		&:before {
			transform: scale(-1, 1);
		}
	}

	.rd-next {
		float: right;
	}

	.rd-days {
		width: 100%;
	}

	.rd-day-head,
	.rd-month-label {
		font-weight: 500;
	}

	.rd-day-body {
		cursor: pointer;
		text-align: center;

		&:focus,
		&.has-focus {
			outline: 2px solid -webkit-focus-ring-color;
		}

		input[type="checkbox"] {
			z-index: -999;
			position: absolute;
			left: -9999px;
			opacity: 0;

			&:checked + label {
				color: #fff;
				background: #333;
			}
		}

		label {
			display: block;
		}
	}

	/*.rd-day-selected {
		cursor: pointer;
		background-color: #333;
		color: #fff;
	}*/

	.rd-day-disabled {
		cursor: default;
		color: #ccc;
	}

	.rd-day-prev-month,
	.rd-day-next-month {
		color: #fff;
		visibility: hidden;
	}

	.rd-day-concealed {
		visibility: hidden;
	}

	.date {
		border: 1px solid #ccc;

		&:before {
			content: "";
			z-index: 1;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border: 1px solid #ccc;
			box-sizing: border-box;
			pointer-events: none;
		}

		&.has-focus {
			outline: 2px solid -webkit-focus-ring-color;

			&:before {
				border-color: -webkit-focus-ring-color;
				border-color: lighten(blue, 20%);
			}
		}
	}
</style>
