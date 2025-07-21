<script setup>
import BlogCard from '@/components/BlogCard.vue'

const goEdit = () => {
	uni.navigateTo({
		url: '/pages/blog/edit'
	})
}
</script>

<template>
	<view class="container">
		<view class="blog-list">
			<BlogCard v-for="item in 5"></BlogCard>
		</view>
		<uni-fab
			ref="fabRef"
			style="box-shadow: 0 1px 5px 2px rgba(0, 0, 0, 0.15)"
			:pattern="{ icon: 'compose' }"
			horizontal="right"
			vertical="bottom"
			@fabClick="goEdit"
		></uni-fab>
	</view>
</template>

<style scoped lang="scss">
.blog-list {
	margin-top: 10rpx;
}

.uni-cursor-point {
	box-shadow: none !important;
}
</style>
