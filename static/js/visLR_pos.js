        dataset1 = {
            "children":  [{'Name': 'great', 'Weight': 7.3},
                         {'Name': 'excellent', 'Weight': 6.0},
                         {'Name': 'best', 'Weight': 5.1},
                         {'Name': '7', 'Weight': 4.8},
                         {'Name': 'perfect', 'Weight': 4.7},
                         {'Name': 'wonderful', 'Weight': 4.6},
                         {'Name': 'amazing', 'Weight': 4.1},
                         {'Name': 'well', 'Weight': 3.9},
                         {'Name': 'fun', 'Weight': 3.7},
                         {'Name': 'favorite', 'Weight': 3.7},
                         {'Name': 'today', 'Weight': 3.7},
                         {'Name': 'loved', 'Weight': 3.6},
                         {'Name': 'love', 'Weight': 3.5},
                         {'Name': '8', 'Weight': 3.5},
                         {'Name': 'enjoyed', 'Weight': 3.3},
                         {'Name': 'highly', 'Weight': 3.3},
                         {'Name': 'brilliant', 'Weight': 3.2},
                         {'Name': 'it', 'Weight': 3.2},
                         {'Name': 'superb', 'Weight': 3.2},
                         {'Name': 'and', 'Weight': 2.9},
                         {'Name': 'definitely', 'Weight': 2.9},
                         {'Name': 'still', 'Weight': 2.9},
                         {'Name': 'beautiful', 'Weight': 2.9},
                         {'Name': 'you', 'Weight': 2.9},
                         {'Name': 'bit', 'Weight': 2.9},
                         {'Name': 'job', 'Weight': 2.9},
                         {'Name': 'also', 'Weight': 2.8},
                         {'Name': 'fantastic', 'Weight': 2.8},
                         {'Name': 'enjoyable', 'Weight': 2.7},
                         {'Name': 'liked', 'Weight': 2.7}]
        };
        var diameter = 600;
        var color = d3.scaleOrdinal().range([ "#3dc9c4"]);//d3.scaleOrdinal(d3.schemeCategory20c);//d3scaleSequential(d3.interpolateInferno).domain([0, width])

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
                return d.data.Weight;
            })
            .attr("font-family",  "Gill Sans", "Gill Sans MT")
            .attr("font-size", function(d){
                return d.r/3;
            })
            .attr("fill", "white");

        d3.select(self.frameElement)
            .style("height", diameter + "px");