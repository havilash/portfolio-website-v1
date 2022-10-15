USE db_havilash_sivaratnam;


INSERT INTO users (username, password)
VALUES ("test", "test");

INSERT INTO auth (refresh_token, valid_until)
VALUES ("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhc2RmIiwiaWF0IjoxNjY1ODUzMDc0fQ.GUBctnl_39sRoK1os-4mGArwNiIebIQmFjydfdJJrmc", NOW() + INTERVAL 7 DAY);

DELETE FROM auth a
WHERE a.valid_until < NOW();

DELETE FROM auth a
WHERE a.refresh_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhc2RmIiwiaWF0IjoxNjY1ODUzMDc0fQ.GUBctnl_39sRoK1os-4mGArwNiIebIQmFjydfdJJrmc";