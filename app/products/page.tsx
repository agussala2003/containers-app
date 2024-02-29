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
      <h1 className='text-center'>Productos</h1>
      <div className='w-full h-10 flex flex-row justify-evenly bg-slate-600'>
        <div>
    <p>hola</p>
        </div>
        <div>
        <p>hola</p>
        </div>
        <div>
        <p>hola</p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4 justify-center w-5/6 mx-auto">
        {products && products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
       
      </div>
    </div>
  );
}
