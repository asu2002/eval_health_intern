const fs = require('fs');
const mysql = require('mysql');
const csv = require('fast-csv');

// Import CSV Data to MySQL database
importCsvData2MySQL('ExternalID.csv');

function importCsvData2MySQL(filename) {
    let stream = fs.createReadStream(filename);
    let csvData = [];
    let csvStream = csv
     
        .parse()
        .on("data", function (data) {
            csvData.push(data);
        })
        
        .on("end", function () {
            // Remove Header ROW
            csvData.shift();

            console.log(csvData);

            const temp = csvData.slice(0,10);
            console.log(temp);
 

            // Create a connection to the database
            const connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'Asutosh@2002',
                database: 'eh_malacard'
            });
            console.log(connection);

            // Open the MySQL connection
            
            connection.connect((error) => {
               
            
                if (error) {
                    console.error(error);
                } 
                else {
                    let query = 'INSERT INTO external_id (`deasease_name`,`external_id_source`,`external_number`,`external_url`) VALUES ?';
                    connection.query(query, [temp], (error, response) => {
                        console.log(error || response);
                    
                    });
                }
            
            });
        });

    stream.pipe(csvStream);
}
