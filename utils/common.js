export const deletePermisson = (user_id) => {
	const {
		uid = '', role = []
	} = uniCloud.getCurrentUserInfo()
	return user_id === uid || role.includes('admin')
}