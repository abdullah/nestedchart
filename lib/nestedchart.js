window.nestedpie = function (args) {
    
    function mergeOptions(obj1,obj2){
        var obj3 = {};
        for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
        for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
        return obj3;
    }

    var config = {
      elem:document.getElementById("canvas"),
      elemH:200,
      elemW:200,
      colorsetfirst : ["rgba(255,127,80,0.3)","rgba(135,206,250,0.3)","rgba(218,112,214,0.3)","rgba(50,205,50,0.3)","rgba(255,165,0,0.3)","rgba(30,144,255,0.3)"],
      colorsetsecond : ["#ff7f50", "#87cefa", "#da70d6", "#32cd32", "#ffa500", "#1e90ff"],
      datasetfirst : [40,15,10,15,12,8],
      datasetsecond : [1,4,3,9,11,3],
      props:[],
      hoverColor : "rgba(0,0,0.6)",
      centerarea : 20,
      centerareaColor:'#fff',
      onMouseMove : function (e) {
        return e ;
      },
      mouseout : function (e) {
        return e ;
      }
    }


    config = mergeOptions(config,args);


    this.canvas = config.elem
    var centerarea = config.centerarea;

    canvas.width = config.elemW+(centerarea*2)
    canvas.height = config.elemH+(centerarea*2)
    var context = canvas.getContext("2d");

    var offsetX = canvas.offsetLeft;
    var offsetY = canvas.offsetTop;

    var arcs = [];
    var colorsetfirst = config.colorsetfirst;
    var colorsetsecond = config.colorsetsecond;
    var datasetfirst = config.datasetfirst
    var datasetsecond = config.datasetsecond
    var lastend = 0;
    var myTotal = getTotal()
    function getTotal(){
      var myTotal = 0;
        for (var j = 0; j < datasetfirst.length; j++) {
           myTotal += (typeof datasetfirst[j] == 'number') ? datasetfirst[j] : 0;
        }
      return myTotal;
    }
    // Dilimlerin hangi kordinattan başlayıp biteceği
    for (var i = 0; i < datasetfirst.length; i++) {
      arcs.push({
          cx: config.elemW/2+centerarea,
          cy: config.elemW/2+centerarea,
          radius: (config.elemW/2)+centerarea,
          start: lastend,
          end: lastend+(Math.PI*2*(datasetfirst[i]/myTotal)),
          color: colorsetfirst[i],
          data : datasetfirst[i],
          props : config.props[i],
      });
      arcs.push({
          cx: config.elemW/2+centerarea,
          cy: config.elemW/2+centerarea,
          radius: (datasetsecond[i]/datasetfirst[i]*(config.elemW/2))+centerarea,
          start: lastend,
          end: lastend+(Math.PI*2*(datasetfirst[i]/myTotal)),
          color: colorsetsecond[i],
          data : datasetsecond[i],
          props : config.props[i],
      });
      lastend += Math.PI*2*(datasetfirst[i]/myTotal);
    }

    function render(arccs) {

      context.clearRect(config.elemW - config.elemW - context.lineWidth, 
                    config.elemW - config.elemW - context.lineWidth, 
                    config.elemW * 2 + (context.lineWidth*2), 
                    config.elemW * 2 + (context.lineWidth*2));
      for (var i = 0; i < arcs.length; i++) {
          if (arccs+1 != i) {
            context.fillStyle = arcs[i].color;
          }else{
            context.fillStyle = config.hoverColor;
          }
          defineArc(arcs[i]);
          context.lineTo(config.elemW/2+centerarea,config.elemW/2+centerarea);
          context.fill(); 
          context.closePath();
      }

        // ortadakı beyaz alan ıcın
        context.fillStyle = config.centerareaColor;
        context.beginPath();
        context.moveTo(config.elemW/2,config.elemW/2);
        context.arc(config.elemW/2+centerarea, config.elemW/2+centerarea, centerarea, 0, 2 * Math.PI, false);
        context.lineTo(config.elemW/2,config.elemW/2);
        context.fill();
        context.closePath();

    }
    render()
    
    function defineArc(arc) {
        context.beginPath();
        context.moveTo(config.elemW/2+centerarea,config.elemW/2+centerarea);
        context.arc(arc.cx, arc.cy, arc.radius, arc.start, arc.end,false);
        context.closePath();
    }

    
     // handle mousemove events
    function handleMouseMove(e,cb) {
        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);
        for (var i = 0; i < arcs.length; i++) {
            defineArc(arcs[i]);
            if (context.isPointInPath(mouseX, mouseY)) {
                cb(arcs[i])
                if (config.hoverColor != false) {
                  render(i)
                }
                return;
            }else{
                render()
            }
        }
    }
    

    canvas.addEventListener('mousemove',function (e) {
        handleMouseMove(e,function (x) {
          config.onMouseMove(x)
        });
    })

    canvas.addEventListener('mouseout',function (e) {
          config.mouseout(e)
    })

}  
