#!/usr/bin/env node

const inquirer = require('inquirer')
const program = require('commander')
const axios = require('axios')

const key = '?api_key=RGAPI-a31bdc7d-1b0b-46db-9507-b71a86e185b7'
const url = 'https://euw1.api.riotgames.com/lol/'

program
 .version('1.0.0')
 .option('-s, --statinvoc', "affiche l'id et le niveau de l'invocateur saisie")
 .option('-r, --rank', "affiche les info liée au rang de l'invocateur saisie")
 .option('-p, --point', "affiche le score maitrise totale de l'invocateur saisie")

program.parse(process.argv)


inquirer.prompt([ {
    type: 'input',
    message: "Entrez un nom d'invocateur",
    name: 'invocateur'
  }
])

.then(function (answers) {
  let nominvoc = {}
  nominvoc = answers.invocateur


  if (program.statinvoc) {

    let invoc = {}
    axios.get(url + 'summoner/v3/summoners/by-name/' + nominvoc + key)

    .then(function (infoinvoc) {
      invoc = infoinvoc.data
      console.log("l'id de " + nominvoc + ' est ' + invoc.id + ',')
      console.log("il est niveau " + invoc.summonerLevel)
      })
  }


  if (program.rank) {

    let invoc2 = {}
    axios.get(url + 'summoner/v3/summoners/by-name/' + nominvoc + key)

    .then(function (idinvoc) {
      invoc2 = idinvoc.data
      rang = invoc2.id
      return axios.get(url + 'league/v3/positions/by-summoner/' + rang + key)

    })

    .then(function (rankinvoc) {
      for(let rank of rankinvoc.data) {
      console.log(nominvoc + ' est classé ' + rank.tier + ' ' + rank.rank + ' en ' + rank.queueType + ',')
      console.log('il possede actuellement ' + rank.leaguePoints + ' points,')
      console.log('il a gagne ' + rank.wins + ' fois, et perdu ' + rank.losses + ' fois dans cette categorie de RANKED.')
      }
    })
  }


  if (program.point) {

    let invoc3 = {}
    axios.get(url + 'summoner/v3/summoners/by-name/' + nominvoc + key)

    .then(function (idinvoc) {
      invoc3 = idinvoc.data
      id = invoc3.id
      return axios.get(url + 'champion-mastery/v3/scores/by-summoner/' + id + key)
    })

    .then(function (pointmaitrise) {
      let invoc3b = {}
      invoc3b = pointmaitrise.data
      console.log("Son score totale de maitrise de champion est " + invoc3b)
    })
  }
})
