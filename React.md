# React 项目创建

使用官方脚手架

1. npx create-react-app 命令

   `npx create-react-app <项目名>`

   例如 npx create-react-app my-app，当前目录会出现一个 my-app 的项目。

   ```shell
   Need to install the following packages:
     create-react-app
   Ok to proceed? (y) y
   
   Creating a new React app in /Users/jinlingzhang/Documents/personal/myapp.
   
   Installing packages. This might take a couple of minutes.
   Installing react, react-dom, and react-scripts with cra-template...
   ```

   进入并启动项目

   cd my-app && npm run start

2. npm 命令

   (sudo) npm install -g create-react-app

   create-react-app <项目名>

# 基础知识

##  React 认识

### 定义

- React 是 Facebook 在 2011 年开发的前端 JavaScript 库。
- 它遵循基于组件的方法，有助于构建可重用的UI组件。
- 它用于开发复杂和交互式的 Web 和移动 UI。
- 尽管它仅在 2015 年开源，但有一个很大的支持社区。

### 特点

1. 它使用***虚拟 DOM*** 而不是真正的 DOM。
2. 它可以进行**服务器端渲染**。
3. 它遵循**单向数据流**或数据绑定。

### 优点

1. 性能。提高应用性能
2. 两端。可以方便地在客户端和服务器端使用
3. 可读性。由于 JSX，代码的可读性很好
4. 集成容易。React 很容易与 Meteor/Angular 等其他框架集成
5. 测试便利。使用 React，编写 UI 测试用例变得非常容易

### 限制

1. React 只是一个库，而不是一个完整的框架，是 MVC 模型中的 V 层（视图层）。
2. 它的库非常庞大，需要时间来理解
3. 新手程序员可能很难理解
4. 编码变得复杂，因为它使用内联模板和 JSX

## React 与 Angular 区别

| **主题**      | **React**            | **Angular**   |
| ------------- | -------------------- | ------------- |
| *1. 体系结构* | 只有 MVC 中的 View   | 完整的 MVC    |
| *2. 渲染*     | 可以进行服务器端渲染 | 客户端渲染    |
| *3. DOM*      | 使用 virtual DOM     | 使用 real DOM |
| *4. 数据绑定* | 单向数据绑定         | 双向数据绑定  |
| *5. 调试*     | 编译时调试           | 运行时调试    |
| *6. 作者*     | Facebook             | Google        |

## JSX(JavaScript XML)

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

## 定义

组件是 React 应用 UI 的构建块。

- 复用性。这些组件将整个 UI 分成小的独立并可重用的部分。
- 独立。每个组件彼此独立，而不会影响 UI 的其余部分。

## 组件中 Render() 作用

- 每个 React 组件强制要求必须有一个 **render()**。
- 返回一个 React 元素，是原生 DOM 组件的表示。
- 如果需要渲染多个 HTML 元素，则必须将它们组合在一个封闭标记内，例如 `<form>`、`<group>`、`<div>` 等。
- 此函数必须保持纯净，即必须每次调用时都返回相同的结果。

## 多个组件嵌入一个组件

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

## 属性 Props

- 只读组件，不可变。
- 在整个应用中从父组件传递到子组件。子组件永远不能将 `prop` 送回父组件。这有助于维护单向数据流，通常用于呈现动态生成的数据。

### prop drilling

在构建 React 应用时，在多层嵌套组件中使用另一个嵌套组件提供的数据，最简单的方法就是将 `props` 从每个组件一层一层地传下去，从源组件传到深层嵌套组件。

解决方法：

使用 `React Context`。通过定义提供数据的 `provider` 组件，并允许嵌套的组件通过 `Consumer` 组件或者 `useContext Hook` 使用上下文数据。

**React Context**

通过组件树提供了一个传递数据的方法，从而避免了在每一层手动传递 `props` 属性。

## 状态 State

- React 组件的核心，是数据的来源，必须尽可能简单。
- 基本上状态是确定组件呈现和行为的对象。
- 与props 不同，它们是可变的，并创建动态和交互式组件。可以通过 `this.state()` 访问它们。

### 更新组件状态

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

