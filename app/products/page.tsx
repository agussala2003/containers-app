import { createClient } from '@/utils/supabase/server';
import { Product } from '@/utils/models/Product';
import ProductCard from '../components/ProductCard';
import { redirect } from 'next/navigation';

export default async function ProductsContainer() {
  const supabase = createClient();
  
  const { data: products } = await supabase.from('products').select('*');
    
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  if (!user) {
    return redirect("/login");
  }
  
  return (
    <div>
      <h1>Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products && products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
