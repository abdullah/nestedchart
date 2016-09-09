# nestedchart
Javascript 2D canvas nested pie-chart



![Alt text](piess.png?raw=true "Optional Title")


```
var pie = new Nestedpie({
  elem: DOM, // Canvas elem
  elemH:Number, // Canvas width
  elemW:Number, // Canvas height
  colorsetfirst : <Array>,// Primary color
  colorsetsecond : <Array>,// Second Color
  props:<Array>, // property fields
  datasetfirst : <Array>, // Primary data 
  datasetsecond : <Array>, // Second data 
  centerarea : Number/Boolean, // Center area width , if you don't want center area  set the centerarea:false
  centerareaColor : String, // center area color
  hoverColor : String/Boolean, // Hover color : If you don't want center area set the hoverColor:false
  onMouseMove: // () function a return pie object ,
  mouseout:// () return a canvas obj
})

pie.update({
  datasetsecond : <Array>, // Second data 
})
        
```

 




