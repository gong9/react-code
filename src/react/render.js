const render = (vdom, container) => {
    const dom = createDom(vdom)
    // 将dom放到container就可以了
}

/**
 * 处理vdom属性
 */
const handleProps = (props, dom) => {
    //
}


/**
 * 创建dom
 * @param {object} vdom 
 * @returns 
 */
const createDom = (vdom) => {
    if (typeof vdom === 'string') {
        // 文本节点
    }
    const {
        type,
        props
    } = vdom

    const dom = document.createElement(type)

    // 处理孩子
    if (props.children) {
        createDom(props.children)
    }

    // 处理属性
    handleProps(props, dom)
    return dom
}



export default render