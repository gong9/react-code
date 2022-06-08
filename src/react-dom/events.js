/**
 * @file 事件包装:处理批量更新，或者一些其他的优化(一些浏览器的兼容问题，或者一些事件扩展)
 */


/**
 * dom节点事件绑定
 * @param {string} type 事件类型
 * @param {function} listener 事件处理函数 
 */
const addEvents = (dom, type, listener) => {
    const store = dom.store || (dom.store = {})
    store[type] = listener

    // 事件委托到document
    if (!document[type]) {
        document[type] = dispatchEvent
    }
}

let syntheticEvent = {}

/**
 * 事件分发
 * todo 添加事件冒泡机制
 * @param {object} events 事件对象
 */
const dispatchEvent = (events) => {
    const {
        target,
        type
    } = events

    const eventsType = 'on' + type
    // todo开启批量更新开关
    syntheticEvent = createSyntheticEvent(events)
    const {
        store
    } = target

    const listener = store && store[eventsType]
    listener && listener.call(target)

    // todo进行批量更新
    syntheticEvent = {}
}

/**
 * 创建合成事件(这里可以做扩展)
 * @param {object} events 
 */
const createSyntheticEvent = (events) => {
    const temp = {}
    for (const key in events) {
        temp[key] = events[key]
    }
    return temp
}




export {
    addEvents
}