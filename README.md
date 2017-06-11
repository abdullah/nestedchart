# nestedchart
JavaScript 2D canvas nested pie-chart

[Demo](http://abdullah.github.io/nestedchart/)



![Alt text](piess.png?raw=true "Optional Title")


```javascript
   var config = {
        canvas: "mycanvas",
        cw: 800,
        ch: 800,
        fontSize: 11,
        labelLineWidth: 10,
        labelLineHeight: 4,
        labelLineOffset: 4,
        labelStrokeWeight: 1,
        labelColor: "#111111",
        outSideLineWidth: 10,
        donutWith: 40,
        radius: 200,
        hoverOpacPercent:0.2,
        secondColorOpacPercent:0.6,
        values: [],
        onhover: function () { },
        values:[
        {
          max:11,
          current:1,
          currentColor:'#31C820',
          labelText:" %m JAVA %c JavaScript"
        },
        {
          max:14,
          current:3,
          currentColor:'#DA0036',
          labelText:"ANDROID"
        },
        {
          max:10,
          current:5,
          currentColor:'#291FCC',
          labelText:"IOS"
        },
        {
          max:20,
          current:5,
          currentColor:'#2C6981',
          labelText:"SWIFT"
        }
      ]
    }
    var c = new Chart(config)
    c.draw()
        
```

 




