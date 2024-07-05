select 
	p.id,
	p.name,
	s.quantity_sold,
	s.selling_price_at_time,
	d.name as discount,
	d.percent as discount_percent,
	p.image
from sirolynia.sale_items s
join sirolynia.products p on s.product_id = p.id
left join sirolynia.discounts d on s.discount_id = d.id
where sale_id = $1::int;