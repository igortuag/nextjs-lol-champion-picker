import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home({ listOfChampionsJson }) {
  const [selectedChampions, setSelectedChampions] = useState([]);

  const handleAddList = (id) => {
    if (selectedChampions.indexOf(id) === -1) {
      setSelectedChampions([...selectedChampions, id]);
    } else {
      setSelectedChampions(selectedChampions.filter((item) => item !== id));
    }
  };

  useEffect(() => {
    const savedSelectedChampions = localStorage.getItem("selectedChampions");
    if (savedSelectedChampions) {
      setSelectedChampions(JSON.parse(savedSelectedChampions));
    }
  }, []);

  useEffect(() => {
    // save on local storage
    localStorage.setItem(
      "selectedChampions",
      JSON.stringify(selectedChampions)
    );
  }, [selectedChampions]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          List and select champions of League of Legends
        </h1>
        <p className={styles.description}>
          Select and save the champions you already got bau, they didn{"'"}t
          save in your browser{"'"}s localstorage.
        </p>
        <div className={styles.grid}>
          {listOfChampionsJson.map((champion) => (
            <div
              key={champion.id}
              href="https://nextjs.org/docs"
              className={styles.card}
            >
              <h2>
                <label>
                  <span>
                    <input
                      type="checkbox"
                      onChange={() => handleAddList(champion.id)}
                      checked={selectedChampions.indexOf(champion.id) !== -1}
                    />
                  </span>
                  {champion.name}
                </label>
              </h2>
              <Image
                width={100}
                height={100}
                src={`http://ddragon.leagueoflegends.com/cdn/12.3.1/img/champion/${champion.image.full}`}
                alt={`Small image of ${champion.name}`}
              />
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <a href="https://www.linkedin.com/in/igortuag/">
            Made with ❤️ by Igor Tuag
          </a>
        </a>
      </footer>
    </div>
  );
}

export const getStaticProps = async () => {
  const listOfChampions = await fetch(
    "http://ddragon.leagueoflegends.com/cdn/12.3.1/data/en_US/champion.json"
  );

  const { data } = await listOfChampions.json();

  const listOfChampionsJson = Object.keys(data).map((key) => data[key]);

  return {
    props: {
      listOfChampionsJson,
    },
  };
};
