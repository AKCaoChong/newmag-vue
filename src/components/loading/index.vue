<template>
  <div class="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
  </div>
</template>

<script>
export default {
    name:"loading"
}
</script>

<style scoped lang="scss">
@keyframes loading {
    0%{opacity: 1; transform: scale(1.3);}
    100%{opacity: 0.2;transform: scale(.3);}
}
.loading{
    width: 100%;
    height: 15px;
    position: absolute;
    top: 50%;
    margin-top: -7px;
    text-align: center;
    span{
        display: inline-block;
        width: 15px;
        height: 100%;
        margin-right: 5px;
        border-radius: 50%;
        background: #C52E43;
        animation: loading 1.04s ease infinite;
    }
    span:last-child{
        margin-right: 0px;
    }
    span:nth-child(1){
        animation-delay: 0.13s;
    }
    span:nth-child(2){
        animation-delay: 0.26s;
    }
    span:nth-child(3){
        animation-delay: 0.39s;
    }
    span:nth-child(4){
        animation-delay: 0.52s;
    }
    span:nth-child(5){
        animation-delay: 0.65s;
    }
}
</style>