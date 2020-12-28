# 基础知识

##  React 认识

定义

- React 是 Facebook 在 2011 年开发的前端 JavaScript 库。
- 它遵循基于组件的方法，有助于构建可重用的UI组件。
- 它用于开发复杂和交互式的 Web 和移动 UI。
- 尽管它仅在 2015 年开源，但有一个很大的支持社区。

特点

1. 它使用***虚拟 DOM*** 而不是真正的 DOM。
2. 它可以进行**服务器端渲染**。
3. 它遵循**单向数据流**或数据绑定。

优点

1. 性能。提高应用性能
2. 两端。可以方便地在客户端和服务器端使用
3. 可读性。由于 JSX，代码的可读性很好
4. 集成容易。React 很容易与 Meteor/Angular 等其他框架集成
5. 测试便利。使用 React，编写 UI 测试用例变得非常容易

限制

1. React 只是一个库，而不是一个完整的框架，是 MVC 模型中的 V 层（视图层）。
2. 它的库非常庞大，需要时间来理解
3. 新手程序员可能很难理解
4. 编码变得复杂，因为它使用内联模板和 JSX

### React 与 Angular 区别

| **主题**      | **React**            | **Angular**   |
| ------------- | -------------------- | ------------- |
| *1. 体系结构* | 只有 MVC 中的 View   | 完整的 MVC    |
| *2. 渲染*     | 可以进行服务器端渲染 | 客户端渲染    |
| *3. DOM*      | 使用 virtual DOM     | 使用 real DOM |
| *4. 数据绑定* | 单向数据绑定         | 双向数据绑定  |
| *5. 调试*     | 编译时调试           | 运行时调试    |
| *6. 作者*     | Facebook             | Google        |

### JSX(JavaScript XML)

- 是 React 使用的一种文件，它利用 JavaScript 的表现力和类似 HTML 的模板语法,这使得 HTML 文件非常容易理解。
- 此文件能使应用非常可靠，并能够提高其性能。
- 是 JS 的语法扩展，编译后转化成普通的 JS 对象。

注意：

浏览器无法读取 JSX，因为浏览器只能读取普通的 JS 对象，JSX 需要使用 Babel 这样的 JSX 转换器才能转换为 JavaScript 对象。

示例：

```jsx
render(){
    return(        
        <div>
            <h1> Hello World from Edureka!!</h1>
        </div>
    );
}
```

## Virtual DOM

### Real DOM && Virtual DOM

| **Real DOM**                   | **Virtual DOM**                |
| ------------------------------ | ------------------------------ |
| 1. 更新缓慢。                  | 1. 更新更快。                  |
| 2. 可以直接更新 HTML。         | 2. 无法直接更新 HTML。         |
| 3. 如果元素更新，则创建新DOM。 | 3. 如果元素更新，则更新 JSX 。 |
| 4. DOM 操作代价很高。          | 4. DOM 操作非常简单。          |
| 5. 消耗的内存较多。            | 5. 很少的内存消耗。            |

### Virtual DOM 工作原理

基本信息：

1. 一个轻量级的 JavaScript 对象，它最初只是 Real DOM 的副本。
2. 是一个节点树，它将元素、它们的属性和内容作为对象及其属性。
3. React 的渲染函数从 React 组件中创建一个节点树。然后它响应数据模型中的变化来更新该树，该变化是由用户或系统完成的各种动作引起的。 

工作过程（三个步骤）：

1. 当底层数据发生变化时，整个 UI 都在 Virtual DOM 描述中重新渲染。
2. 计算之前的 Real DOM 与新的 Virtual DOM 之间的差异。
3. 计算完成后，将实际需要修改的内容更新到 Real DOM 中。



# React 组件

组件是 React 应用 UI 的构建块。

- 复用性。这些组件将整个 UI 分成小的独立并可重用的部分。
- 独立。每个组件彼此独立，而不会影响 UI 的其余部分。

### 组件中 Render() 作用

- 每个 React 组件强制要求必须有一个 **render()**。
- 返回一个 React 元素，是原生 DOM 组件的表示。
- 如果需要渲染多个 HTML 元素，则必须将它们组合在一个封闭标记内，例如 `<form>`、`<group>`、`<div>` 等。
- 此函数必须保持纯净，即必须每次调用时都返回相同的结果。

### 多个组件嵌入一个组件

```react
class MyComponent extends React.Component{
    render(){
        return(          
            <div>
                <h1>Hello</h1>
                <Header/>
            </div>
        );
    }
}

class Header extends React.Component{
    render(){
        return
            <h1>Header Component</h1>   
   };
}

ReactDOM.render(
    <MyComponent/>, document.getElementById('content')
);
```

### 属性 Props

- 只读组件，不可变。
- 在整个应用中从父组件传递到子组件。子组件永远不能将 prop 送回父组件。这有助于维护单向数据流，通常用于呈现动态生成的数据。

### 状态 State

- React 组件的核心，是数据的来源，必须尽可能简单。
- 基本上状态是确定组件呈现和行为的对象。
- 与props 不同，它们是可变的，并创建动态和交互式组件。可以通过 `this.state()` 访问它们。

#### 更新组件状态

使用 `this.setState()`。

```react
class MyComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'Maxx',
      id: '101'
    }
  }
  render () {
    // 2s 后 name 和 id 变化
    setTimeout(() => { this.setState({ name: 'Jaeha', id: '222' }) }, 2000)
    return (
      <div>
        <h1>Hello {this.state.name}</h1>
        <h2>Your Id is {this.state.id}</h2>
      </div>
    );
  }
}
ReactDOM.render(
  <MyComponent />, document.getElementById('content')
);
```

