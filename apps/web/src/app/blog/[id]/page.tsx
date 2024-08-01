'use client';

import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PATERA_BLOG } from '../../../../constant';
import NavbarFeatures from '@/components/NavbarFeatures';

interface BlogPost {
  image: string;
  createdAt: string;
  title: string;
  content: string;
}

const BlogDetail = () => {
  const params = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    const id = params.id;
    if (id) {
      const blogIndex = parseInt(id as string) - 1;
      if (PATERA_BLOG[blogIndex]) {
        setBlog(PATERA_BLOG[blogIndex]);
      }
    }
  }, [params]);

  if (!blog) {
    return (
      <main>
        <NavbarFeatures />
        <div className="container mt-28">
          <h1>Blog post not found</h1>
        </div>
        <Footer />
      </main>
    );
  }
  return (
    <main>
      <NavbarFeatures />
      <div className="container my-6 mt-28 flex flex-col gap-6">
        <div className="mx-auto w-3/4">
          <h1 className="text-4xl font-bold text-[#152C5B]">{blog.title}</h1>
          <Badge
            variant="outline"
            className="mt-4 w-fit rounded-sm bg-green-100"
          >
            {blog.createdAt}
          </Badge>
        </div>
        <div className="relative h-[500px] w-full">
          <Image
            src={blog.image}
            alt="gambar 1"
            layout="fill"
            objectFit="cover"
            className="absolute rounded-lg"
          />
        </div>
        <div className="mx-auto w-full md:w-3/4">
          <p>{blog.content}</p>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default BlogDetail;
