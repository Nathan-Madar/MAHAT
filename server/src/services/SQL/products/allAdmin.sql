SELECT 
    product_id,
    name,
    amount,
	  restock_at,
    amount < restock_at as need_restock,
    upc,
    category,
    category_id,  
    subCategory as sub_category,
    sub_category_id,
    selling_price,
    cost_price,
    round(selling_price * ((100 - COALESCE(discountPercent, 0)) / 100), 2) as actual_price,
    discountId as discount_id,
    discountPercent as discount_percent,
    discountDescription as discount_description,
    CASE
      WHEN discountPercent IS NULL THEN null
      ELSE discountOrigin
    END as discount_origin,
    is_hidden,
    image,
    description
FROM (
    SELECT
      ROW_NUMBER() OVER (PARTITION BY name ORDER BY discountPercent desc NULLS LAST) AS row_num,
      a.*
    FROM (
      SELECT 
        p.id as product_id,
        p.name as name, 
        p.amount as amount,
		    p.min_amount_before_restock as restock_at,
        p.upc,
        p.image as image, 
        c.name as category, 
        c.id as category_id,  
        sc.name as subCategory,
        sc.id as sub_category_id, 
        p.selling_price,
        p.cost_price,
        pd.id as discountId,
        pd.percent as discountPercent,
        pd.name as discountDescription,
        'PRODUCT' as discountOrigin,
        is_hidden,
        p.description as description
      FROM sirolynia.products p
      JOIN sirolynia.product_categories pc ON p.id = pc.product_id
      JOIN sirolynia.categories sc ON pc.category_id = sc.id
      JOIN sirolynia.categories c ON sc.parent_category_id = c.id
      LEFT JOIN sirolynia.discounts pd ON p.discount_id = pd.id
      UNION ALL
      SELECT 
        p.id as product_id,
        p.name as name, 
        p.amount as amount,
		    p.min_amount_before_restock as restock_at,
        p.upc,
        p.image as image, 
        c.name as category,
        c.id as category_id,  
        sc.name as subCategory, 
        sc.id as sub_category_id,
        p.selling_price,
        p.cost_price,
        sd.id as discountId,
        sd.percent as discountPercent,
        sd.name as discountDescription,
        'SUB_CATEGORY' as discountOrigin,
        is_hidden,
        p.description as description
      FROM sirolynia.products p
      JOIN sirolynia.product_categories pc ON p.id = pc.product_id
      JOIN sirolynia.categories sc ON pc.category_id = sc.id
      JOIN sirolynia.categories c ON sc.parent_category_id = c.id
      LEFT JOIN sirolynia.discounts sd ON sc.discount_id = sd.id
      UNION ALL
      SELECT 
        p.id as product_id,
        p.name as name, 
        p.amount as amount,
		    p.min_amount_before_restock as restock_at,
        p.upc,
        p.image as image, 
        c.name as category, 
        c.id as category_id,  
        sc.name as subCategory, 
        sc.id as sub_category_id,
        p.selling_price,
        p.cost_price,
        cd.id as discountId,
        cd.percent as discountPercent,
        cd.name as discountDescription,
        'CATEGORY' as discountOrigin,
        is_hidden,
        p.description as description
      FROM sirolynia.products p
      JOIN sirolynia.product_categories pc ON p.id = pc.product_id
      JOIN sirolynia.categories sc ON pc.category_id = sc.id
      JOIN sirolynia.categories c ON sc.parent_category_id = c.id
      LEFT JOIN sirolynia.discounts cd ON c.discount_id = cd.id
    ) a
) r
WHERE row_num = 1
ORDER BY (amount - restock_at), product_id;