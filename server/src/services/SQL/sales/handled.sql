update sirolynia.sales 
set product_received = true 
where id = $1::int;
