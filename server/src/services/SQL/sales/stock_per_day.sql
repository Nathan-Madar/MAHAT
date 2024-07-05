with sold_per_day as (
	select 
		extract(day from date_trunc('day', s.time_of_sale) - date_trunc('day', now())) as days, 
		sum(si.quantity_sold) as sold,
		max(p.amount) as current_stock
	from sirolynia.sale_items si
	join sirolynia.sales s on si.sale_id = s.id
	join sirolynia.products p on si.product_id = p.id
	where p.id = $1
	group by date_trunc('day', s.time_of_sale)
), history as (
	select 
		days,
		sum(sold) over (partition by 1 order by days desc) + current_stock as stock
	from sold_per_day
	where days < 0
), current as (
	select
		0,
		current_stock as stock
	from sold_per_day
	limit 1
)
(select *
from history
order by days)
union all
select *
from current;