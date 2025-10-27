import { useState, useEffect } from 'react';
import { Plus, Package } from 'lucide-react';

function App() {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = 'http://localhost:8080/api/products';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
      setError('');
    } catch (err) {
      setError('Failed to load products. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (e) => {
    if (e) e.preventDefault();
    if (!newProductName.trim()) return;

    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newProductName }),
      });

      if (!response.ok) throw new Error('Failed to create product');

      const newProduct = await response.json();
      setProducts([...products, newProduct]);
      setNewProductName('');
      setError('');
    } catch (err) {
      setError('Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-3 mb-8">
            <Package className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Product Manager</h1>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <div className="mb-8">
            <div className="flex gap-3">
              <input
                type="text"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    createProduct(e);
                  }
                }}
                placeholder="Enter product name..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                disabled={loading}
              />
              <button
                onClick={createProduct}
                disabled={loading || !newProductName.trim()}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Products ({products.length})
            </h2>

            {loading && products.length === 0 ? (
              <div className="text-center py-8 text-gray-500">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Package className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>No products yet. Create your first product above!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <Package className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{product.name}</p>
                        <p className="text-sm text-gray-500">ID: {product.id}</p>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;