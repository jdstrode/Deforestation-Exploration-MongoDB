// Create init function  

function init() {
    d3.json("api/plotdata").then((incomingData) => {
        let acState = incomingData[0].AC;
        console.log(acState);
        console.log(incomingData);

        let years = incomingData[0]["Ano/Estados"];
        // console.log(years);
            // Create chartData to insert into newPlot() function
        var chartData = [{
            x: years,
            y: acState, 
            name: "Deforestation By Brazilian States (2004-2019)",
            type: "scatter",
            mode: "lines"
            }];

        // Format the layout of the plot
        var layoutLine = {
        title: "Deforestation By Brazilian States (2004-2019)",

      };

    Plotly.newPlot("chart", chartData, layoutLine); 
    });
}   

d3.selectAll("#selDataset").on("change", getData);

function getData() {
    // STEP A - Select the drop down element
    let dropdownMenu = d3.select("#selDataset");
    var dataset = dropdownMenu.property("value");

    console.log(dataset)

    var data = [];
    console.log(data)
    
        d3.json("api/plotdata").then(incomingData => {
            let years = incomingData[0]["Ano/Estados"];
            console.log(incomingData);
            // console.log(years);
            // console.log(typeof years);

            if (dataset == "AC") {
                data = incomingData[0].AC;
                console.log(data);
            }
            else if (dataset == "AM") {
                data = incomingData[0].AM;
            }
            else if (dataset == "AP") {
                data =  incomingData[0].AP;
            }
            else if (dataset == "MA") {
                data =  incomingData[0].MA;
            }
            else if (dataset == "MT") {
                data =  incomingData[0].MT;
            }
            else if (dataset == "PA") {
                data =  incomingData[0].PA;
            }
            else if (dataset == "RO") {
                data =  incomingData[0].RO;
            }
            else if (dataset == "RR") {
                data =  incomingData[0].RR;
            }
            else if (dataset == "TO") {
                data =  incomingData[0].TO;
            }
            else if (dataset == "AMZ LEGAL") {
                data =  incomingData[0]["AMZ LEGAL"];
            }

            var chartData = [{
                x: years,
                y: data, 
                name: "Deforestation By Brazilian States (2004-2019)",
                type: "scatter",
                mode: "lines"
                }];
    
            // Format the layout of the plot
            var layoutLine = {
            title: "Deforestation By Brazilian States (2004-2019)",
          };
    
        Plotly.newPlot("chart", chartData, layoutLine); 

        });
    }

// console.log("hello")    
init();