const gluesql = import('gluesql');

let Glue;

export async function load() {
  Glue = (await gluesql).Glue;
}

export function getGlue(type, namespace) {
  return new Glue(type, namespace);
}
