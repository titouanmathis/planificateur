<template>
	<scroller class="date">
		<input :id="id" type="date">
	</scroller>
</template>

<script>
	import Scroller from './Scroller'
	import store from '../store'

	export default {
		name: 'form-date',
		components: {
			Scroller
		},
		props: {
			id: {
				type: String
			}
		},
		data() {
			return {
			}
		},
		computed: {
			value() {
				return store[this.id]
			}
		},
		watch: {
			value() {
				console.log('value');
				setTimeout(() => {
					autosize.update(this.$el.querySelector('textarea'))
				}, 0);
			}
		},
		methods: {
			onKeyup(e) {
				store.set(this.id, e.target.value.split('\n'))
			},
			onFocusIn() {
				this.$el.classList.add('has-focus')
			},
			onFocusOut() {
				this.$el.classList.remove('has-focus')
			}
		},
		mounted() {
			autosize(this.$el.querySelector('textarea'))
			console.log(this);
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

	.date {

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
