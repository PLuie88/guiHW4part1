/*
Created by: Preston Luie 01971155
Github account: PLuie88
11/26/24
*/


$(document).ready(function () {
    $.validator.addMethod("checkMaxAndMin", function (value, element, params) {
        var maxCheck = parseInt(value); //cur value in max field
        var minCheck = parseInt($(params).val()); //value of minumum field which is passed into the method
        return maxCheck >= minCheck; //returns true if max is greater than or equal to min
    }, "Invalid: Maximum must be greater than or equal to minimum");
    $('#tableBounds').validate({
        rules: { //for each of the rules it makes it so that the minumum and maximum have to be within the bounds and an input is required
            minC: {
                required: true,
                min: -50,
                max: 50,
            },
            maxC: {
                required: true,
                min: -50,
                max: 50,
                checkMaxAndMin: "#minC" //checks to see if max >= min
            },
            minRow: {
                required: true,
                min: -50,
                max: 50,
            },
            maxRow: {
                required: true,
                min: -50,
                max: 50,
                checkMaxAndMin: "#minRow" //checks to see if max >= min
            }
        },

        messages: { //for each of the bounds it tells the user a helpful message to where their input went wrong
            minC: {
                required: "Please enter a value between -50 and 50",
                min: "Invalid: Please enter a value between -50 and 50",
                max: "Invalid: Please enter a value between -50 and 50"
            },
            maxC: {
                required: "Please enter a value between -50 and 50",
                min: "Invalid: Please enter a value between -50 and 50",
                max: "Invalid: Please enter a value between -50 and 50"
            },
            minRow: {
                required: "Please enter a value between -50 and 50",
                min: "Invalid: Please enter a value between -50 and 50",
                max: "Invalid: Please enter a value between -50 and 50"
            },
            maxRow: {
                required: "Please enter a value between -50 and 50",
                min: "Invalid: Please enter a value between -50 and 50",
                max: "Invalid: Please enter a value between -50 and 50"
            }
        },
        submitHandler: function(form) {
            subButtonClicked();
        }
    });
});

const maxColumn = document.getElementById("maxC");
const minColumn = document.getElementById("minC");

const maxRow = document.getElementById("maxRow");
const minRow = document.getElementById("minRow");

const inputNumForm = document.getElementById("tableBounds");

const minCError = document.getElementById("minCSpan");
const maxCError = document.getElementById("maxCSpan");
const minRError = document.getElementById("minRSpan");
const maxRError = document.getElementById("maxRSpan");

/*
This function is in response to the onclick submit method from the HTML file. In this function I gather all of the data input and clear the table from previous entry
It then checks the values that have been input by the user (see valueChecker for explanation) to ensure that all inputs are valid. If not valid then return and do 
not create the table. If valid then the function will continue on to create the table first creating a temporary table in which we will appened the multiplication results.
First in the table I create the top left tile to be clear so that the table lines up  and append it to the top row which are all headers, I then apply this concept
again for the rows allowing for an easier way to style the first tile in each row as well as the top row. Next I add the appropritate values into their corresponding
spot in each row which I then append to the table itself (values go into rows which then goes into the table) after the valid bounds have been parsed through and all the
rows completed and added to the temporary table, I then append the temporary table to the tablePlaceHodlerFind which then applies my updated table to the html place holder
giving the final product of a correct table.
 */
function subButtonClicked() {

    const tablePlaceHolderFind = document.getElementById("tableHolder");

    //gets values to integers (if applicable)
    const maxCValue = parseInt(maxColumn.value);
    const minCValue = parseInt(minColumn.value);
    const maxRValue = parseInt(maxRow.value);
    const minRValue = parseInt(minRow.value);

    tablePlaceHolderFind.textContent = ""; //clears previous table (if any)


    //create temp variables
    const updateTable = document.createElement("table");
    const tempRow = document.createElement("tr");

    const topLeftFiller = document.createElement("th");
    tempRow.appendChild(topLeftFiller);

    //header for top (horizontal)
    for (var k = minCValue; k <= maxCValue; k++) {
        const tCell = document.createElement("th");
        tCell.textContent = k;
        tempRow.appendChild(tCell);
    }
    updateTable.appendChild(tempRow);


    //fill in rest of table putting values into the row and then appending the row to the table
    for (var j = minRValue; j <= maxRValue; j++) {
        const createdRows = document.createElement("tr");
        const rowHeader = document.createElement("th");
        rowHeader.textContent = j; //set first item in each row to be a header
        createdRows.appendChild(rowHeader);
        for (var i = minCValue; i <= maxCValue; i++) {
            const nCell = document.createElement("td");
            nCell.textContent = i * j;
            createdRows.appendChild(nCell);
        }
        updateTable.appendChild(createdRows); //udpate table with filled in row w/ values
    }
    tablePlaceHolderFind.appendChild(updateTable); //updates holder with completed table

};
