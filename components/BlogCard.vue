<script setup>
import { deletePermisson } from '../utils/common'
const { detail = {} } = defineProps({ detail: Object })
const blogCloudObj = uniCloud.importObject('blogCloudObj')

const emit = defineEmits(['success'])
const onRemove = async (id) => {
	const { cancel } = await uni.showModal({
		title: '温馨提示',
		content: '是否确认删除该文章'
	})
	if (cancel) return
	await blogCloudObj.remove(id)
	uni.showToast({
		title: '删除成功',
		icon: 'none'
	})
	emit('success')
}
</script>

<template>
	<view class="blog-card">
		<view class="blog-card-user">
			<view class="blog-card-user-avatar">
				<uni-icons type="contact-filled"></uni-icons>
			</view>
			<view class="blog-card-user-nickname">{{ detail.user_id[0]?.nickname }}</view>
		</view>
		<view class="blog-card-content">{{ detail.content }}</view>
		<view class="blog-card-images" v-if="detail.images.length">
			<view class="blog-card-images-item" v-for="item in detail.images">
				<image class="image" :src="item.url" mode="aspectFill"></image>
			</view>
		</view>
		<view class="blog-card-info">
			<view class="blog-card-info-date">
				<uni-dateformat
					:date="detail.publish_date"
					format="MM月dd日 hh:mm"
					:threshold="[60000, 3600000 * 24 * 30]"
				></uni-dateformat>
			</view>
			<view
				class="blog-card-info-delete"
				v-if="deletePermisson(detail.user_id[0]?._id)"
				@click="onRemove(detail._id)"
			>
				<uni-icons type="trash"></uni-icons>
				删除
			</view>
		</view>
	</view>
</template>

<style scoped lang="scss">
.blog-card {
	margin-bottom: 30rpx;
	padding: 30rpx;
	width: 100%;
	height: fit-content;
	background-color: #ffffff;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	border-radius: 20rpx;

	&-user {
		display: flex;
		align-items: center;
		font-size: 32rpx;

		&-avatar {
			display: flex;
			justify-content: center;
			align-items: center;

			.uni-icons {
				align-self: flex-end;
				font-size: 45rpx !important;
				color: #999999 !important;
			}
		}

		&-nickname {
			margin-left: 20rpx;
		}
	}

	&-content {
		margin-top: 10rpx;
		font-size: 40rpx;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		overflow: hidden;
	}

	&-images {
		margin-top: 10rpx;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 200rpx), 1fr));
		gap: 15rpx;

		&-item {
			overflow: hidden;
			border-radius: 10rpx;
			max-height: 400rpx;
			aspect-ratio: 1 / 1;

			.image {
				width: 100%;
				height: 100%;
			}
		}
	}

	&-info {
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
		color: #999999;

		&-delete {
			.uni-icons {
				font-size: 28rpx !important;
				color: #999999 !important;
			}
		}
	}
}
</style>
