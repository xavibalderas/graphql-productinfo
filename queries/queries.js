const queries = {

allbeds:
`{
  allBeds {
      reference
    }
  }`,

combination:
`{
    Bed(reference: $reference) {
      articles {
        id
      }
    }
  }`

};
module.exports.queries = queries;
