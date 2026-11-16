import Image from "next/image";
import Link from "next/link";

const API = "https://rickandmortyapi.com/api/character";

async function getCharacters(page) {
  const res = await fetch(`${API}?page=${page}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Não foi possível carregar os personagens.");
  }
  return res.json();
}

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params?.page ?? "1", 10) || 1);

  let data;
  try {
    data = await getCharacters(page);
  } catch (err) {
    return (
      <main className="container">
        <h1>Catálogo Rick and Morty</h1>
        <p className="error">{err.message} Tente novamente mais tarde.</p>
      </main>
    );
  }

  const { info, results } = data;

  return (
    <main className="container">
      <header className="header">
        <h1>Catálogo Rick and Morty</h1>
        <p>
          {info.count} personagens · página {page} de {info.pages}
        </p>
      </header>

      <section className="grid">
        {results.map((c) => (
          <Link key={c.id} href={`/character/${c.id}`} className="card">
            <Image
              src={c.image}
              alt={c.name}
              width={300}
              height={300}
              className="card-img"
            />
            <div className="card-body">
              <h2>{c.name}</h2>
              <p>
                <span className={`status ${c.status.toLowerCase()}`} />
                {c.status} · {c.species}
              </p>
            </div>
          </Link>
        ))}
      </section>

      <nav className="pagination">
        {info.prev ? (
          <Link href={`/?page=${page - 1}`} className="btn">
            ← Anterior
          </Link>
        ) : (
          <span className="btn disabled">← Anterior</span>
        )}
        {info.next ? (
          <Link href={`/?page=${page + 1}`} className="btn">
            Próxima →
          </Link>
        ) : (
          <span className="btn disabled">Próxima →</span>
        )}
      </nav>
    </main>
  );
}
