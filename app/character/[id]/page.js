import Image from "next/image";
import Link from "next/link";

const API = "https://rickandmortyapi.com/api/character";

async function getCharacter(id) {
  const res = await fetch(`${API}/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Falha ao buscar o personagem.");
  return res.json();
}

export default async function CharacterPage({ params }) {
  const { id } = await params;

  let c;
  try {
    c = await getCharacter(id);
  } catch (err) {
    return (
      <main className="container">
        <Link href="/" className="btn">
          ← Voltar ao catálogo
        </Link>
        <p className="error">{err.message}</p>
      </main>
    );
  }

  if (!c) {
    return (
      <main className="container">
        <Link href="/" className="btn">
          ← Voltar ao catálogo
        </Link>
        <p className="error">Personagem não encontrado.</p>
      </main>
    );
  }

  const info = [
    ["Status", c.status],
    ["Espécie", c.species],
    ["Tipo", c.type || "—"],
    ["Gênero", c.gender],
    ["Origem", c.origin?.name],
    ["Última localização", c.location?.name],
    ["Episódios", c.episode.length],
    ["Criado em", new Date(c.created).toLocaleDateString("pt-BR")],
  ];

  return (
    <main className="container">
      <Link href="/" className="btn">
        ← Voltar ao catálogo
      </Link>

      <article className="detail">
        <Image
          src={c.image}
          alt={c.name}
          width={300}
          height={300}
          className="detail-img"
        />
        <div>
          <h1>{c.name}</h1>
          <dl className="info">
            {info.map(([label, value]) => (
              <div key={label} className="info-row">
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </article>
    </main>
  );
}
