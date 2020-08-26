const TYPE = 'memory';
const NAME = 'Demo';

export default function main(stateDb, addLog, dbStore) {
  stateDb.execute(`INSERT INTO Tab VALUES ("${TYPE}", "${NAME}")`);

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
  INSERT INTO Flag VALUES (200, "Green", 2);
  INSERT INTO Flag VALUES (300, "Blue", 3);
  INSERT INTO Flag VALUES (400, "Orange", NULL);
  INSERT INTO Flag VALUES (500, "Purple", 2);`,
    'SELECT * FROM User;',
    'SELECT * FROM Flag;',
    `SELECT f.color, u.name, u.rate
  FROM Flag f
  LEFT JOIN User u ON f.user_id = u.id;`,
    'SELECT COUNT(*) + 1 FROM Flag WHERE user_id != NULL',
  ];

  queries.forEach((query) => {
    const result = db.execute(query);

    addLog({
      type: TYPE,
      name: NAME,
      query,
      result,
    });
  });
}
