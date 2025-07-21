<script setup>
import { ref } from 'vue'
const blogCloudObj = uniCloud.importObject('blogCloudObj')

const formData = ref({
	content: '',
	images: []
})

const onSubmit = async () => {
	const params = {
		...formData.value,
		images: formData.value.images.map(({ name, extname, url } = _) => ({
			name,
			extname,
			url
		}))
	}
	await blogCloudObj.add(params)
	uni.showToast({
		title: '发布成功',
		icon: 'none'
	})
	setTimeout(() => {
		uni.redirectTo({
			url: '/pages/blog/list'
		})
	}, 2000)
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

:deep(.file-picker__box-content) {
	background-color: #e5e5e5 !important;
}
</style>
