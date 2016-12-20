# nestedchart
Javascript 2D canvas nested pie-chart



![Alt text](piess.png?raw=true "Optional Title")


```javascript
    var c = new Chart({
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
        donutWith:100,
        radius:100,
        values:[
        {
          max:11,
          current:1,
          currentColor:'#31C820',
          labelPrefix:"JAVA"
        },
        {
          max:14,
          current:3,
          currentColor:'#DA0036',
          labelPrefix:"ANDROİD"
        },
        {
          max:10,
          current:5,
          currentColor:'#291FCC',
          labelPrefix:"IOS"
        },
        {
          max:20,
          current:5,
          currentColor:'#2C6981',
          labelPrefix:"SWİFT"
        }
      ]
    })
    c.render()
        
```

 




