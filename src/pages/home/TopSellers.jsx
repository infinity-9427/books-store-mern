// import React, { useEffect, useState } from 'react'
// import BookCard from '../books/BookCard';

// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // import required modules
// import { Pagination, Navigation } from 'swiper/modules';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

// const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"]

// const TopSellers = () => {

//     const [test, setTest] = useState([])

//     useEffect(() => {
//         fetch("books.json")
//         .then(res => res.json()).then((data ) => setTest(data))

//     }, [])

//     console.log(test, 'test');
    
    
//     const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

//    const {data: books = []} = useFetchAllBooksQuery();
  
//     const filteredBooks = selectedCategory === "Choose a genre" ? books : books.filter(book => book.category === selectedCategory.toLowerCase())

//     return (
//         <div className='py-10'>
//             <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>
//             {/* category filtering */}
//             <div className='mb-8 flex items-center'>
//                 <select
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                     name="category" id="category" className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
//                     {
//                         categories.map((category, index) => (
//                             <option key={index} value={category}>{category}</option>
//                         ))
//                     }
//                 </select>
//             </div>

//             <Swiper
//                 slidesPerView={1}
//                 spaceBetween={30}
//                 navigation={true}
//                 breakpoints={{
//                     640: {
//                         slidesPerView: 1,
//                         spaceBetween: 20,
//                     },
//                     768: {
//                         slidesPerView: 2,
//                         spaceBetween: 40,
//                     },
//                     1024: {
//                         slidesPerView: 2,
//                         spaceBetween: 50,
//                     },
//                     1180: {
//                         slidesPerView: 3,
//                         spaceBetween: 50,
//                     }
//                 }}
//                 modules={[Pagination, Navigation]}
//                 className="mySwiper"
//             >

//                 {
//                    filteredBooks.length > 0 && filteredBooks.map((book, index) => (
//                         <SwiperSlide key={index}>
//                             <BookCard  book={book} />
//                         </SwiperSlide>
//                     ))
//                 }



//             </Swiper>


//         </div>
//     )
// }

// export default TopSellers


// Version worked


// import React, { useEffect, useState } from 'react';
// import BookCard from '../books/BookCard';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"];

// const TopSellers = () => {
//     const [books, setBooks] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

//     useEffect(() => {
//         fetch("books.json")
//             .then(res => res.json())
//             .then((data) => setBooks(data));
//     }, []);

//     const filteredBooks = selectedCategory === "Choose a genre" 
//         ? books 
//         : books.filter(book => book.category?.toLowerCase() === selectedCategory.toLowerCase());

//     return (
//         <div className='py-10'>
//             <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>
//             <div className='mb-8 flex items-center'>
//                 <select
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                     name="category" id="category" 
//                     className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'
//                 >
//                     {categories.map((category, index) => (
//                         <option key={index} value={category}>{category}</option>
//                     ))}
//                 </select>
//             </div>

//             <Swiper
//                 slidesPerView={1}
//                 spaceBetween={30}
//                 navigation={true}
//                 breakpoints={{
//                     640: { slidesPerView: 1, spaceBetween: 20 },
//                     768: { slidesPerView: 2, spaceBetween: 40 },
//                     1024: { slidesPerView: 2, spaceBetween: 50 },
//                     1180: { slidesPerView: 3, spaceBetween: 50 },
//                 }}
//                 modules={[Pagination, Navigation]}
//                 className="mySwiper"
//             >
//                 {filteredBooks.map((book, index) => (
//                     <SwiperSlide key={index}>
//                         <BookCard book={book} />
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </div>
//     );
// };

// export default TopSellers;


import React, { useEffect, useState } from 'react';
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"];

const TopSellers = () => {
    const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

    useEffect(() => {
        // First, load the local books.json file
        fetch("books.json")
            .then(res => res.json())
            .then((localBooks) => {
                setBooks(localBooks); // Set initial books from local file
            })
            .catch((error) => console.error("Error fetching local books:", error));

        // Then, fetch new books from API
        fetch("http://localhost:5000/api/books") // API endpoint to fetch books
            .then(res => res.json())
            .then((apiBooks) => {
                // If the API returns new books, merge them with local books
                setBooks(prevBooks => {
                    // Merge the previous books (local) with the new API books
                    const mergedBooks = [...prevBooks, ...apiBooks];
                    return mergedBooks;
                });
            })
            .catch((error) => console.error("Error fetching books from API:", error));
    }, []);

    // Filter books based on selected category
    const filteredBooks = selectedCategory === "Choose a genre" 
        ? books 
        : books.filter(book => book.category?.toLowerCase() === selectedCategory.toLowerCase());

    return (
        <div className='py-10'>
            <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>
            <div className='mb-8 flex items-center'>
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    name="category" id="category" 
                    className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'
                >
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 40 },
                    1024: { slidesPerView: 2, spaceBetween: 50 },
                    1180: { slidesPerView: 3, spaceBetween: 50 },
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {filteredBooks.map((book, index) => (
                    <SwiperSlide key={index}>
                        <BookCard book={book} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TopSellers;

