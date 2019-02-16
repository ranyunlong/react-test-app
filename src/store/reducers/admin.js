/**
 * 管理员reducer
 */

import { SET_ADMIN_NAME, SET_ADMIN_TOKEN, SET_ADMIN} from './action-types'

const admin = {
    token: localStorage.getItem('token')
}
 
/**
 * action 结构
 * 
 * action = {
 *   type: '',
 *   data: , //要更新数据的内容存在data上
 * }
 * 
 */

export default (state = admin, action) => {
    switch(action.type) {
        case SET_ADMIN:
            return {
                ...action.data,
                token: state.data
            }
        case SET_ADMIN_NAME:
            return {
                ...state,
                username: state.data
            }
        case SET_ADMIN_TOKEN:
            return {
                ...state,
                token: action.data
            }
        default:
            return state
    }
}