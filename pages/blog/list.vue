<script setup>
import { onMounted, ref } from 'vue'
import { onReachBottom } from '@dcloudio/uni-app'
import BlogCard from '@/components/BlogCard.vue'
const blogCloudObj = uniCloud.importObject('blogCloudObj')

const goEdit = () => {
	uni.navigateTo({
		url: '/pages/blog/edit'
	})
}

const blogList = ref([])
const pageInfo = ref({
	page: 1,
	pageSize: 5,
	disabled: false
})
const getBlogList = async () => {
	if (pageInfo.value.disabled) return
	const { data } = await blogCloudObj.list(pageInfo.value)
	blogList.value = [...blogList.value, ...data]
	if (data.length < pageInfo.value.pageSize) pageInfo.value.disabled = true
}
onMounted(() => {
	getBlogList()
})
onReachBottom(() => {
	if (pageInfo.value.disabled) return
	pageInfo.value.page++
	getBlogList()
})

const successRemove = () => {
	pageInfo.value = {
		page: 1,
		pageSize: 5,
		disabled: false
	}
	blogList.value = []
	getBlogList()
}
</script>

<template>
	<view class="container">
		<view class="blog-list">
			<BlogCard
				v-for="item in blogList"
				:key="item._id"
				:detail="item"
				@success="successRemove"
			></BlogCard>
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
