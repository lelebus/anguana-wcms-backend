const db = require("./index");

module.exports = {
  get: async (id) => {
    const query = `SELECT id, parent, title, collection_type, conditions, groupby, position FROM collections WHERE id = $1`;
    const args = [id];
    return await db
      .query(query, args)
      .then((res) => {
        return parseDetails(res.rows[0]);
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
  },

  getAll: async () => {
    const query = `SELECT id, parent, title, collection_type, conditions, groupby, position FROM collections`;
    return await db
      .query(query, [])
      .then((res) => {
        const results = res.rows;
        results.forEach((row) => {
          row = parseDetails(row);
        });
        return results;
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
  },

  new: async ({ parent, title, type, conditions, groupBy }) => {
    const query = `INSERT INTO collections (parent, title, collection_type, conditions, groupby, position) VALUES ($1, $2, $3, $4, $5, nextval('position_sequence')) RETURNING id`;
    const args = [parent, title, type, conditions, groupBy];
    return await db
      .query(query, args)
      .then((res) => {
        return res.rows[0].id;
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
  },
};

function parseDetails(row) {
  let collection = row;

  collection.type = row.collection_type;
  collection.groupBy = row.groupby;

  return collection;
}
