CREATE TABLE answers (
  id SERIAL,
  questions_id INT,
  body VARCHAR,
  date_written DATE,
  answerer_name VARCHAR,
  answerer_email VARCHAR,
  reported INT,
  helpful INT,
  PRIMARY KEY(id)
);

CREATE TABLE answers_photos (
  id SERIAL,
  answer_id INT,
  photo_url VARCHAR,
  PRIMARY KEY(id)
);

