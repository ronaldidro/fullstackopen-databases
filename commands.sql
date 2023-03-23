CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INT DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES
('Ron Jeffries', 'https://martinfowler.com/bliki/Yagni.html', 'You are NOT gonna need it!', 5),
('Martin Fowler', 'https://martinfowler.com/articles/distributed-objects-microservices.html', 'Microservices and the First Law of Distributed Objects', 10);