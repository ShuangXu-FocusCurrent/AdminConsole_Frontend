<script  lang="ts">
import { computed, defineComponent,reactive, toRefs,watch } from 'vue';
import {getGoodsList} from '../request/api';
import {InitData,type ListInt} from "../type/goods";
export default defineComponent({
  setup(){
    const data= reactive(new InitData());
    const originData= reactive(new InitData());
    getGoodsList().then((res)=>{
      if (res.data && res.data.code !== 200) {
        console.error('请求失败:', res.data.message);
      } else {
        data.list = res.data;
       
      }
      

    }).catch(e => {
      console.error('请求出错:', e);
      data.list =e.data ;
      data.selectData.count=e.data.length;
      originData.list=e.data;
      originData.selectData.count=e.data.length;
      console.log("original data: "+ originData.list);

    })
    const dataList=reactive({
      comList:computed(()=>{
        return data.list.slice((data.selectData.page-1)*data.selectData.pagesize,data.selectData.page*data.selectData.pagesize);
      })
    })
    
    const currentChange=(page:number)=>{
      data.selectData.page=page;
    }

    const sizeChange=(pagesize:number)=>{
        data.selectData.pagesize=pagesize;
    }

    const onSubmit=()=>{
      // console.log(data.selectData.title);
      // console.log(data.selectData.introduce);
      let arr:ListInt[]=[];
      if(data.selectData.title|| data.selectData.introduce){
        if(data.selectData.title){
          arr=data.list.filter((value)=>{
            return value.title.indexOf(data.selectData.title) !==-1;
          });
        }
        if(data.selectData.introduce){
          arr=data.list.filter((value)=>{
            return value.introduce.indexOf(data.selectData.introduce) !==-1;
          });
        }
        
      }else{
        arr=data.list
      }
      data.selectData.count=arr.length;
      data.list=arr;
    }
    watch(
      [()=>data.selectData.title,()=>data.selectData.introduce],
      ()=>{
        if(data.selectData.title=="" && data.selectData.introduce==""){
          data.list=originData.list;
          data.selectData.count=originData.selectData.count;
        }
    })
    return {...toRefs(data),currentChange,sizeChange,dataList,onSubmit};
  }
});



</script>
<template>
  <div>
    <div class="select-box"> <el-form :inline="true" :model="selectData" class="demo-form-inline">
      <el-form-item label="Title">
        <el-input v-model="selectData.title" placeholder="Please input Keywords" clearable />
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="selectData.introduce" placeholder="Please input Keywords" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Search</el-button>
      </el-form-item>
    </el-form>
    </div>
      <el-table :data="dataList.comList" border style="width: 100%">
        <el-table-column prop="id" label="id" width="180" />
        <el-table-column prop="title" label="Name" width="180" />
        <el-table-column prop="introduce" label="description" />
      </el-table>
      <el-pagination @current-change='currentChange' @size-change='sizeChange' layout="prev, pager, next" :total="selectData.count*2" />
  </div>
</template>



<style scoped>

</style>