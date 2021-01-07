const file = "static\\data\\samples.json";

function drawChart(sampledata) {

    d3.json(file).then((data) => {

        var samples = data.samples;
        var chosensamplearray = samples.filter(samplename => samplename.id == sampledata);
        var chosensample = chosensamplearray[0];
        var yticks = chosensample.otu_ids.slice(0,10).reverse().map(item => `OTU ${item}`);
        
        
        console.log(samples);
        console.log(chosensample);

        var trace = [{
            type: 'bar',
            //x: chosensample.otu_ids.slice(0,10),
            //y: chosensample.sample_values.slice(0,10),

            y: yticks,
            x: chosensample.sample_values.slice(0,10).reverse(),
            orientation: 'h'
            }];

        var trace1 = [{
            type: 'bubble',
            x: chosensample.otu_ids,
            y: chosensample.sample_values,
            mode: 'markers',
            marker: {
                size: chosensample.sample_values,
                color: chosensample.otu_ids,
                colorscale: "Earth"
              }
            
            }];


        var layout = {

            margin: {t: 30, l: 120}
        }
            
            Plotly.newPlot('bar', trace, layout);
            Plotly.newPlot('bubble', trace1);

        });

}

function displayMetaData(sampledata) {

    var selector = d3.select("#sample-metadata");

    d3.json(file).then((data) => {

        var samplenames = data.metadata.filter(samplename => samplename.id == sampledata);
        

        selector.html("");
        selector.append("h5").text("Id: " + samplenames[0].id);
        selector.append("h5").text("ethnicity: " + samplenames[0].ethnicity);
        selector.append("h5").text("Gender: " + samplenames[0].gender);
        selector.append("h5").text("Age: " + samplenames[0].age);
        selector.append("h5").text("Location: " + samplenames[0].location);
        selector.append("h5").text("Bbtype: " + samplenames[0].bbtype);
        selector.append("h5").text("Wfreq: " + samplenames[0].wfreq);
        console.log(samplenames[0]); 
    });

}





function optionChanged(sampledata) {
// Fetch the JSON data and console log it
    drawChart(sampledata)
    displayMetaData(sampledata)

};

console.log("app file imported")


function setDefault(){

    var selector = d3.select("#selDataset");

    d3.json(file).then((data) => {

        var samplenames = data.names;

        samplenames.forEach(element => {
            selector.append("option").text(element).property("value", element);
          });
    });

    //drawChart(sampledata)
    //displayMetaData(sampledata)
    drawChart(940);
    displayMetaData(940);

}

setDefault()
