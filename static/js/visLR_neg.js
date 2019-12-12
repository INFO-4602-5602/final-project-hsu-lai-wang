        dataset1 = {
            "children":  [{'Name': 'worst', 'Weight': 9.2},
                         {'Name': 'bad', 'Weight': 7.7},
                         {'Name': 'awful', 'Weight': 6.4},
                         {'Name': 'waste', 'Weight': 6.2},
                         {'Name': 'boring', 'Weight': 5.9},
                         {'Name': 'poor', 'Weight': 5.4},
                         {'Name': 'terrible', 'Weight': 4.7},
                         {'Name': 'nothing', 'Weight': 4.6},
                         {'Name': 'worse', 'Weight': 4.5},
                         {'Name': 'no', 'Weight': 4.3},
                         {'Name': 'poorly', 'Weight': 4.1},
                         {'Name': 'horrible', 'Weight': 4.1},
                         {'Name': 'dull', 'Weight': 4.1},
                         {'Name': 'unfortunately', 'Weight': 3.9},
                         {'Name': 'stupid', 'Weight': 3.7},
                         {'Name': 'annoying', 'Weight': 3.7},
                         {'Name': 'script', 'Weight': 3.7},
                         {'Name': 'ridiculous', 'Weight': 3.6},
                         {'Name': 'disappointment', 'Weight': 3.5},
                         {'Name': 'instead', 'Weight': 3.5},
                         {'Name': 'mess', 'Weight': 3.5},
                         {'Name': 'fails', 'Weight': 3.4},
                         {'Name': 'minutes', 'Weight': 3.4},
                         {'Name': 'disappointing', 'Weight': 3.4},
                         {'Name': 'supposed', 'Weight': 3.4},
                         {'Name': 'lame', 'Weight': 3.3},
                         {'Name': 'oh', 'Weight': 3.3},
                         {'Name': 'save', 'Weight': 3.3},
                         {'Name': 'avoid', 'Weight': 3.2},
                         {'Name': 'even', 'Weight': 3.2}]
        };
        
        var diameter = 600;
        var color = d3.scaleOrdinal().range(["#ff7359"]);//d3.scaleOrdinal(d3.schemeCategory20c);

        var bubble = d3.pack(dataset1)
            .size([diameter, diameter])
            .padding(1.5);

        var svg = d3.select("#lrWeight")
            .append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("class", "bubble");

        var nodes = d3.hierarchy(dataset1)
            .sum(function(d) { return d.Weight; });

        var node = svg.selectAll(".node")
            .data(bubble(nodes).descendants())
            .enter()
            .filter(function(d){
                return  !d.children
            })
            .append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        node.append("title")
            .text(function(d) {
                return d.Name + ": " + d.Weight;
            });

        node.append("circle")
            .attr("r", function(d) {
                return d.r;
            })
            .style("fill", function(d,i) {
                return color(d);
            })
            .on('mouseover',function(d){
              d3.select(this)
                .style("opacity", 0.8)
                .style("stroke","black")
                .style("stroke-width",3)
            })
            .on('mouseout', function(d){
              d3.select(this)
                .style("opacity", 1)
                .style("stroke","white")
                .style("stroke-width",0);
            });

        node.append("text")
            .attr("dy", ".2em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.Name.substring(0, d.r / 3);
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", function(d){
                return d.r/3;
            })
            .attr("fill", "white");
        node.append("text")
            .attr("dy", "1.3em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return -d.data.Weight;
            })
            .attr("font-family",  "Gill Sans", "Gill Sans MT")
            .attr("font-size", function(d){
                return d.r/3;
            })
            .attr("fill", "white");
        d3.select(self.frameElement)
            .style("height", diameter + "px");