### **Props 与 状态的区别**

| **条件**                | **State**     | **Props**     |
| ----------------------- | ------------- | ------------- |
| 1. 从父组件中接收初始值 | Yes           | Yes           |
| 2. 父组件可以改变值     | **<u>No</u>** | Yes           |
| 3. 在组件中设置默认值   | Yes           | Yes           |
| 4. 在组件的内部变化     | Yes           | <u>**No**</u> |
| 5. 设置子组件的初始值   | Yes           | Yes           |
| 6. 在子组件的内部更改   | **<u>No</u>** | Yes           |

### 有状态组件（有 State）与无状态组件（无 State）

| **有状态组件**                                               | **无状态组件**                                  |
| ------------------------------------------------------------ | ----------------------------------------------- |
| 1. 在内存中存储有关组件状态变化的信息                        | 1. 计算组件的内部的状态                         |
| 2. 有权改变状态                                              | 2. 无权改变状态                                 |
| 3. 包含过去、现在和未来可能的状态变化情况                    | 3. 不包含过去，现在和未来可能发生的状态变化情况 |
| 4. 接受无状态组件状态变化要求的通知，然后将 props 发送给他们。 | 4.从有状态组件接收 props 并将其视为回调函数。   |

#### 类组件

可以使用其他特性，如状态 state 和生命周期钩子。

#### 函数组件

当组件只是接收 props 渲染到页面时，就是无状态组件，就属于函数组件，也被称为哑组件或展示组件。

函数组件的性能比类组件的性能要高，因为类组件使用的时候要实例化，而函数组件直接执行函数取返回结果即可。为了提高性能，尽量使用函数组件。

| 区别       | 函数组件 | 类组件 |
| ---------- | -------- | ------ |
| this       | 没有     | 有     |
| 生命周期   | 没有     | 有     |
| 状态 State | 没有     | 有     |

## 箭头函数

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

## 生命周期

### 三个阶段

1. 初始渲染阶段 Mounting

   这是组件即将开始其生命之旅并进入 DOM 的阶段。

2. 更新阶段 Updating

   一旦组件被添加到 DOM，它只有在 ==prop 或状态发生变化==时才可能更新和重新渲染。这些只发生在这个阶段。

3. 卸载阶段 Unmounting

   最后阶段，组件被销毁并从 DOM 中删除。

### 七个生命周期方法

| 方法名称                    | 说明                                                         |
| --------------------------- | ------------------------------------------------------------ |
| componentWillMount()        | 在渲染之前执行，在**客户端和服务器端**都会执行。             |
| componentDidMount()         | 仅在第一次渲染后在**客户端**执行。                           |
| componentWillReceiveProps() | 当从父类接收到 props 并且在调用另一个渲染器之前调用。        |
| shouldComponentUpdate()     | 根据特定条件返回 true 或者 false。如果更新组件则返回 true，否则返回 false（默认情况）。 |
| componentWillUpdate()       | DOM 渲染之前调用                                             |
| componentDidUpdate()        | DOM 渲染之后立即调用                                         |
| componentWillUnmount()      | 从 DOM 卸载组件后调用，用于清理内存空间                      |

## 事件

React 中，事件是对鼠标悬停、鼠标单击、按键等特定操作的触发反应。处理这些事件类似于处理 DOM 元素中的事件。

语法差异：

1. 使用驼峰命名法，而不是仅仅是小写字母
2. 事件作为函数而不是字符串传递

事件参数包含一组特定事件的属性，每个事件类型都包含自己的属性与行为，只能通过其事件处理程序访问。

###  创建事件

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

### 合成事件

- 围绕浏览器原生事件，充当跨浏览器包装器的对象。
- 将不同浏览器的行为合并为一个 API。为了确保事件在不同浏览器中显示一致的属性。

## 引用 Refs

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

## 模块化代码

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

## 创建表单

- React 表单类似于 HTML 表单，其状态包含在组件的 state 属性中，并且只能通过 `setState()` 更新。
- 因此元素不能直接更新它们的状态，它们的提交是由 JavaScript 函数处理的。
- 此函数可以完全访问用户输入到表单的数据。

