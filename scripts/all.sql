CREATE TABLE IF NOT EXISTS Category (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Product (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(50),
	description VARCHAR(500),
	brand VARCHAR(50),
	image_URL VARCHAR(30),
	price NUMERIC(5, 2),
	category INTEGER,
	createdAt DATE,
	updatedAt DATE,
	CONSTRAINT category FOREIGN KEY (category) REFERENCES category(id)
);

CREATE TABLE IF NOT EXISTS Review (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	comment TEXT,
	rate INTEGER,
	createdAt DATE,
	updatedAt DATE,
	product_id INTEGER,
	CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE IF NOT EXISTS Cart (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	product_id INTEGER,
	CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES product(id)
);