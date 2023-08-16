sudo docker compose up

sudo docker exec -it 6cd3b97b9b51 sh

psql user=postgres

CREATE TABLE blogs (
    id bigserial  primary key,
    author text,
    url text not null,
    title text not null check (length(title) > 0),
    likes int default 0
    );

INSERT INTO blogs (author, url, title, likes)
VALUES ('user1', 'www.notes.com/1', 'first note', 1);


INSERT INTO blogs (author, url, title, likes)
VALUES ('user2', 'www.notes.com/2', 'second note', 2);

SELECT * FROM blogs;
