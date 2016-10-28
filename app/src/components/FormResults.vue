<template>
	<textarea :value="value.join('\n')"></textarea>
</template>

<script>

	export default {
		name: 'form-results',
		props: {
			value: {
				type: Array,
				default() {
					return [1, 2, 3, 4]
				}
			}
		},
		data() {
			return {
			}
		},
		mounted() {
			autosize(this.$el)
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
	textarea {
		display: block;
		width: 100%;
		min-height: 8em;
		padding: 0 0.5em;
		line-height: 2;
		resize: none;
		border: 1px solid #ccc;
		border-bottom: 0;
		background: linear-gradient(to bottom, white 0, white calc(2em - 1px), #ccc calc(2em - 1px), #ccc 2em, white 2em);
		background-repeat: repeat-y;
		background-size: 100% 2em;

		&:focus  {
			/*outline: 3px solid -webkit-focus-ring-color;*/
			outline: none;
			outline: 2px solid -webkit-focus-ring-color;
		}

		&[style] {
			min-height: 0;
		}
	}
</style>
