
//Select user input field and place in variable
var idSelect = d3.select("#selectDataset");

//Select demographic info (div ul list group) from html file and save in var.
var demographicsTable = d3.select("#sample-metadata");

//Select the bar chart div (from html file) and save in var.
var barChart = d3.select("#bar");

//Select bubble chart div
var bubbleChart = d3.select("#bubble");

//Select gauge chart div
var gaugeChart = d3.select("#gauge");

//Create function to initially populate dropdown menu with IDs, 
//draw charts by default using first ID
function init() {
//     //reset any previous data
       resetData();
    //Use d3 library to read in `samples.json`
    d3.json("data/samples.json", then(data => {
        
        //-------------------------------
        //Populate dropdown menu with IDs
        //-------------------------------
        //Use forEach to loop through each name in data.names array to populate dropdown (with IDs
        data.names.forEach((name => {
            var option = idSelect.append("option");
            option.text(name);
        })) //close forEach

        //Retrieve first ID from the list for initial charts - as default
        var initID = idSelect.property("value");

        //Plot charts using initial ID
        plotCharts(initID);
    })); // Close the .then() 
} //Close the init() function
 
// Create function to reset the divs (to prepare for new data)
function resetData() {

    //Clear the data
    demographicsTable.html("");
    barChart.html("");
    bubbleChart.html("");
    gaugeChart.html("");
} //close resetData()

//Create function to read JSOn and plot charts
function plotCharts(id) {

    //Read in JSON data
    d3.json("data/samples.json").then((data => {

        //--------------------------------
        //Populate the demographics table
        //--------------------------------

        //filter the metadata for ID that was chosen
        var individualMetadata = data.metadata.filter(participant => participant.id == id)[0];

        //Retrieve wash frequency for gauge chart (to be used later)
        var wfreq = individualMetadata.wfreq;

        //Iterate through each key and value in the metadata
        Object.entries(individualMetadata).forEach([key, value]) => {

            var newList = demographicsTable.append("ul");
            //.list-group-flush "removes borders and rounded corners to render list
            //group items edge-to-edge in a parent container (e.g. cards)." (https:// getbootstrap.com)
            newList.attr("class", "list-group list-group-flush");

            //Append a "li" item to the unordered list tag
            var listItem = newList.append("li");

            //Change the class attributes of the list item (for styling)
            listItem.attr("class", "list-group-item p-1 demo-text bg-transparent");

            //Add the key-value pair from the metadata to the demographics list
            listItem.text(`${key}: ${value}`);

        //Close forEach
        };

        //--------------------------------------------
        //Retrieve data for Plotting the Charts
        //--------------------------------------------

        //Filter the samples for the ID that was chosen
        var individualSample = data.samples.filter( sample => sample.id == id)[0];

        //Create empty arrays to store the sample data
        var otuIds = [];
        var otuLabels = [];
        var sampleValues = [];

        //Iterate through each key and value in the sample (to retrieve data for plotting)
        Object.entries(individualSample).forEach([key,value]) => {

            switch (key) {
                // otu_ids is for x values
                case "otu_ids":
                    otuIds.push(value);
                    break;
                //sample_values is for y values
                case "sample_values":
                    sampleValues.push(value);
                    break;
                //otu_labels is for the text values
                case "otu_labels":
                    otuLabels.push(value);
                    break;
                default:
                    break;
            } //Close the switch statement
        }); // Close the forEach

        // Slice and reverse the arrays to get the top 10 values, labels, Ids for the individual
        var topOtuIds = otuIds[0].slice(0, 10).reverse();
        var topOtuLabels = otuLabels[0].slice(0, 10).reverse();
        var topSampleValues = sampleValues[0].slice(0, 10).reverse();

        //Use map function to store the IDs with "OTU" to label y- axis
        var topOtuIdsFormatted = topOtuIds.map(otuID => "OTU " + otuID);

        //------------------------------------------
        //Plot bar chart
        //------------------------------------------

        //Create trace
        var traceBar = {
            x: topSampleValues,
            y: topOtuIdsFormatted,
            text: topOtuLabels,
            type: 'bar',
            orientation: 'h',
            marker: {
                color: 'rgb(29, 145, 192)'
            }
        };

        //Create data array for plotting the chart
        var dataBar = [traceBar];

        //Define plot layout 
        var layoutBar = {
            height: 500,
            width: 600,
            font: {
                family: `Quicksand`
            },
            hoverlabel: {
                font: {
                    family: `Quicksand`
                }
            },
            title: {
                text: `<b> Top OTUs for Test Subject ${id}</b>`;
                font: {
                    size:18,
                    color: 'rgb(34, 94,168)'
                }
            },
            xaxis: {
                title: "<b>Sample Values</b>",
                color: 'rgb(34,94,168'
            },
            yaxis: {
                tickfont: { size: 14}
            }
        }

        //Plot the bar chart to the "bar" div
        Plotly.newPlot("bar", dataBar, layoutBar);


        //---------------------
        //Plot bubble chart
        //---------------------

        // Start by creating trace
        var traceBub = {
            x: otuIds[0],
            y: sampleValues[0]
        }