// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(`/api/products?page=${currentPage}`);
//         setProducts(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchProducts();
//   }, [currentPage]);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   return (
//     <div>
//       {/* Render your product list */}
//       <ul>
//         {products.map((product) => (
//           <li key={product._id}>
//             <p>{product.name}</p>
//             <p>{product.price}</p>
//             {/* ... other product details */}
//           </li>
//         ))}
//       </ul>

//       {/* Render pagination buttons */}
//       <div>
//         <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
//           Previous
//         </button>
//         <span> Page {currentPage} </span>
//         <button onClick={() => handlePageChange(currentPage + 1)}> Next </button>
//       </div>
//     </div>
//   );
// };

// export default ProductList;


// const len = 10;
// const pageNumber = Math.floor(len/3 );




// const express = require('express');
// const { MongoClient } = require('mongodb');

// const app = express();
// const PORT = process.env.PORT || 3001;

// const mongoUri = 'mongodb://localhost:27017';
// const dbName = 'your-database';
// const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

// app.get('/api/products', async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = 10;

//   try {
//     await client.connect();
//     const db = client.db(dbName);
//     const products = await db.collection('products')
//       .find({})
//       .skip((page - 1) * limit)
//       .limit(limit)
//       .toArray();

//     res.json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   } finally {
//     await client.close();
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

