const TYPE = 'memory';
const NAME = 'Demo';

export default async function main(stateDb, addLog, dbStore) {
  await stateDb.execute(`INSERT INTO Tab VALUES ("${TYPE}", "${NAME}")`);

  const db = dbStore.get({ type: TYPE, name: NAME });
  const queries = [
    `CREATE TABLE User (
    id INTEGER,
    name TEXT,
    rate FLOAT,
  );
  CREATE TABLE Flag (
    id INTEGER,
    color TEXT,
    user_id INTEGER NULL,
  );`,
    `INSERT INTO User VALUES (1, "Ferris", 0.87);
  INSERT INTO User VALUES (2, "Kitten", 0.11);
  INSERT INTO User VALUES (3, "Goliath", 0.45);`,
    `INSERT INTO Flag VALUES (100, "Red", 1);
  INSERT INTO Flag VALUES
    (100, "Red", 1), (200, "Green", 2), (300, "Blue", 3),
    (400, "Orange", NULL), (500, "Purple", 2), (600, "Green", 2),
    (700, "Orange", 3);`,
    'SELECT * FROM User;',
    'SELECT * FROM Flag;',
    `SELECT f.color, u.name, u.rate
  FROM Flag f
  LEFT JOIN User u ON f.user_id = u.id;`,
    'SELECT COUNT(*) + 1 FROM Flag WHERE user_id != NULL',
    'ALTER TABLE Flag RENAME TO FlagFlag',
    'ALTER TABLE FlagFlag ADD COLUMN amount INTEGER NULL',
    'ALTER TABLE FlagFlag RENAME COLUMN amount TO something',
    'ALTER TABLE FlagFlag RENAME TO Flag',
    'ALTER TABLE Flag DROP COLUMN something',
    'SELECT color, COUNT(*) FROM Flag GROUP BY color',
  ];

  for (const query of queries) {
    const result = await db.execute(query);

    await addLog({
      type: TYPE,
      name: NAME,
      query,
      result,
    });
  }
}
