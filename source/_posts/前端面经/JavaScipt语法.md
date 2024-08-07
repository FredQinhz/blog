---
title: JavaScipt语法
categories:
  - 前端面经
abbrlink: 8abd83e
date: 2024-08-07 16:11:28
---

## 运算符

### `??` Nullish 合并运算符

**空值合并运算符**。如果第一个参数不为 `null` 或 `undefined` 。返回第一个参数。否则，返回第二个参数。

- 作用：为了弥补`||`运算符的缺陷。

  - 换句话说，`||` 无法区分 `false`、`0`、空字符串 `""` 和 `null/undefined`。它们都一样 —— 假值（falsy values）。如果其中任何一个是 `||` 的第一个参数，那么我们将得到第二个参数作为结果。

  不过在实际中，我们可能只想在变量的值为 `null/undefined` 时使用默认值。也就是说，当该值确实未知或未被设置时。

```js
result = a ?? b;
// 使用三元运算符来实现
result = (a !== null && a !== undefined) ? a : b;
```

### `!!` 等价于 `Boolean()`

是一种用于将任意值**转换为其对应的布尔值**的一种**简便方式**。它实际上是两个逻辑非运算符 `!` 的连用。

`!!a` 等价于 `Boolean(a)`

- **第一个 `!` 运算符**：

  - 将其后的值转换为布尔类型。

  - 如果值是一个“假值”（例如 `null`、`undefined`、`0`、空字符串 `""`、`NaN` 或 `false`），则第一个 `!` 运算符将其转换为 `true`。

  - 如果值是一个“真值”（非上述假值），则第一个 `!` 运算符将其转换为 `false`。

- **第二个 `!` 运算符**：

  - 将上一步得到的布尔值再次取反。

  - 这样做的结果就是，无论初始值是什么，最终的结果都会是 `true` 或 `false`。

这种双重否定的操作常见于需要明确判断一个值是否为真或为假的情况中。它不会改变原始值的类型，而是产生一个布尔值作为结果。



## 数组（列表）

### 初始化

- `let arr = new Array(n).fill(0);` 初始化一个长度为n，全0的数组

    ```js
    let array = [1,1,1,1,1,1];
    array.fill(0,1,3); //从下标1到下标3之前将值改变为0
    ```





## `map()` 高阶函数用法

### 定义

map() 方法是**数组原型的一个函数**，该函数用于**对数组中的每个元素进行处理**，将其转换为另一个值，最终**返回一个新的数组**，该数组包含了经过处理后的每个元素。

- 基本语法：`array.map(callback(currentValue[, index[, array]])[, thisArg])`

  - `callback` ：表示对数组中的每个元素要执行的函数。该函数包含三个参数：

    - `currentValue`：表示正在处理的当前元素。

    - `index`：可选参数，表示正在处理的当前元素的索引。

    - `array`：可选参数，表示正在处理的当前数组。

  - `thisArg`：可选参数，表示执行 `callback` 函数时的 `this` 值。

### 基本使用

- 使用 `map()` 方法将数组中的数字乘以 2 并返回新的数组：
    ```js
    let numbers = [1, 2, 3, 4];
    let doubled = numbers.map(function(num) {
        return num * 2;
    });
    console.log(doubled); // 输出 [2, 4, 6, 8]
    console.log(numbers); // 输出 [1, 2, 3, 4]，原数组并没有发生变化
    ```

- 字符串处理：
    ```js
    // 将字符串数组转换为数字数组：
    let strings = ['1', '2', '3'];
    let numbers = strings.map(function(str) {
        return parseInt(str, 10); //第二个参数表示转化为十进制
    });
    console.log(numbers); // 输出 [1, 2, 3]
    
    // 将一个数组中的字符串转换为另一个数组，只保留长度大于等于5的字符串：
    const words = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
    const longWords = words.map(function(word) {
      if (word.length >= 5) {
        return word;
      }
    });
    console.log(longWords); // ['apple', 'banana', 'cherry', undefined, 'elderberry']
    ```

