<template>
  <!-- Header 区域 -->
  <Header />
  <!-- Header 区域 -->
  <div class="Base__container">
    <div class="Base__cont">
      <div class="row">
        <!-- 左侧 -->
        <div class="col-9">
          <router-view></router-view>
        </div>
        <!-- 右侧 -->
        <div class="col">
          <Sidebar />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'
</script>

<style lang="less">
@import url('@/assets/Less/Layout/Base.less');
</style>
