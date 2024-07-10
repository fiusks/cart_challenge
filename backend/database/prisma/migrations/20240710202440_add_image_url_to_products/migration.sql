-- Add the new column
ALTER TABLE "Product" ADD "imageUrl" TEXT;

-- Populate the new column with URLs for existing products
UPDATE "Product" SET "imageUrl" = 
  CASE
    WHEN "id" = '7f1b8f21-3be0-4a36-8561-6a5f56e49f3f' THEN 'https://cdn.shopify.com/s/files/1/0587/6075/7446/files/BT-US_Malbec-Regular-1_1060b816-76ec-49ab-81a6-c284715e56cc.jpg?v=1717775207&width=626&crop=center'
    WHEN "id" = 'b6d8e9a0-3a17-4788-bfa7-6b15ebc9e864' THEN 'https://cdn.shopify.com/s/files/1/0587/6075/7446/files/BT-US_Her-Code-1.jpg?v=1705693050&width=626&crop=center'
    WHEN "id" = 'f73df064-302c-4f0a-80ae-1a8f1abafdd1' THEN 'https://cdn.shopify.com/s/files/1/0587/6075/7446/files/BT-US_Floratta-Summer-Love-Set-1_7e5122cb-5b9d-4624-9da9-b92b7142c178.jpg?v=1716562584&width=626&crop=center'
  END;

-- Ensure the new column is not null
ALTER TABLE "Product" ALTER COLUMN "imageUrl" SET NOT NULL;
