<template>
  <div class="app-toast" v-if="isShow" :class="[{'info': type === 'info','success': type === 'success', 'warning': type === 'warning','danger': type === 'danger'}, showContent ? 'fadein' : 'fadeout']">{{text}}</div>
</template>

<script>
export default {

}
</script>

<style>
.app-toast{
    position: fixed;
    left: 50%;
    top: 50%;
    background: #eeeeee;
    padding: 12px;
    border-radius: 5px;
    transform: translate(-50%,-50%);
    color: #333333;
    font-size: 18px;
}
.info{
    background: #00aaee;
    color: #ffffff;
}
.success{
    background: #00ee6b;
    color: #ffffff;
}
.warning{
    background: #eea300;
    color: #ffffff;
}
.danger{
    background: #ee000c;
    color: #ffffff;
}

.fadein {
    animation: animate_in 0.25s;
}

.fadeout {
    animation: animate_out 0.25s;
    opacity: 0;
}

@keyframes animate_in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes animate_out {
    0% {
        opacity: 1;
    }
    100%{
        opacity: 0;
    }
}

</style>