```react
handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault(); // 阻止事件默认行为
}
 
// 提交由 this.handleSubmit 函数处理
render() {
    return (        
        <form onSubmit={this.handleSubmit}>
            <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleSubmit} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}
```

## HOC(高阶组件)

- 高阶组件是重用组件逻辑的高级方法，是一种源于 React 的组件模式。
-  HOC 是自定义组件，在它之内包含另一个组件。
- 可以接受子组件提供的任何动态，但不会修改或复制其输入组件中的任何行为。你可以认为 HOC 是“纯（Pure）”组件。

### HOC 用途

- 代码重用、逻辑和引导抽象
- 渲染劫持
- 状态抽象和控制
- Props 控制

### 纯组件

- 可以编写的最简单、最快的组件。
- 可以替换任何只有 **render()** 的组件。
- 增强了代码的简单性和应用的性能。

## 受控组件与非受控组件

| **受控组件**                                   | **非受控组件**           |
| ---------------------------------------------- | ------------------------ |
| 1. 没有维持自己的状态                          | 1. 保持着自己的状态      |
| 2. 数据由父组件控制                            | 2. 数据由 DOM 控制       |
| 3. 通过 props 获取当前值，然后通过回调通知更改 | 3. Refs 用于获取其当前值 |

## StrictMode(严格模式)

React 的 `StrictMode` 是一种辅助组件，帮助编写更好的 react 组件，可以使用包装一组组件，可进行下述检查：

- 验证内部组件是否遵循某些推荐做法，如果没有，会在控制台给出警告。
- 验证是否使用的已经废弃的方法，如果有，会在控制台给出警告。
- 通过识别潜在的风险预防一些副作用。

## Key

- 用于识别唯一的 Virtual DOM 元素及其驱动 UI 的相应数据。
- 通过回收 DOM 中当前所有的元素来帮助 React 优化渲染。
- 这些 key 必须是唯一的数字或字符串。
- React 只是重新排序元素而不是重新渲染它们。
- 可以提高应用程序的性能。

## 避免组件重新渲染

`React.memo()`: 防止不必要重新渲染**函数组件**

`PureComponent()`: 防止不必要重新渲染类组件

两种方法都非常依赖于传递给组件的 `props` 的浅比较，如果 `props` 没有改变，那么组件将不会重新渲染。

但是浅比较会带来额外的性能损失，使用不当两种方法都非常损耗性能。通过使用 `React Profiler` 可以在使用这些方法前后对性能进行测量，确保实际提升了性能。

## 构造函数 getInitialState

这两者的区别就是 ES6 与 ES5 之间的区别。

ES6 中，应该在类定义的构造函数中，初始化 `State`。

```react
class MyComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = { /* initial state */ };
  }
}
```

ES5 中，在使用 `React.createClass` 时，定义 `getInitialState` 方法初始化 `State`。

```react
var MyComponent = React.createClass({
  getInitialState(){
    return { /* initial state */ };
  }
})
```

上述两种方法写法等价。

# React Redux

## MVC 框架主要问题

- 对 DOM 操作的代价非常高
- 程序运行缓慢且效率低下
- 内存浪费严重
- 由于循环依赖性，组件模型需要围绕 models 和 views 进行创建

## Flux 架构模式

