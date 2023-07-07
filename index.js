// Imports
const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

const { getCaraboboTournaments } = require("./query.js");

// Main process
const main = async () => {
    let { data } = await axios.post(
        process.env.API_URL,
        {
            query: getCaraboboTournaments,
            variables: {
                page: 1,
                perPage: 100,
                cCode: process.env.COUNTRYCODE,
                state: process.env.STATE,
                videogameId: process.env.SMASH_ULTIMATE_ID,
                afterDate: 1670080000,
                beforeDate: 1688824800,
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
        console.log("Query invalida");
    }
};

main();
