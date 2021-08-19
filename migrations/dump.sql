CREATE TABLE animals (
	id text not null,
	kind text not null,
	positionX numeric not null,
	positionY numeric not null,
	status text not null
);

INSERT INTO animals ( id, kind, positionX, positionY, status ) VALUES ( '0bd6e264-815c-4b71-890c-f9f40a5abb50', 'Cat', 12.0210, 26.23023, 'CREATED' );
INSERT INTO animals ( id, kind, positionX, positionY, status ) VALUES ( '15c40e6a-ff28-455d-b178-548686049d79', 'Dog', 48.230, 24.4340, 'REMOVED' );
INSERT INTO animals ( id, kind, positionX, positionY, status ) VALUES ( 'e7150ff8-bc06-4938-a1ec-9f69e76c66dc', 'Snake', 4.22342,20.23434, 'CREATED' );
INSERT INTO animals ( id, kind, positionX, positionY, status ) VALUES ( '78b30465-17cc-49a1-8942-b03d7f2d5fad', 'Fish', 70.2322, 234.6567, 'UPDATED' );