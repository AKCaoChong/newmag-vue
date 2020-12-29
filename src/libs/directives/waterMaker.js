function addWaterMaker(str, parentNode, font, textColor){
    let can = document.createElement('canvas')
    parentNode.appendChild(can)
    can.width = 200
    can.height = 150
    can.style.display = 'none'
    var context = can.getContext('2d')
    context.rotate((-20 * Math.PI)/180)
    context.font = font || '16px Microsoft JhengHei'
    context.fillStyle = textColor || 'rgba(180,180,180,0.3)'
    context.textAlign = 'left'
    context.textBaseline = 'middle'
    context.fillText(str,can.width/10,can.height/2)
    parentNode.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
}

const waterMaker = {
    bind: function(el, binding){
        addWaterMaker(binding.value.text,el,binding.value.font,binding.value.textColor)
    }
}

export default waterMaker

{/* <template>
  <div v-waterMarker="{text:'lzg版权所有',textColor:'rgba(180, 180, 180, 0.4)'}"></div>
</template> */}