#### **Props 与 状态的区别**

| **条件**                | **State** | **Props** |
| ----------------------- | --------- | --------- |
| 1. 从父组件中接收初始值 | Yes       | Yes       |
| 2. 父组件可以改变值     | ==No==    | Yes       |
| 3. 在组件中设置默认值   | Yes       | Yes       |
| 4. 在组件的内部变化     | Yes       | ==No==    |
| 5. 设置子组件的初始值   | Yes       | Yes       |
| 6. 在子组件的内部更改   | ==No==    | Yes       |

#### 有状态组件与无状态组件

| **有状态组件**                                               | **无状态组件**                                  |
| ------------------------------------------------------------ | ----------------------------------------------- |
| 1. 在内存中存储有关组件状态变化的信息                        | 1. 计算组件的内部的状态                         |
| 2. 有权改变状态                                              | 2. 无权改变状态                                 |
| 3. 包含过去、现在和未来可能的状态变化情况                    | 3. 不包含过去，现在和未来可能发生的状态变化情况 |
| 4. 接受无状态组件状态变化要求的通知，然后将 props 发送给他们。 | 4.从有状态组件接收 props 并将其视为回调函数。   |

### 箭头函数

用于编写函数的简短语法。

- 函数允许正确绑定组件上下文，因为在 ES6 中默认下不能使用自动绑定。
- 使用高阶函数时，箭头函数非常有用。

```react
//General way
render() {
  return (
    <MyInput onChange={this.handleChange.bind(this)} />
  );
}
//With Arrow Function
render() {
  return (
    <MyInput onChange={(e) => this.handleOnChange(e)} />
  );
}
```

### 生命周期

#### 三个阶段

1. 初始渲染阶段 Mounting

   这是组件即将开始其生命之旅并进入 DOM 的阶段。

2. 更新阶段 Updating

   一旦组件被添加到 DOM，它只有在 ==prop 或状态发生变化==时才可能更新和重新渲染。这些只发生在这个阶段。

3. 卸载阶段 Unmounting

   最后阶段，组件被销毁并从 DOM 中删除。

#### 生命周期方法

| 方法名称                    | 说明                                                         |
| --------------------------- | ------------------------------------------------------------ |
| componentWillMount()        | 在渲染之前执行，在**客户端和服务器端**都会执行。             |
| componentDidMount()         | 仅在第一次渲染后在**客户端**执行。                           |
| componentWillReceiveProps() | 当从父类接收到 props 并且在调用另一个渲染器之前调用。        |
| shouldComponentUpdate()     | 根据特定条件返回 true 或者 false。如果更新组件则返回 true，否则返回 false（默认情况）。 |
| componentWillUpdate()       | DOM 渲染之前调用                                             |
| componentDidUpdate()        | DOM 渲染之后立即调用                                         |
| componentWillUnmount()      | 从 DOM 卸载组件后调用，用于清理内存空间                      |

### 事件

React 中，事件是对鼠标悬停、鼠标单击、按键等特定操作的触发反应。处理这些事件类似于处理 DOM 元素中的事件。

语法差异：

1. 使用驼峰命名法，而不是仅仅是小写字母
2. 事件作为函数而不是字符串传递

事件参数包含一组特定事件的属性，每个事件类型都包含自己的属性与行为，只能通过其事件处理程序访问。

####  创建事件

```react
class Display extends React.Component({
  show (evt) {
    // code   
  },
  render () {
    // Render the div with an onClick prop (value is a function)        
    return (
      <div onClick={this.show}>Click Me!</div>
    );
  }
});
```

#### 合成事件

- 围绕浏览器原生事件，充当跨浏览器包装器的对象。
- 将不同浏览器的行为合并为一个 API。为了确保事件在不同浏览器中显示一致的属性。

### 引用 Refs

- 有助于存储对特定的 React 元素或组件的引用的属性，它将由组件渲染配置函数返回。
- 用于对 render() 返回的特定元素或组件的引用。
- 进行 DOM 测量或向组件添加方法时有用。

```react
class ReferenceDemo extends React.Component {
  display () {
    const name = this.inputDemo.value;
    document.getElementById('disp').innerHTML = name;
  }
  render () {
    return (
      <div>
        Name: <input type="text" ref={input => this.inputDemo = input} />
        <button name="Click" onClick={this.display}>Click</button>
        <h2>Hello <span id="disp"></span> !!!</h2>
      </div>
    );
  }
}
```

使用 Refs 情况：

- 需要管理焦点、选择文本或媒体播放时
- 触发式动画
- 与第三方 DOM 库集成

### 模块化代码

可以使用 export 和 import 属性来模块化代码，有助于在不同的文件中单独编写组件。

```react
// ChildComponent.jsx
export default class ChildComponent extends React.Component {
  render () {
    return (
      <div>
        <h1>This is a child component</h1>
      </div>
    );
  }
}

// ParentComponent.jsx
import ChildComponent from './childcomponent.js';
class ParentComponent extends React.Component {
  render () {
    return (
      <div>
        <App />
      </div>
    );
  }
}
```

### 创建表单

## 函数式组件与类组件不同

## HOC(高阶组件)

## 受控组件与非受控组件

# React Redux

## redux和vuex机制

# React 路由

