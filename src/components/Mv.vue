<template>
  <div class="mv">
      <video :src="aa" controls autoplay loop></video>
  </div>
</template>

<script>
export default {
    data(){
      return{
        
      }
    },
    computed:{
      aa(){
        return this.$route.query.msg
      }
    }
}
</script>

<style>
 .mv{
    position: absolute;
    width: 800px;
    height: 500px;
    background-color: rgba(255, 255, 255, 0.979);
    left: 50%;
    top: 50%;
    transform:translate(-50%,-50%);
  }
  .mv video{
    width: 800px;
    height: 400px;
    margin-top: 50px;
  }
</style>