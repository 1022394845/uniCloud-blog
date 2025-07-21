module.exports = {
	// 通用预处理器
	_before: function() {},

	/**
	 * 添加/编辑
	 * @param {object} data 文章信息
	 * @returns {object} 添加文章响应
	 */
	async add(data = {}) {
		const dbJQL = uniCloud.databaseForJQL({
			clientInfo: this.getClientInfo()
		})

		return await dbJQL.collection('blog').add(data)
	},

	/**
	 * 获取文章列表
	 * @param {object} pageInfo 分页配置
	 * @returns {array} 文章列表
	 */
	async list(pageInfo = {}) {
		const dbJQL = uniCloud.databaseForJQL({
			clientInfo: this.getClientInfo()
		})

		// 分页默认参数
		const page = pageInfo.page || 1
		const pageSize = pageInfo.pageSize || 5

		// 跳过项目数
		const skipCount = (page - 1) * pageSize

		const blogTemp = dbJQL.collection('blog').orderBy('publish_date desc').getTemp()
		const userTemp = dbJQL.collection('uni-id-users').field('_id,nickname').getTemp()
		return await dbJQL.collection(blogTemp, userTemp).skip(skipCount).limit(pageSize).get()
	}
}