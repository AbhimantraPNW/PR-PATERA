import { Footer } from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { PATERA_BLOG } from '../../../constant';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { FC } from 'react';



const Blog = () => {
  
  return (
    <main>
      <Navbar />
      <div className="container mt-28">
        <div>
          <h1 className="text-5xl font-semibold text-[#152C5B]">Our Workshop</h1>
        </div>

        <div>
          {PATERA_BLOG.map((blog, index) => (
            <div className="flex items-center my-10">
              <div className="relative h-[300px] w-[500px]">
                <Image
                  src={blog.image}
                  alt="gambar 1"
                  layout="fill"
                  objectFit="cover"
                  className="absolute rounded-lg"
                />
              </div>
              <div className="w-1/2 flex flex-col gap-3 mx-auto">
                <h1 className="text-bold text-3xl text-[#152C5B]">{blog.title}</h1>
                <Badge variant="outline" className="rounded-sm bg-green-100 w-fit">{blog.createdAt}</Badge>
                <p className="line-clamp-3">{blog.content}</p>
                <Link href={`/blog/${index + 1}`} className='underline underline-offset-1 w-fit hover:text-blue-700'>Read more</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Blog;
