const db = require("../../src/data-access/index");

const mocks = require("./collections.mock");
require("array-foreach-async");

const collectionData = require("../../src/data-access/collections");

describe("Collections", () => {
  beforeEach(async () => {
    await db.query("DELETE FROM product_collection", []);
    await db.query("DELETE FROM collections", []);

    await mocks.collections.forEachAsync(async (c) => {
      await db
        .query(
          `INSERT INTO collections (id, parent, title, collection_type, conditions, groupby, position) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [c.id, c.parent, c.title, c.type, c.conditions, c.groupBy, c.position]
        )
        .catch((e) => {
          console.log(e);
          throw e;
        });
    });
  });

  describe("SELECT", () => {
    test("it should return the specified collection", async () => {
      const collection = mocks.collections[2];
      const result = await collectionData.get(collection.id);

      expect(result.id).toContain(collection.id);
    });

    test("it should return all collections, ordered by position", async () => {
      const result = await collectionData.getAll();

      expect(result.length).toBe(mocks.TOTAL_COLLECTIONS);

      let position = result[0].position;
      result.forEach((c) => {
        expect(c.position).toBeGreaterThanOrEqual(position);
        position = c.position;
      });
    });
  });

  describe("INSERT", () => {
    test("it should insert a new collection", async () => {
      const newCollection = {
        parent: mocks.COLLECTION_AUTO2,
        type: "MANUAL",
        title: "Manual Collection One",
        groupBy: "TERRITORY",
      };

      const id = await collectionData.new(newCollection);

      const query = `SELECT id, parent, title, collection_type, conditions, groupby, position FROM collections WHERE id = $1`;
      const args = [id];
      const insertedCollection = await db
        .query(query, args)
        .then((res) => {
          return res.rows[0];
        })
        .catch((e) => {
          throw e;
        });

      expect(insertedCollection.title).toBe(newCollection.title);
    });
  });
});
