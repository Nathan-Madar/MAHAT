select * from sirolynia.discounts;

insert into sirolynia.discounts (name, description, percent) values ('SALE', 'BIG SALE', 40);

select * from sirolynia.categories;

insert into sirolynia.categories (name, parent_category_id, discount_id) values ('Boosters', 1, 1);

select * from sirolynia.product_categories;

insert into sirolynia.product_categories (product_id, category_id) values (6,5);

select * from sirolynia.products;
