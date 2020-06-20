// 参考文章：https://juejin.im/post/5e53c9c051882549150ea5d3

const vnodeType = {
  HTML: 'HTML', // 标签
  TEXT: 'TEXT', // 文本
  COMPONENT: 'COMPONENT' // 组件
};

const childType = {
  EMPTY: 'EMPTY', // 当没有传入children或者传入了一个空数组时
  SINGLE: 'SINGLE', // 当传入的参数children不为数组，如果遇到一些字符串、数字等，默认为它创建一个文本节点 如createElement('div', {id: 'box'}, '文本')
  MULTIPLE: 'MULTIPLE' // // 当传入的是数组，并且数组不为空，哪怕里面只有一个元素
};

function createElement (tag, data, children = null) {
  let flag;
  if (typeof tag === 'string') {
    flag = vnodeType.HTML;
  } else if (typeof tag === 'function') {
    flag = vnodeType.COMPONENT;
  } else {
    flag = vnodeType.TEXT;
  }

  let childrenFlag;
  if (children === null) {
    childrenFlag = childType.EMPTY;
  } else if (Array.isArray(children)) {
    if (children.length === 0) {
      childrenFlag = childType.EMPTY;
    } else {
      childrenFlag = childType.MULTIPLE;
    }
  } else {
    childrenFlag = childType.SINGLE;
    if (flag !== vnodeType.TEXT) {
      children = {
        flag: vnodeType.TEXT,
        children: children
      };
    }
  }

  return {
    flag: flag,
    tag: tag,
    data: data,
    key: data && data.key,
    el: null,
    children: children,
    childrenFlag: childrenFlag
  };
}

function patchData (el, key, prev, next) {
  switch (key) {
    case 'style':
      break;
    case 'class':
      el.className = next;
      break;
    default:
      el.setAttribute(key, next);
  }
}

// 创建标签元素, 并把它挂载到容器上
function mountElement (vnode, container, flagNode) {
  const { tag, data, children, childrenFlag } = vnode;
  const dom = document.createElement(tag);
  vnode.el = dom;

  if (data) {
    for (let key in data) {
      patchData(dom, key, null, data[key]);
    }
  }

  if (childrenFlag !== childType.EMPTY) {
    if (childrenFlag === childType.SINGLE) {
      mount(children, dom);
    } else if (childrenFlag === childType.MULTIPLE) {
      for (let i = 0; i < children.length; i++) {
        mount(children[i], dom);
      }
    }
  }

  flagNode ? container.insertBefore(dom, flagNode) : container.appendChild(dom);
}

// 创建文本元素, 并把它挂载到容器上
function mountText (vnode, container) {
  const dom = document.createTextNode(vnode.children);
  vnode.el = dom;
  container.appendChild(dom);
}

/**
 * 挂载元素
 * @param {Object} vnode 需要挂载的对象
 * @param {Object} container 挂载容器
 * @param {Object} flagNode 参考元素 如果传入flagNode，会调用insertBefore在该元素前面插入DOM，如果没有则默认使用appendChild，把元素放在容器container最后
 */
function mount (vnode, container, flagNode) {
  const { flag } = vnode;
  if (flag === vnodeType.HTML) {
    mountElement(vnode, container, flagNode);
  } else if (flag === vnodeType.TEXT) {
    mountText(vnode, container);
  }
}

// 把虚拟dom渲染成真实的dom
function render (vnode, container) {
  if (container.vnode) {
    patch(container.vnode, vnode, container);
  } else {
    mount(vnode, container);
  }
  container.vnode = vnode;
}

function patch (prev, next, container) {
  const nextFlag = next.flag;
  const prevFlag = prev.flag;

  if (nextFlag !== prevFlag) {
    replaceVnode(prev, next, container);
  } else if (nextFlag === vnodeType.HTML) {
    patchElement(prev, next, container);
  } else if (nextFlag === vnodeType.TEXT) {
    patchText(prev, next);
  }
}

function patchElement (prev, next, container) {
  if (prev.tag !== next.tag) {
    replaceVnode(prev, next, container);
  }

  const el = next.el = prev.el;
  const nextData = next.data;
  const prevData = prev.data;
  if (nextData) { // 新增或覆盖旧属性
    for (let key in nextData) {
      patchData(el, key, prevData[key], nextData[key]);
    }
  }
  if (prevData) { // 删除新vnode没有的属性
    for (let key in prevData) {
      const prevVal = prevData[key];
      if (prevVal && !nextData.hasOwnProperty(key)) {
        patchData(el, key, prevVal, null);
      }
    }
  }

  patchChildren(
    prev.childrenFlag,
    next.childrenFlag,
    prev.children,
    next.children,
    el
  );
}

function patchChildren (
  prevChildFrag,
  nextChildFrag,
  prevChildren,
  nextChildren,
  container
) {
  switch (prevChildFrag) {
    case childType.SINGLE:
      switch (nextChildFrag) {
        case childType.SINGLE:
          patch(prevChildren, nextChildren, container);
          break;
        case childType.EMPTY:
          container.removeChild(prevChildren.el);
          break;
        case childType.MULTIPLE:
          container.removeChild(prevChildren.el);
          for (let i = 0; i < nextChildren.length; i++) {
            mount(nextChildren[i], container);
          }
          break;
      }
      break;
    case childType.EMPTY:
      switch (nextChildFrag) {
        case childType.SINGLE:
          mount(nextChildren, container);
          break;
        case childType.EMPTY:
          break;
        case childType.MULTIPLE:
          for (let i = 0; i < nextChildren.length; i++) {
            mount(nextChildren[i], container);
          }
          break;
      }
      break;
    case childType.MULTIPLE:
      switch (nextChildFrag) {
        case childType.SINGLE:
          for (let i = 0; i < prevChildren.length; i++) {
            container.removeChild(prevChildren[i].el);
          }
          mount(nextChildren, container);
          break;
        case childType.EMPTY:
          for (let i = 0; i < prevChildren.length; i++) {
            container.removeChild(prevChildren[i].el);
          }
          break;
        case childType.MULTIPLE:
          updateChildren(prevChildren, nextChildren, container);
          break;
      }
      break;
  }
}

function updateChildren (prevChildren, nextChildren, container) {
  
}

const container = document.getElementById('app');
let vnode = createElement('div', { id: 'test' }, [
  createElement('p', { class: 'p' }, '哈哈'),
  createElement('p', { class: 'p' }, [
    createElement('div', undefined, 'span1'),
    createElement('div', undefined, 'span2')
  ])
]);

render(vnode, container);

console.log(container.vnode);
