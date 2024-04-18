import Image from "next/image";
import Link from "next/link";
import Hero from "@/assets/hero.png";
import P1 from "@/assets/p1.webp";
import P2 from "@/assets/p2.webp";
import P3 from "@/assets/p3.jpg";
import User1 from "@/assets/u1.webp";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-[#FFC8DD] to-[#FFAFCC] min-h-screen font-sans">
      <div className="flex flex-col md:flex-row items-center justify-between px-8 py-20">
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-bold text-[#BDE0FE]">Discover our</h1>
          <h1 className="text-5xl font-bold text-[#A2D2FF]">Unique Products</h1>
          <p className="text-lg text-gray-700 mt-4">
            Browse through our extensive catalogue and find the perfect item for
            you.
          </p>
          <Link
            href="/product"
            className="bg-[#BDE0FE] hover:bg-[#A2D2FF] text-white font-bold py-3 px-6 rounded-full mt-8 inline-block"
          >
            Explore Products
          </Link>
        </div>
        <div className="mt-8 md:mt-0">
          <Image src={Hero} alt="Hero Image" width={400} height={400} />
        </div>
      </div>

      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-[#BDE0FE] mb-8">
            Most Liked Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <ProductCard
              image={P1}
              title="Unique Lightings"
              description="A unique and innovative product"
              price="$4.99"
            />
            <ProductCard
              image={P2}
              title="Penguin Plushie"
              description="A must-have item for your collection"
              price="$7.99"
            />
            <ProductCard
              image={P3}
              title="IPhone Cover"
              description="Elevate your style with this item"
              price="$9.99"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductCard = ({ image, title, description, price }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative h-60">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-[#BDE0FE]">{title}</h3>
        <p className="text-gray-700 mt-2">{description}</p>
        <p className="text-2xl font-bold text-[#A2D2FF] mt-4">{price}</p>
      </div>
    </div>
  );
};
