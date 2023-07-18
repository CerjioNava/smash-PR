// Imports
const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

const { getTournamentsInfo } = require("./query.js");

// Main process
const main = async () => {
    let { data } = await axios.post(
        process.env.API_URL,
        {
            query: getTournamentsInfo,
            variables: {
                page: process.env.PAGES,
                perPage: process.env.PERPAGE,
                cCode: process.env.COUNTRYCODE,
                state: process.env.STATE,
                videogameId: process.env.SMASH_ULTIMATE_ID,
                afterDate: Number(process.env.AFTERDATE),
                beforeDate: Number(process.env.BEFOREDATE),
            },
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.API_TOKEN}`,
            },
        }
    );

    if (data.data) {
        const tournamentsData = data.data.tournaments.nodes.reverse();
        console.log(`Torneos encontrados: ${tournamentsData.length}`);
        const jsonData = JSON.stringify(tournamentsData);
                
        fs.writeFile("data.json", jsonData, (err) => {
            if (err) throw err;
            console.log("El archivo ha sido creado!");
        });
    } else {
        console.error("Query invalida");
    }
};

main();
