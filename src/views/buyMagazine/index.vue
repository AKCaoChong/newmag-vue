<template>
  <div class="container">
      <div class="info-group">
          <img src="@/assets/img/ico_logo.png" alt="" class="logo">
          <p class="title">瑞丽杂志官方微店</p>
          <div class="line"></div>
          <img src="@/assets/img/qrcode.png" alt="" class="qrode">
          <p class="desc">识别二维码添加瑞丽微店</p>
          <p class="desc">购买瑞丽纸质杂志</p>
      </div>
  </div>
</template>

<script>
export default {
    name:'buymagazine'
}
</script>

<style scoped lang='scss'>
$width:88px;
.container{
    background-color: #eeeeee;
    bottom:0;
    .info-group{
        margin: 100px auto;
        width: 88%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #ffffff;
        border-radius: 20px;
        .logo{
            margin-top: -$width/2;
            width: $width;
            height: $width;
            border: 4px;
            border-radius: $width/2;
            box-sizing: border-box;
        }
        .title{
            font-size: 18px;
            font-weight: bold;
            color: #333333;
            text-align: center;
            margin: 20px auto;
        }
        .line{
            height: 3px;
            width: 40px;
            background-color: #333333;
        }
        .qrode{
            width: $width*2;
            height: $width*2;
            margin: 20px auto;
        }
        .desc{
            font-size: 14px;
            text-align: center;
            color: #aaaaaa;
            margin-top: 20px
        }
        .desc:last-child{
            margin-top: 0;
            margin-bottom: 20px
        }
    }
}
</style>