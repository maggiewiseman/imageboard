DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS images;

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

-- INSERT INTO images (image, username, title, description) VALUES ('x3hQUsyUdrUfU_g_SvUKw_jt93j6LWMf.png', 'funkychicken', 'Backbone Tutorial', 'Screenshot of backbone tutorial');
--
-- INSERT INTO comments (image_id, posted_by, comment) VALUES ('1', 'Rocky Rhino', 'This image is amaze balls.');
--
-- INSERT INTO comments (image_id, posted_by, comment) VALUES ('1', 'Gina Giraffe', 'I agree, this is totally rad.');

-- SELECT images.title, images.description, images.username, comments.posted_by, comments.comment, comments.created_at
-- FROM images
-- LEFT JOIN comments
-- ON images.id = comments.image_id
-- WHERE images.id = 1
-- ORDER BY comments.created_at DESC NULLS LAST;
-- INSERT INTO images (image, username, title, description) VALUES ('wg8d94G_HrWdq7bU_2wT6Y6F3zrX-kej.jpg', 'discoduck', 'Elvis', 'We can''t go on together with suspicious minds.');
-- INSERT INTO images (image, username, title, description) VALUES ('XCv4AwJdm6QuzjenFPKJocpipRNNMwze.jpg', 'discoduck', 'Hello Berlin', 'This is going to be worth a lot of money one day.');
