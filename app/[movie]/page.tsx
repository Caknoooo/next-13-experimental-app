import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );
  const res = await data.json();
  return res.results.map((movie:any) => ({
    movie: toString(movie.id),

  }))
}

export default async function MovieDetail({ params }) {
  const { movie } = params;
  const imagePath = "https://image.tmdb.org/t/p/original";
  const data = await fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`);
  const res = await data.json();


  return (
    <div>
      <div>
        <h2 className="text-4xl">{res.title}</h2>
        <h2 className="text-lg">{res.release_date}</h2>
        <h2>Runtime: {res.runtime}</h2>
        <div className="flex space-x-4">
          <h2 className="bg-green-600 inline-block my-2 py-2 px-4 rounded-md">
            {res.status}
          </h2>
          <button className="bg-yellow-400 inline-block my-2 px-4 py-2 rounded-md">
            <Link href={'/'}>Back</Link>
          </button>
        </div>
        <Image
          className="my-12 w-full"
          src={imagePath + res.backdrop_path}
          width={1000}
          height={1000}
          alt={res.title}
          priority
        />
        <p>{res.overview}</p>
      </div>
    </div>
  );
}