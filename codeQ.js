/* 数组去重 */
// 指定深度
// 递归
function flat_recursive (arr, depth = 1) {
  return depth ? arr.reduce((pre, val) => {
    return [...pre, ...Array.isArray(val) ? flat(val, depth - 1) : [val]]
  }, []) : arr;
}

// 迭代
function flat_iterative (arr, depth = 1) {
  // 由于栈的关系, 这样计算的结果最后是和原来顺序相反的
  let stack = [[arr, depth + 1]];
  let pos = 0;
  while (stack.length) {
    let [item, d] = stack.shift();
    // 需要继续扁平化
    if (Array.isArray(item) && d > 0) {
      stack.unshift(...item.map((val) => [val, d - 1]))
    } else {
      arr[pos++] = item;
    }
  }
  return arr;
}