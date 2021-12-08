const COLLECTION_AUTO1 = "COLLECTION_AUTO1";
const COLLECTION_AUTO2 = "COLLECTION_AUTO2";
const COLLECTION_MANUAL1 = "COLLECTION_MANUAL1";
const COLLECTION_MANUAL2 = "COLLECTION_MANUAL2";

const TOTAL_COLLECTIONS = 4;

// Insert here info about collections
const collections = [
  {
    id: COLLECTION_AUTO1,
    type: "AUTOMATIC",
    title: "Automatic Collection One",
    conditions: {
      filters: [
        {
          key: "territory",
          value: "=",
          value: "TerritoryOne",
        },
      ],
    },
    groupBy: "TERRITORY",
    position: 1,
  },
  {
    id: COLLECTION_AUTO2,
    parent: COLLECTION_AUTO1,
    type: "AUTOMATIC",
    title: "Automatic Collection Two",
    conditions: {
      filters: [
        // TODO
        {
          key: "territory",
          value: "=",
          value: "TerritoryOne",
        },
      ],
    },
    groupBy: "TERRITORY",
    position: 2,
  },
  {
    id: COLLECTION_MANUAL1,
    type: "MANUAL",
    title: "Manual Collection One",
    groupBy: "TERRITORY",
    position: 3,
  },
  {
    id: COLLECTION_MANUAL2,
    type: "AUTOMATIC",
    title: "Manual Collection Two",
    groupBy: "TERRITORY",
    position: 4,
  },
];

module.exports = {
  COLLECTION_AUTO1,
  COLLECTION_AUTO2,
  COLLECTION_MANUAL1,
  COLLECTION_MANUAL1,

  TOTAL_COLLECTIONS,

  collections,
};