![clipboard.png](https://segmentfault.com/img/bVbqdVk?w=796&h=262/view)

- 强制单向数据流的架构模式
- 控制派生数据，并使具有所有数据权限的中心 store 实现多个组件之间的通信
- 整个应用中的数据更新必须在此处进行
- Flux 为应用提供稳定性并减少运行时的错误

## Redux

### 定义

- Redux 是当今最热门的前端开发库之一。
- 它是 JavaScript 程序的可预测状态容器，用于整个应用的状态管理。
- 使用 Redux 开发的应用易于测试，可以在不同环境中运行，并显示一致的行为。

### 三个原则

1. **单一事实来源**

   整个应用的状态（所有组件的状态）存储在单个 store 中的对象/状态树里，从 Store 自身接收更新。

   单一状态树可以更容易地跟踪随时间的变化，并调试或检查应用程序。

2. **状态是只读的**

   改变状态的唯一方法是去触发一个动作。动作是描述变化的普通 JS 对象。就像 state 是数据的最小表示一样，该操作是对数据更改的最小表示。

3. **使用纯函数进行更改**

   为了指定状态树如何通过操作进行转换，你需要纯函数。纯函数是那些返回值仅取决于其参数值的函数。

![clipboard.png](https://segmentfault.com/img/bVbqdU5?w=515&h=485)

### 四个组件

1. **Action**

   描述发生了什么事情的对象

2. **Reducer**

   确定状态如何变化

3. **Store**

   整个程序的状态/对象树保存在 Store 中

4. **View**

   只显示 Store 提供的数据

#### 定义 Action

- 必须具有 Type 属性，表示正在执行的 ACTION 类型，且必须定义为字符串常量，并且还可以向其添加更多的属性
- Redux 中，Action 被名为 Action Creators 的函数所创建

```react
function addTodo(text) {
    return {
        type: ADD_TODO,
        text
    }
}
```

#### Reducer 作用

- 纯函数，规定应用程序状态在响应 ACTION 后如何改变
- 接受先前的状态和 ACTION 来工作，然后返回一个新的状态
- 它根据操作的类型确定需要执行哪种更新，然后返回新的值。如果不需要完成任务，它会返回原来的状态。

#### Store

- Store 是一个 JavaScript 对象，它可以保存程序的状态，并提供一些方法来访问状态、调度操作和注册侦听器。
- 应用程序的整个状态/对象树保存在单一存储中。因此，Redux 非常简单且是可预测的。
- 可以将中间件传递到 store 来处理数据，并记录改变存储状态的各种操作。所有操作都通过 reducer 返回一个新状态。

### 七个优点

1. **结果的可预测性** 

   由于总是存在一个真实来源，即 store ，因此不存在如何将当前状态与动作和应用的其他部分同步的问题。

2. **可维护性** 

   代码变得更容易维护，具有可预测的结果和严格的结构。

3. **服务器端渲染** 

   你只需将服务器上创建的 store 传到客户端即可。这对初始渲染非常有用，并且可以优化应用性能，从而提供更好的用户体验。

4. **开发人员工具** 

   从操作到状态更改，开发人员可以实时跟踪应用中发生的所有事情。

5. **社区和生态系统** 

   Redux 背后有一个巨大的社区，这使得它更加迷人。一个由才华横溢的人组成的大型社区为库的改进做出了贡献，并开发了各种应用。

6. **易于测试** 

   Redux 的代码主要是小巧、纯粹和独立的功能。这使代码可测试且独立。

7. **组织** 

   Redux 准确地说明了代码的组织方式，这使得代码在团队使用时更加一致和简单。

### 数据流动

![clipboard.png](https://segmentfault.com/img/bVbqdVh?w=1292&h=560)

## Redux 与 Flux 不同之处

| **Flux**                           | **Redux**                        |
| ---------------------------------- | -------------------------------- |
| 1. Store 包含状态和更改逻辑        | 1. Store 和更改逻辑是分开的      |
| 2. 有多个 Store                    | 2. 只有一个 Store                |
| 3. 所有 Store 都互不影响且是平级的 | 3. 带有分层 reducer 的单一 Store |
| 4. 有单一调度器                    | 4. 没有调度器的概念              |
| 5. React 组件订阅 store            | 5. 容器组件是有联系的            |
| 6. 状态是可变的                    | 6. 状态是不可改变的              |

## Redux 和 Vuex机制

# React 路由

## 定义

- 一个构建在 React 之上的强大的路由库，有助于向应用程序添加新的屏幕和流，使 URL 与网页上显示的数据保持同步。
- 负责维护标准化的结构和行为，并用于开发单页 Web 应用。
-  有一个简单的API。

## 存在必要性

- Router 用于**定义多个路由**。

  当用户定义特定的 URL 时，如果此 URL 与 Router 内定义的任何 “路由” 的路径匹配，则用户将重定向到该特定路由。

- 需要在应用中添加一个 Router 库，允许创建多个路由，每个路由都会向我们提供一个独特的视图。

```react
<switch>
    <route exact path=’/’ component={Home}/>
    <route path=’/posts/:id’ component={Newpost}/>
    <route path=’/posts’   component={Post}/>
</switch>
```

## React Router v4 中使用 switch 关键字

虽然 **`<div>`** 用于封装 Router 中的多个路由，当你想要仅显示要在多个定义的路线中呈现的单个路线时，可以使用 “switch” 关键字。

使用时，**`<switch>`** 标记会按顺序将已定义的 URL 与已定义的路由进行匹配。找到第一个匹配项后，它将渲染指定的路径，从而绕过其它路线。

## 三个优点

1. 就像 React 基于组件一样，在 React Router v4 中，API 是 *'All About Components'*。可以将 Router 可视化为单个根组件（**`<BrowserRouter>`**），其中我们将特定的子路由（**`<route>`**）包起来。

2. 无需手动设置历史值：在 React Router v4 中，我们要做的就是将路由包装在 **`<BrowserRouter>`** 组件中。

3. 包是分开的：共有三个包，分别用于 Web、Native 和 Core。这使我们应用更加紧凑。基于类似的编码风格很容易进行切换。

## React Router 与常规路由的不同之处

| **主题**       | **常规路由**                                    | **React 路由**                   |
| -------------- | ----------------------------------------------- | -------------------------------- |
| **参与的页面** | 每个视图对应一个新文件                          | 只涉及单个HTML页面               |
| **URL 更改**   | HTTP 请求被发送到服务器并且接收相应的 HTML 页面 | 仅更改历史记录属性               |
| **体验**       | 用户实际在每个视图的不同页面切换                | 用户认为自己正在不同的页面间切换 |



# React Fiber

## 背景

### React Reconciliation 介绍

是一个算法，计算两棵 DOM 树之间的差异，以得出下一次更新时，哪些部分需要更新。

> E.g. whenever the component's props or state gets updated, whether to make an actual DOM update or not, React will decide by comparing the newly returned element with previously rendered one.

如果两个组件确实不同，则 React 会更新 DOM ，这个过程叫做 **Reconciliation**。

### DOM 中渲染组件方法

主要是两个组件，Reconciler 和 Renderer。

Reconciler 负责计算差异，告诉 React DOM 树的哪些部分需要更新。

Renderer 根据计算的差异，更新 DOM 树。

之所以设计两个阶段，是因为 ReactDOM 和 React Native 有各自的 renderer，但是算法 **Reconciliation** 需要保持一致。

### 旧算法问题

JS 是单线程，因此只有一个线程去处理 UI 更新、响应用户操作和网络请求等。

第一个阶段 Reconciler 中，有两棵树，一棵是当前已经渲染完成的树一棵是需要更新的树，该阶段同步计算两棵树之间的不同之处，此时就会占用主线程，不会响应外部操作，使用的是 JS 引擎的自身调用栈。

因此，React 进行组件渲染时，从 `setState` 开始到渲染完成，整个过程是同步的，不渲染完所有组件不会停止。如果组件比较庞大，则 js 执行会占据主线程较长时间，不会及时响应用户操作，形成页面卡顿，使得 React 在手势、动画等应用中效果较差。

![img](https://pic1.zhimg.com/80/v2-d8f4598c70df94d69825f11dfbf2ca2c_1440w.png)

React Fiber 出现就是解决这个问题：React 组件同步渲染造成的页面卡顿问题，但是不是新的算法，而是之前算法 (React Reconciliation) 的再实现。

## Fiber

旧算法中，React 创建一个包含所有元素的树，需要递归遍历这棵树，为了遍历需要维持一个执行栈。执行栈的问题是，整个子树会很快渲染，反过来降低用户体验。

为了解决执行栈的问题，Facebook 重实现了 Reconciliation 算法。

Fiber 是一个新的数据结构， 表示需要完成的工作。

React 中，每个元素都有对应的 fiber node，Fiber 的主要优势是在每一次渲染中，fiber node 不用重新生成。

Fiber 的架构提供了**调度**、**暂停**和**中断**工作的方法。

## 结构

Fiber 是一个包含组件信息的 JS 对象。

```javascript
FiberNode = {
  return,
  type,
  key,
  props,
  ...
}
```

## 算法

![img](https://blog.kiprosh.com/content/images/2020/06/react-life-cycle.PNG)

## 解决方案

分片，将耗时长的任务分解成很多片，每一片的运行时间很短，虽然总时间依然很长，但是在每个小片执行完之后，都给其他任务一个执行的机会，这样唯一的线程就不会被独占，其他任务依然有运行的机会。

React Fiber 把更新过程碎片化，执行过程如下面的图所示，每执行完一段更新过程，就把控制权交还给React负责任务协调的模块，看看有没有其他紧急任务要做，如果没有就继续去更新，如果有紧急任务，那就去做紧急任务。

因此，同步任务可以被拆解、异步化，浏览器主线程得以调控：

- 暂停运行任务
- 恢复并继续执行任务
- 给不同的任务分配不同的优先级

![img](https://pic1.zhimg.com/80/v2-78011f3365ab4e0b6184e1e9201136d0_1440w.png)

维护每一个分片的数据结构，就是 **Fiber**——比线程(Thread)控制得更精密的并发处理机制。

```javascript
const fiber = {
  stateNode, // 节点实例
  child, // 子节点
  sibling, // 兄弟节点
  return, // 父节点
}
```

## 实现原理

React Fiber 的做法是不使用 Javascript 的栈，而是将需要执行的操作放在自己实现的栈对象上。这样就能在内存中保留栈帧，以便更加灵活的控制调度过程，例如我们可以手动操纵栈帧的调用。

大致上 Fiber 在调度的时候会执行如下流程：

1. 将一个`state`更新需要执行的同步任务拆分成一个 Fiber 任务队列
2. 在任务队列中选出优先级高的Fiber执行，如果执行时间超过了`deathLine`，则设置为`pending`状态挂起状态
3. 一个 Fiber 执行结束或挂起，会调用基于`requestIdleCallback`/`requestAnimationFrame`实现的调度器，返回一个新的Fiber任务队列继续进行上述过程

> `requestIdleCallback` 会让一个低优先级的任务在空闲期被调用，而 `requestAnimationFrame`会让一个高优先级的任务在下一个栈帧被调用，从而保证了主线程按照优先级执行 Fiber 单元。

Fiber 任务优先级

```javascript
module.exports = {  
  NoWork: 0, // No work is pending.
  SynchronousPriority: 1, // For controlled text inputs. 
  TaskPriority: 2, // Completes at the end of the current tick.
  AnimationPriority: 3, // Needs to complete before the next frame.
  HighPriority: 4, // Interaction that needs to complete pretty soon to feel responsive.
  LowPriority: 5, // Data fetching, or result from updating stores.
  OffscreenPriority: 6, // Won't be visible but do the work in case it becomes visible.
};
```

由此我们可以看出 `Fiber `任务的优先级顺序为：

文本框输入 > 本次调度结束需完成的任务 > 动画过渡 > 交互反馈 > 数据更新 > 不会显示但以防将来会显示的任务

### React Fiber 更新过程的两个阶段

一个更新过程可能被优先级更高的更新过程打断，所以 React Fiber 一个更新过程被分为两个阶段(Phase)：第一个阶段Reconciliation Phase 和第二阶段 Commit Phase。

- 第一阶段：React Fiber 会找出需要更新哪些DOM，可以被打断，但打断后再执行需要从头开始；
- 第二阶段：一鼓作气把 DOM 更新完，绝不会被打断。

以 `render()` 函数为界，两个阶段可能会调用的生命周期函数如下。在 React Fiber 中，第一阶段中的生命周期函数在一次加载和更新中可能会被调用多次，因此需要注意生命周期函数的写法，需要适配多次调用的情况，其中 `componentWillMount` 和 `componentWillUpdate` 需要重点关注，可能会引起副作用。

![img](https://pic2.zhimg.com/80/v2-d2c7de3c408badd0abeef40367d3fb19_1440w.png)



实现方式是使用了浏览器的 requestIdleCallback API。





