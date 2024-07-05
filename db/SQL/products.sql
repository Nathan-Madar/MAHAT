select * from sirolynia.products order by id;

insert into sirolynia.products (
	name, 
	amount, 
	selling_price, 
	cost_price,
	upc,
	image,
	min_amount_before_restock,
	is_hidden,
	display_quantity,
	display_price,
	description,
	discount_id
) values (
	'LOTR Playmat',
	5,
	100,
	20,
	123456789,
	'https://cdn.shopify.com/s/files/1/0255/2168/4558/files/DSC_4401_a8a11efc-88d0-4b11-bf3a-126346d2ed34.jpg?v=1684871311',
	2,
	false,
	4,
	100,
	'This "Magic: The Gathering" merchandise set includes a beautifully illustrated playmat featuring a white-haired elf archer, surrounded by ethereal spirits with a volcanic eruption in the background. The set also comes with a series of collectible cards and two deck boxes, all adorned with matching artwork. Perfect for collectors and players alike, this set offers both functional gaming accessories and visually striking art to enhance the playing experience. Ideal for display or active use in gameplay.',
	null
);

-- truncate table sirolynia.products cascade;