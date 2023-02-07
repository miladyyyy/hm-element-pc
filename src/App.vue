<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
/*里面的代码可以根据自己需求去进行更改*/
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
// /* 滚动槽 */
// ::-webkit-scrollbar-track {
//   -webkit-box-shadow: inset006px rgba(0, 0, 0, 0.3);
//   border-radius: 10px;
// }
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(114, 124, 245, 1);
}
</style>
