<script setup lang="ts">

</script>

<template>
  <div class="home">
      <el-container>
        <el-header><el-row :gutter="20">
          <el-col :span="4">
            <img src="../assets/logo.svg" />
          </el-col>
          <el-col :span="16">
            <h2>Admin Console</h2>
          </el-col>
          <el-col :span="4">
            log out
          </el-col>
        </el-row></el-header>
        <el-container>
          <el-aside width="200px">Aside</el-aside>
          <el-main>Main</el-main>
        </el-container>
      </el-container>
  </div>
</template>
