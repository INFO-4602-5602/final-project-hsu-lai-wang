console.log("I am in the bubble.js");
    var w = window.innerWidth*.7*0.95;
        var h = Math.ceil(w*0.4);
        var oR = 0;
        var nTop = 0;
         
        var svgContainer = d3.select("#mainBubble")
            .style("height", h*0.7+"px");
    
       var svg = d3.select("#mainBubble").append("svg").attr("align","center")
            .attr("class", "mainBubbleSVG")
            .attr("width", w*1.3)
            .attr("height",h*0.9)
            .on("mouseleave", function() {console.log("mouse leave");return resetBubbles();});
    
    
        d3.json("main_bubble.json", function(error, root) {
            console.log(error);
         
            var bubbleObj = svg.selectAll(".topBubble")
                    .data(root.children)
                .enter().append("g")
                    .attr("id", function(d,i) {return "topBubbleAndText_" + i});
                 
            console.log(root);  
            nTop = root.children.length;
            oR = w/(1+3*nTop)*0.7;  
     
        h = Math.ceil(w/nTop*2);
        svgContainer.style("height",h+"px");
             
            var colVals = d3.scaleOrdinal(d3.schemeCategory10);
             
            bubbleObj.append("circle")
                .attr("class", "topBubble")
                .attr("id", function(d,i) {return "topBubble" + i;})
                .attr("r", function(d) { return oR; })
                .attr("cx", function(d, i) {return oR*(4*(1+i)-1);})
                .attr("cy", (h+oR)/3)
                .style("fill", function(d,i) { return colVals(i); }) // #1f77b4
            .style("opacity",0.3)
                .on("mouseover", function(d,i) {return activateBubble(d,i);});
                 
            bubbleObj.append("text")
                .attr("class", "topBubbleText")
                .attr("x", function(d, i) {return oR*(4*(1+i)-1);})
                .attr("y", (h+oR)/3)
            .style("fill", function(d,i) { return colVals(i); }) // #1f77b4
                .attr("font-size", 16)
                .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("alignment-baseline", "middle")
                .text(function(d) {return d.name})      
                .on("mouseover", function(d,i) {return activateBubble(d,i);});
             
            for(var iB = 0; iB < nTop; iB++)
            {
                var childBubbles = svg.selectAll(".childBubble" + iB)
                    .data(root.children[iB].children)
                    .enter().append("g");
                     
            //var nSubBubble = Math.floor(root.children[iB].children.length/2.0);   
                 
                childBubbles.append("circle")
                    .attr("class", "childBubble" + iB)
                    .attr("id", function(d,i) {return "childBubble_" + iB + "sub_" + i;})
                    .attr("r",  function(d) {return oR/3.0;})
                    .attr("cx", function(d,i) {return (oR*(4*(iB+1)-1) + oR*1.5*Math.cos((i-1)*45/180*3.1415926));})
                    .attr("cy", function(d,i) {return ((h+oR)/3 +        oR*1.5*Math.sin((i-1)*45/180*3.1415926));})
                    .attr("cursor","pointer")
                    .style("opacity",0.5)
                    .style("fill", "#eee")
                    .on("click", function(d,i) {
                    window.open(d.address);                 
                  })
                .on("mouseover", function(d,i) {
                  //window.alert("say something");
                  var noteText = "";
                  if (d.note == null || d.note == "") {
                    noteText = d.address;
                  } else {
                    noteText = d.note;
                  }
                  d3.select("#bubbleItemNote").text(noteText);
                  })
                .append("svg:title")
                .text(function(d) { return d.address; });   
     
                childBubbles.append("text")
                    .attr("class", "childBubbleText" + iB)
                    .attr("x", function(d,i) {return (oR*(4*(iB+1)-1) + oR*1.5*Math.cos((i-1)*45/180*3.1415926));})
                    .attr("y", function(d,i) {return ((h+oR)/3 +        oR*1.5*Math.sin((i-1)*45/180*3.1415926));})
                    .style("opacity",0.5)
                    .attr("text-anchor", "middle")
                .style("fill", function(d,i) { return colVals(iB); }) // #1f77b4
                    .attr("font-size", 9)
                    .attr("cursor","pointer")
                    .attr("dominant-baseline", "middle")
                .attr("alignment-baseline", "middle")
                    .text(function(d) {return d.name})      
                    .on("click", function(d,i) {
                    window.open(d.address);
                    }); 
     
            }
     
             
            }); 
     
        resetBubbles = function () {
          var w = window.innerWidth*0.7*0.95;
          oR = w/(1+3*nTop)*0.7;  
          
          h = Math.ceil(w/nTop*2);
          svgContainer.style("height",h+"px");
               
          svg.attr("width", w);
          svg.attr("height",h);       
           
          d3.select("#bubbleItemNote").text("D3.js bubble menu developed by Shipeng Sun (sunsp.gis@gmail.com), Institute of Environment, University of Minnesota, and University of Springfield, Illinois.");
           
          var t = svg.transition()
              .duration(650);
             
            t.selectAll(".topBubble")
                .attr("r", function(d) { return oR; })
                .attr("cx", function(d, i) {return oR*(4*(1+i)-1);})
                .attr("cy", (h+oR)/3);
     
            t.selectAll(".topBubbleText")
            .attr("font-size", 16)
                .attr("x", function(d, i) {return oR*(4*(1+i)-1);})
                .attr("y", (h+oR)/3);
         
          for(var k = 0; k < nTop; k++) 
          {
            t.selectAll(".childBubbleText" + k)
                    .attr("x", function(d,i) {return (oR*(4*(k+1)-1) + oR*1.5*Math.cos((i-1)*45/180*3.1415926));})
                    .attr("y", function(d,i) {return ((h+oR)/3 +        oR*1.5*Math.sin((i-1)*45/180*3.1415926));})
                .attr("font-size", 9)
                    .style("opacity",0.5);
     
            t.selectAll(".childBubble" + k)
                    .attr("r",  function(d) {return oR/3.0;})
                .style("opacity",0.5)
                    .attr("cx", function(d,i) {return (oR*(4*(k+1)-1) + oR*1.5*Math.cos((i-1)*45/180*3.1415926));})
                    .attr("cy", function(d,i) {return ((h+oR)/3 +        oR*1.5*Math.sin((i-1)*45/180*3.1415926));});
                         
          }   
        }
             
             
            function activateBubble(d,i) {
                // increase this bubble and decrease others
                var t = svg.transition()
                    .duration(d3.event.altKey ? 7500 : 350);
         
                t.selectAll(".topBubble")
                    .attr("cx", function(d,ii){
                        if(i == ii) {
                            // Nothing to change
                            return oR*(4*(1+ii)-1) - 0.6*oR*(ii-1);
                        } else {
                            // Push away a little bit
                            if(ii < i){
                                // left side
                                return oR*0.6*(4*(1+ii)-1);
                            } else {
                                // right side
                                return oR*(nTop*4+1) - oR*0.6*(4*(nTop-ii)-1);
                            }
                        }               
                    })
                    .attr("r", function(d, ii) { 
                        if(i == ii)
                            return oR*1.8;
                        else
                            return oR*0.8;
                        });
                         
                t.selectAll(".topBubbleText")
                    .attr("x", function(d,ii){
                        if(i == ii) {
                            // Nothing to change
                            return oR*(4*(1+ii)-1) - 0.6*oR*(ii-1);
                        } else {
                            // Push away a little bit
                            if(ii < i){
                                // left side
                                return oR*0.6*(4*(1+ii)-1);
                            } else {
                                // right side
                                return oR*(nTop*4+1) - oR*0.6*(4*(nTop-ii)-1);
                            }
                        }               
                    })          
                    .attr("font-size", function(d,ii){
                        if(i == ii)
                            return 16*1.5;
                        else
                            return 16*0.6;              
                    });
         
                var signSide = -1;
                for(var k = 0; k < nTop; k++) 
                {
                    signSide = 1;
                    if(k < nTop/2) signSide = 1;
                    t.selectAll(".childBubbleText" + k)
                        .attr("x", function(d,i) {return (oR*(4*(k+1)-1) - 0.6*oR*(k-1) + signSide*oR*2.5*Math.cos((i-1)*45/180*3.1415926));})
                        .attr("y", function(d,i) {return ((h+oR)/3 + signSide*oR*2.5*Math.sin((i-1)*45/180*3.1415926));})
                        .attr("font-size", function(){
                                return (k==i)?14:9;
                            })
                        .style("opacity",function(){
                                return (k==i)?1:0;
                            });
                         
                    t.selectAll(".childBubble" + k)
                        .attr("cx", function(d,i) {return (oR*(4*(k+1)-1) - 0.6*oR*(k-1) + signSide*oR*2.5*Math.cos((i-1)*45/180*3.1415926));})
                        .attr("cy", function(d,i) {return ((h+oR)/3 + signSide*oR*2.5*Math.sin((i-1)*45/180*3.1415926));})
                        .attr("r", function(){
                                return (k==i)?(oR*0.55):(oR/3.0);               
                        })
                        .style("opacity", function(){
                                return (k==i)?1:0;                  
                            }); 
                }                   
            }
         
        window.onresize = resetBubbles;