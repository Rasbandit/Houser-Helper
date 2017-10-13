create table houses (
    id serial PRIMARY KEY,
    img text,
    loan DECIMAL,
    name text,
    description text,
    desiredRent float,
    address text,
    zip INTEGER,
    city text,
    state text
)

insert into houses (img, loan, name, description, desiredrent, address, zip, city, state)
values(
'http://imagescdn.gabriels.net/reno/imagereader.aspx?imageurl=http%3A%2F%2Fm.sothebysrealty.com%2F1103i215%2F8ceqq6py02n5m6jq94w18e5sw6i215&option=N&w=1600&permitphotoenlargement=false',
50000000,
'OWL MOUNTAIN RANCH',
'Never before offered legacy ranch! Located adjacent to West Buttermilk Ski Area on 61 private acres at the end of the road. The property includes a 15,664 square foot main home with 7 bedrooms, 7 full baths, and 3 half baths, as well as a 2,000 square foot caretakers home with 3 bedrooms and 3 full baths, plus a 7,500 square foot barn that includes a 3,000 square foot heated vehicle maintenance center with lift. Additional features include an inviting great room, chefs kitchen with two ovens, study, theater, pub room, wine room, billiards room, vaulted ceilings, rich wooden accents, private ski run, amazing views and much more. The living area is extended outdoors with a covered and heated dining space, fireplace and sunken hot tub overlooking the ski area. This is the only ski-in/ski-out property on West Buttermilk and it can never be duplicated!',
25000,
'2900 WEST BUTTERMILK ROAD',
81611,
'ASPEN',
'COLORADO'
)

insert into houses
(img, loan, name, description, desiredrent, address, zip, city, state)
values('https://vignette.wikia.nocookie.net/fallout/images/9/90/Harpers_shack.jpg/revision/latest?cb=20120831231543', 
25.00, 'The Shack', 'Its a shack from fallout', 5.00, '123 fake street', 841444, 'lol', 'Washington')

insert into houses
(img, loan, name, description, desiredrent, address, zip, city, state)
values
('https://2.bp.blogspot.com/-IJRYdujk7tU/WSzstqE8GXI/AAAAAAAAXtw/Gzq5eVXPYhojn5EZ4Gtd5_QbwmVem17FgCLcB/s1600/tiny-house-bookstore-5.jpg',
150000,
'Traveling Tiny House Bookstore',
'A traveling tiny house bookstore from France!',
200,
'open road',
'0',
'any town',
'any state'
)

INSERT INTO houses
(img, loan, name, description, desiredRent, address, zip, city, state)
VALUES
('https://i.ytimg.com/vi/6v6RLUb2TQQ/hqdefault.jpg', 
10, 'sticky', 'small but clean and comes with a dog', 5, '4545 e. w. drive', 89999, 'pinetop', 'AZ');



create table favorites (
    id SERIAL PRIMARY key,
    userid INTEGER REFERENCES users(id) not NULL,
    houseid INTEGER REFERENCES houses(id) not Null
)