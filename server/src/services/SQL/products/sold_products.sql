with sold_products as (
	select product_id
	from sirolynia.sale_items
	group by product_id
	having count(*) > 3
)
select *
from sirolynia.products
where id in (select product_id from sold_products);