CREATE TABLE cameras (id SERIAL PRIMARY KEY, url VARCHAR, area_id bigint references areas(id));
INSERT INTO cameras (url, area_id) VALUES ('http://techslides.com/demos/sample-videos/small.mp4', 1),
('http://techslides.com/demos/sample-videos/small.mp4', 1),
('http://techslides.com/demos/sample-videos/small.mp4', 1),
('http://techslides.com/demos/sample-videos/small.mp4', 1),
('http://techslides.com/demos/sample-videos/small.mp4', 2),
('http://techslides.com/demos/sample-videos/small.mp4', 2),
('http://techslides.com/demos/sample-videos/small.mp4', 2),
('http://techslides.com/demos/sample-videos/small.mp4', 2),
('http://techslides.com/demos/sample-videos/small.mp4', 3),
('http://techslides.com/demos/sample-videos/small.mp4', 3),
('http://techslides.com/demos/sample-videos/small.mp4', 3),
('http://techslides.com/demos/sample-videos/small.mp4', 3),
('http://techslides.com/demos/sample-videos/small.mp4', 4),
('http://techslides.com/demos/sample-videos/small.mp4', 4),
('http://techslides.com/demos/sample-videos/small.mp4', 4),
('http://techslides.com/demos/sample-videos/small.mp4', 4);