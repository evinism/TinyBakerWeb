DROP TABLE IF EXISTS job;
DROP TABLE IF EXISTS transform;

CREATE TABLE transform (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  transform_structure TEXT NOT NULL, -- Structure of the transform. Equality is done via this structure.
  domain TEXT NOT NULL, -- IN_MEMORY is currently the only one supported
  location TEXT NOT NULL -- Where (in domain) is the transform defined?
);

CREATE TABLE job (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  status TEXT NOT NULL DEFAULT "INACTIVE",
  transform_id INTEGER NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  completed TIMESTAMP,
);
