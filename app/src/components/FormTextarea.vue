<template>
	<div class="scroller d-f">
		<div class="scroller__inner w-100p mxh-100p">
			<textarea :id="id" @keyup="onKeyup" @focusin="onFocusIn" @focusout="onFocusOut" :value="value.join('\n')"></textarea>
		</div>
	</div>
</template>

<script>
	import autosize from 'autosize'
	import store from '../store'

	export default {
		name: 'form-textarea',
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
	@mixin scrollbar($scrollbar-thickness: 12px, $thumb-thickness: 4px, $bg-track: #fff, $bg-thumb: #555) {

		&::-webkit-scrollbar {
			width: $scrollbar-thickness;
			height: $scrollbar-thickness;
		}

		&::-webkit-scrollbar-track {
			background: $bg-track;
		}

		&::-webkit-scrollbar-thumb {
			background: $bg-thumb;
			border: ($scrollbar-thickness - $thumb-thickness) / 2 solid $bg-track;
		}
	}


	.scroller {
		position: relative;

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
		}
	}

	.scroller--no-bd {

		&:before {
			display: none;
		}
	}

	.scroller__inner {
		position: relative;
		overflow-x: hidden;
		overflow-y: auto;

		@include scrollbar
	}

	textarea {
		display: block;
		width: 100%;
		min-height: 8em;
		padding: 0 0.5em;
		line-height: 2;
		resize: none;
		border: 0;
		background: linear-gradient(to bottom, white 0, white calc(2em - 1px), #ccc calc(2em - 1px), #ccc 2em, white 2em);
		background-repeat: repeat-y;
		background-size: 100% 2em;

		&:focus  {
			outline: 0;
		}

		&[style] {
			min-height: 0;
		}
	}
</style>
