-- Create the payment_method enum type
CREATE TYPE payment_method AS ENUM ('cod', 'upi', 'card', 'netbanking');

-- Update the order table to use the new enum type
ALTER TABLE "order" 
ALTER COLUMN "payment_method" TYPE payment_method 
USING ("payment_method"::text::payment_method);
