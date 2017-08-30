DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS comments;

CREATE TABLE images(
    id SERIAL PRIMARY KEY,
    image VARCHAR(300) NOT NULL,
    username VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    likes INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    image_id INT REFERENCES images(id),
    posted_by VARCHAR(255) NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO images (image, username, title, description) VALUES ('x3hQUsyUdrUfU_g_SvUKw_jt93j6LWMf.png', 'funkychicken', 'Backbone Tutorial', 'Screenshot of backbone tutorial');

INSERT INTO comments (image_id, posted_by, comment) VALUES ('1', 'Rocky Rhino', 'This image is amaze balls.');

INSERT INTO comments (image_id, posted_by, comment) VALUES ('1', 'Gina Giraffe', 'I agree, this is totally rad.');
-- INSERT INTO images (image, username, title, description) VALUES ('wg8d94G_HrWdq7bU_2wT6Y6F3zrX-kej.jpg', 'discoduck', 'Elvis', 'We can''t go on together with suspicious minds.');
-- INSERT INTO images (image, username, title, description) VALUES ('XCv4AwJdm6QuzjenFPKJocpipRNNMwze.jpg', 'discoduck', 'Hello Berlin', 'This is going to be worth a lot of money one day.');
