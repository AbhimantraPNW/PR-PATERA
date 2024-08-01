import { Footer } from '@/components/Footer';
import NavbarFeatures from '@/components/NavbarFeatures';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { PATERA_BLOG } from '../../../constant';

const Blog = () => {
  return (
    <main>
      <NavbarFeatures />
      <div className="container mt-28">
        <div>
          <h1 className="text-5xl font-semibold text-[#152C5B]">
            Our Workshop
          </h1>
        </div>

        <div>
          {PATERA_BLOG.map((blog, index) => (
            <div key={index} className="my-10 flex items-center">
              <div className="relative h-[300px] w-[350px] md:w-[500px]">
                <Image
                  src={blog.image}
                  alt="gambar 1"
                  layout="fill"
                  objectFit="cover"
                  className="absolute rounded-lg"
                />
              </div>
              <div className="mx-auto flex w-1/2 flex-col gap-3">
                <h1 className="text-bold text-3xl text-[#152C5B]">
                  {blog.title}
                </h1>
                <Badge
                  variant="outline"
                  className="w-fit rounded-sm bg-green-100"
                >
                  {blog.createdAt}
                </Badge>
                <p className="line-clamp-3">{blog.content}</p>
                <Link
                  href={`/blog/${index + 1}`}
                  className="w-fit underline underline-offset-1 hover:text-blue-700"
                >
                  Read more
                </Link>
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
