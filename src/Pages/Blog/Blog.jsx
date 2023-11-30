import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";


const Blog = () => {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('blog.json')
        .then(res => res.json())
        .then(data => setBlogs(data))
    }, [])

    console.log(blogs)

    return (
        <div className="max-w-7xl mx-auto py-20">
            <Helmet>
                <title>Blog | Sheba Diagnostic Center</title>
            </Helmet>
            <div>
                <h3 className="bg-prime text-white font-bold uppercase text-4xl py-5 text-center rounded-lg">Blog</h3>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-20 mt-10">
                    {
                        blogs.map((data,index) => <div 
                        className="bg-[#f6f6f6] shadow-xl"
                        key={index}>
                            <img className="w-full" src={data.image} alt="" />
                            <div className="text-center p-10">
                                <h3 className="font-bold text-xl mb-2">{data.title}</h3>
                                <p className="font-bold">{data.author}</p>
                                <p>{data.publish_date}</p>
                                <p className="mt-5 text-justify">{data.content}</p>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Blog;