- 对象数组处理：
    ```js
    let objects = [{ name: 'apple', color: 'red' }, { name: 'banana', color: 'yellow' }, { name: 'orange', color: 'orange' }];
    let colors = objects.map(function(obj) {
        return obj.color;
    });
    console.log(colors); // 输出 ["red", "yellow", "orange"]
    ```

- 可以选择传递可选参数 `thisArg` 来设置回调函数的 `this` 值。如果不传递 `thisArg` 参数，则默认情况下，回调函数的 `this` 值为`undefined`。
    ````js
    let numbers = [1, 2, 3];
    let obj = { multiplier: 2 };
    let doubled = numbers.map(function(num) {
        return num * this.multiplier;
    }, obj);
    console.log(doubled); // 输出 [2, 4, 6]
    ````

  - 上面的例子中，我们定义了一个名为 `numbers` 的数组，其中包含三个数字。我们还定义了一个名为 `obj` 的对象，其中包含一个名为 `multiplier` 的属性，该属性的值为 2。我们在回调函数中使用 `this.multiplier`，其中 `this` 值为 `obj`，来将数组中的每个元素乘以 2。

### 优缺点

#### 优点：

- `map()` 默认会**有返回值**，一般**返回一个数组**。这里要强调一下，函数默认没有返回值。如果函数内部没有明确使用 return 语句返回一个值，那么该函数执行完毕后会自动返回 `undefined`。所以这个也是 `map()` 的一个特色
- 可以方便地对数组中的每个元素进行操作，并生成一个新的数组；
- 不会改变原始数组。

#### 缺点：

- 无法使用break，continue，return等关键字控制循环，**必须全部遍历完毕**才能停止；
- 对于大型数据集合而言，可能会导致性能问题。

数据小的时候，用map（）循环非常的爽，不是很消耗性能。但数据大的情况下，用map（）会很耗性能，**因为map（）会对数组中的每个元素执行一次callback方法**。建议数据大的时候，用for循环。虽然多次for循环嵌套看着恶心，但是性能好，是底层的东西。而所谓的map（），set（），for in，for of 都是在for循环的基础上再封装。单从性能角度考虑，远不如for循环优秀。

### 其他用法

- map循环配合 Array.from 去重	
   ```js
    const arr = [1, 2, 2, 3, 4, 4, 5];
    const newArr = Array.from(new Map(arr.map(item => [item, item])).values());
    console.log(newArr); // [1, 2, 3, 4, 5]
    ```

  - 这段代码的原理是，先使用`map`方法将数组元素映射为键值对的数组。然后使用`Map`构造函数将键值对数组转换为`Map`对象，其中键和值均为数组的元素。由于`Map`对象中键是唯一的，这样就自动去除了数组中的重复项。最后，通过`Array.from()`方法将去重后的`Map`对象的值转换为新的数组。




## Math库常见计算函数的使用

### `Math.max(x, y, z, ...)` 取最大值

### `Math.min(x, y, z, ...)` 取最小值

### `Math.ceil(x)` 向上取整

### `Math.floor(x)` 向下取整

### `Math.trunc(x)` 保留整数部分

- 注意区别于 `ceil()` 和 `floor()`

### `Math.round(x)` 四舍五入x

- 函数返回一个数字四舍五入后最接近的整数

### `Math.random()` 伪随机数

- 函数返回一个浮点,  伪随机数在范围 **[0，1)**。可以根据需要缩放到所需的范围。
- 实现将初始种子选择到随机数生成算法；它**不能被用户选择或重置**

### `Math.abs(x)` 取绝对值

- 传入一个**非数字形式的字符串**或者 **undefined/empty** 变量，将返回 `NaN`。
- 传入 **null** 将返回 `0`

### `Math.pow(x, n)` 指数幂

### `Math.sqrt(x)` 取平方根

### `Math.cbrt(x)` 取立方根

