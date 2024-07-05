insert into sirolynia.product_categories (
	product_id, 
	category_id
) values ($1::int, $2::int)
RETURNING id;