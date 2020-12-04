(function(){
    const baseSize = 16;
    function setRem(){
        const scale = document.documentElement.clientWidth/375;
        document.documentElement.style.fontSize = baseSize * Math.min(scale,2) + "px";
    }
    window.onresize = function(){
        setRem();
    }
})()