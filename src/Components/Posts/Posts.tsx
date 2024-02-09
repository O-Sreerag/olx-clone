import { useState, useEffect } from 'react';
import supabase from '../../config/supabase'; // Import the Supabase client
import Heart from '../../assets/Heart';
import './Post.css';

// Define the type of your product objects
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image_url: string;
  // Add any additional properties if needed
}

function Posts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from Supabase
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products') // Specify the type of data you're fetching
          .select('*');

        if (error) {
          throw error;
        }

        // if (data) {
        //   setProducts(data);
        // }

        if (data) {
          // Map through the products and update the image_url to include the full URL
          const productsWithAbsoluteURLs = data.map(product => ({
            ...product,
            image_url: `https://diucbryvjnusljxhxaaq.supabase.co/storage/v1/object/public/my-images/${product.image_url}`
            // image_url: `https://supabase.com/dashboard/project/diucbryvjnusljxhxaaq/storage/buckets/my-images/${product.image_url}`
          }));
          setProducts(productsWithAbsoluteURLs);
        }
      } catch (error) {
        console.error('Error fetching products:', (error as Error).message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div key={product.id} className="card">
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.image_url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              {/* Add date if available in the product data */}
            </div>
          ))}
        </div>
      </div>
      {/* Additional content */}
    </div>
  );
}

export default Posts;
