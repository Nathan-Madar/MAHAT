update sirolynia.product_categories
set category_id = $2::int
where product_id = $1::int;