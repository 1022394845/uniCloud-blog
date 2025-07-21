<script setup>
import { ref } from 'vue'

const formData = ref({
	content: '',
	images: []
})

const onSubmit = () => {
	console.log(formData.value)
}
</script>

<template>
	<view class="container">
		<view class="content">
			<textarea
				v-model="formData.content"
				class="textarea"
				placeholder="说点什么吧..."
				auto-height
				:maxlength="500"
				auto-focus
			></textarea>
		</view>
		<view class="image">
			<uni-file-picker
				v-model="formData.images"
				file-mediatype="image"
				mode="grid"
			></uni-file-picker>
		</view>
		<view class="submit">
			<button
				type="primary"
				:disabled="!formData.content && !formData.images.length"
				@click="onSubmit"
			>
				提交
			</button>
		</view>
	</view>
</template>

<style scoped lang="scss">
.textarea {
	min-height: 200rpx;
	font-size: 38rpx;
	line-height: 1.5em;
}

.image {
	margin: 80rpx 0 30rpx;
}
</style>
