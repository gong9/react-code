/**
 * 每一个组件内部都是有一个更新器
 */

export const UpdateQueue = {
  isBatchingUpdata: false,
  updatars: new Set(),
};

class Component {
  static isReactComponent = true;
  constructor(props) {
    this.props = props;
    this.state = {};
    this.updatar = new Updatar(this);
  }
  /**
   * 状态更新
   * @param {any} newState
   * @param {function} cb
   */
  setState(newState, cb) {
    this.Updatar.addState(newState);
  }

  forceUpdate() {
    const newVDom = this.render();
    updataClassCompent(this, newVDom);
  }
}

// 组件更新器
class Updatar {
  constructor(componentClassInstance) {
    this.componentClassInstance = componentClassInstance;
    this.pendingStates = [];
    this.cbs = [];
  }

  /**
   * 处理要更新的状态
   * @param {any} newState
   * @param {function} cb
   */
  addState(newState, cb = () => {}) {
    this.pendingStates.push(newState); // 需要更新的状态
    this.cbs.push(cbs); // 更新状态的回调

    // 是否需要进行批量更新
    if (UpdateQueue.isBatchingUpdata) {
      UpdateQueue.updatars.add(this);
    } else {
      this.updataClassCompent();
    }
  }

  /**
   * 组件更新
   */
  updataClassCompent() {
    const { componentClassInstance, pendingStates, cbs } = this;
    if (pendingStates.length > 0) {
      componentClassInstance.state = this.getState();
      componentClassInstance.forceUpdate();
      cbs.forEach((cb) => cb());
    }
  }

  /**
   * 重新计算组件状态
   */
  getState() {
    const {
      componentClassInstance: { state },
      pendingStates,
    } = this;

    pendingStates.forEach((newState) => {
      if (typeof newState === "function") {
        newState = newState.call(this.componentClassInstance, state);
      }
      state = {
        ...state,
        ...newState,
      };
    });

    pendingStates.length = 0;
    return state;
  }
}

/**
 * class 组件更新
 * @param {object} classInstance
 * @param {object} newVDom
 */
function updataClassCompent(classInstance, newVDom) {
  const oldDom = classInstance.dom;
  const newDom = createDom(newVDom);
  oldDom.parentNode.replaceChild(newDom, oldDom);
  classInstance.dom = newDom;
}
export default Component;
