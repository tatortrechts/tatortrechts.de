import Head from "next/head";
import { ParallaxBanner, ParallaxProvider } from "react-scroll-parallax";
import ContentMiddle from "../components/ContentMiddle";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { fetchContent } from "../utils/networking";

function Home({ content }) {
  const { seo_title: title, search_description: description } = content.meta;

  const amount = 5;
  const offA = -50;
  const offB = 50;
  const unit = "%";
  const elements = new Array(amount * 2 + 1).fill(null).map((x, i) => i);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title}></meta>
        <meta name="description" content={description} />
        <meta property="og:description" content={description}></meta>
      </Head>
      <NavBar />
      <div className="tor-margin-top"></div>

      <ParallaxProvider>
        <section className="hero is-primary" style={{ marginBottom: "2rem" }}>
          <ContentMiddle>
            <div className="columns">
              <div className="column">
                <h1 className="title is-2">
                  <b className="is-size-1">12</b> Projekte haben seit dem Jahr{" "}
                  <b className="is-size-1">2000</b> über{" "}
                  <b className="is-size-1"> 16.000</b> rechte Taten registriert.
                </h1>
                <h1 className="title is-2">
                  Wir zeigen die Taten auf einer <a href="/karte">Karte</a>.
                </h1>
              </div>
              <div className="column is-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="currentColor"
                  class="bi bi-clipboard-data"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z" />
                  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                  <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                </svg>
              </div>
            </div>
          </ContentMiddle>
        </section>

        <section className="hero">
          <ContentMiddle>
            <h2 className="title is-3">Rechte Gewalt vor deiner Haustür</h2>

            <p>
              Hinter <a href="/ueber">Tatort Rechts</a> stehen{" "}
              <a href="blog/team">Johannes Filter und Anna Neifer</a>. Seit
              Sommer 2020 arbeiten wir an diesem Projekt, haben vieles verworfen
              und am Ende liest du jetzt diese Zeilen. Mit{" "}
              <a href="/blog">Tatort Rechts</a> wollen wir einen Schwerpunkt
              setzen zu rechter, rassistischer und antismetischer Gewalt. Wir
              wollen offen legen: diese Gewalt passiert überall. Wenn du wissen
              willst wo, dann nutze unser <a href="/karte">Recherche-Tool</a>.
            </p>
          </ContentMiddle>
        </section>

        <div
          style={{
            margin: "auto",
            width: "100%",
            borderTop: "0.5rem solid black",
            borderBottom: "0.5rem solid black",
          }}
        >
          <a href="/karte">
            <ParallaxBanner
              className="tor-landing-map"
              layers={[
                {
                  image: "/images/karte.jpg",
                  amount: -1,
                },
              ]}
            ></ParallaxBanner>
          </a>
        </div>
        <section className="hero">
          <ContentMiddle>
            <h4 className="title is-3">Recherche-Tool</h4>
            <p>
              Zum ersten Mal ist es möglich, die öffentlich verfügbaren Daten
              von <a href="/blog/chroniken">12 Projekt-Seiten</a> systematisch
              zu durchsuchen. Das hat es so bisher noch nicht gegeben. Du kannst
              zum einen nach Fällen auf der <a href="/karte">Karte</a> suchen
              und dich in dein Bundesland bis zu deiner Stadt reinzoomen. Du
              kannst auch nach Schlagworten suchen, nach bestimmten Namen oder
              Taten. Mit erweiterten Suchfiltern kannst du deine Suche weiter
              eingrenzen.
            </p>
          </ContentMiddle>
        </section>
        <section className="hero">
          <ContentMiddle>
            <h4 className="title is-3">Gezielte Suchen</h4>
            <p>
              Seit dem Jahr 2000 sind auf den 12 Projekt-Seiten zusammen etwa
              16.000 Fälle registriert worden, die einen rechten, rassistischen
              oder antisemitischen Bezug haben. Die Erfassung{" "}
              <a href="/blog/daten">Daten sind sehr heterogen</a>, aber uns geht
              es nicht um Vergleichbarkeit oder eine statistische Analyse der
              Daten. Mit Tatort Rechts wollen wir es User*innen möglich machen,
              gezielt die erfassten Vorfälle durchsuchen zu können.
            </p>
          </ContentMiddle>
        </section>
        <section className="hero">
          <ContentMiddle>
            <h4 className="title is-3">Zusammenhänge sehen</h4>
            <p>
              Wir hoffen, dass es nun durch die visuell ansprechend und
              filterbar aufbereiteten Daten viel leichter sein wird,
              Zusammenhänge in den Daten zu erkennen. In den Daten sind
              Kundgebungen von Pegida oder Veranstaltungen der AfD.
              Brandanschläge auf Autos von Menschen, die einen
              Migrationshintergrund haben oder sich für Flüchtlinge einsetzen.
              Aber auch Todesdrohungen und körperliche Angriffe mit Messern und
              Waffen.
            </p>
          </ContentMiddle>
        </section>

        <ParallaxBanner
          className="your-class"
          layers={[
            {
              image: "/images/Tatort_Rechts_Symbolfoto_Zusammenhaenge.jpg",
              amount: 0.5,
            },
          ]}
        ></ParallaxBanner>

        <section className="hero">
          <ContentMiddle>
            <h4 className="title is-3">Waffen und Hakenkreuz</h4>
            <p>
              Hier ein Beispiel. Stell dir vor du steigst Abends aus dem Bus aus
              und plötzlich greift dich ein Mann an. Er schlägt dich. Und dann
              eskaliert die Situation, der Mann zieht eine Waffe und zielt auf
              dich.
            </p>{" "}
            <br />
            <p>Das ist kein Gedankenspiel.</p> <br />
            <p>
              <a href="/tat/a2xlaW5lcmFuZG5vdGl6LTI0Mg==">
                Es ist tatsächlich passiert
              </a>
              , in Bremen-Vegesack. Der Mann mit der Waffe wurde später von der
              Polizei festgenommen, in seiner Wohnung wurde neben Drogen und
              weiteren Waffen{" "}
              <a href="/https://www.weser-kurier.de/region/die-norddeutsche_artikel,-intensivtaeter-bedroht-36jaehrigen-_arid,1952655.html">
                ein Hakenkreuz aus Metall
              </a>{" "}
              gefunden.
            </p>
          </ContentMiddle>
        </section>
        <ParallaxBanner
          className="your-class"
          layers={[
            {
              image: "/images/Tatort_Rechts_Symbolfoto_Waffengewalt.jpg",
              amount: 0.5,
            },
          ]}
        ></ParallaxBanner>

        <section className="hero">
          <ContentMiddle>
            <h4 className="title is-3">Gefahr von Rechtsradikalismus</h4>
            <p>
              In dem Fall aus Bremen-Vegesack ist niemand tödlich verletzt
              worden. Doch wie gefährlich rechtsradikale Ideologien oder
              rassistische Überzeugungen werden können, zeigen die jünsten
              Ereignisse: Die Anschläge in Hanau, Halle und der Mord am Kasseler
              Regierungspräsidenten Walter Lübcke. Und dies sind nur einige
              wenige Beispiele.
            </p>
          </ContentMiddle>
        </section>

        <ParallaxBanner
          className="your-class"
          layers={[
            {
              image: "/images/Tatort_Rechts_Symbolfoto_Kerzen.jpg",
              amount: 0.5,
            },
          ]}
        ></ParallaxBanner>

        <section className="hero">
          <ContentMiddle>
            <h4 className="title is-3">19. Februar 2020 - Hanau</h4>
            <p>
              Bei dem Anschlag in Hanau starben neun Menschen mit
              Migrationshintergrund durch Schüsse des Täters Tobias R. Laut
              einem Gutachten für die Generalbundesanwaltschaft sollen bei
              Tobias R. Anzeichen für eine paranoide Schizophrenie und darauf
              aufgesetzt, eine “rechtsradikale Ideologie” erkennbar gewesen
              sein, so berichtet es{" "}
              <a href="/https://www.spiegel.de/panorama/justiz/hanau-anschlag-neues-gutachten-zum-taeter-psychisch-krank-und-ein-rassist-a-00000000-0002-0001-0000-000174211404">
                der Spiegel
              </a>
              . In der Tatnacht konnten offenbar Notrufe von der Polizei nicht
              entgegengenommen werden. Der{" "}
              <a href="/https://www.hessenschau.de/panorama/beuth-raeumt-notruf-panne-in-hanauer-tatnacht-ein,beuth-notrufpanne-hanau-100.html">
                Notruf der Polizei
              </a>{" "}
              war unterbesetzt, wie Hessens Innenminister einräumte.
            </p>
          </ContentMiddle>
        </section>

        <section className="hero">
          <ContentMiddle>
            <h4 className="title is-3">9. Oktober 2019 - Halle</h4>
            <p>
              Zum höchsten jüdischen Feiertag Jom Kippur versuchte ein
              27-Jähriger zu den Feierlichkeiten gewaltsam in eine Synagoge in
              Halle einzudringen. Als das nicht gelang{" "}
              <a href="https://www.mdr.de/sachsen-anhalt/halle/halle/urteil-halle-anschlag-lebenslange-haft-fuer-attentaeter-nach-schuessen-auf-synagoge-100.html">
                erschoss er wahllos zwei Menschen
              </a>
              , seine Tat streamte er live ins Internet. Für den
              rechtsterroristischen Anschlag wurde gegen den{" "}
              <a href="/https://www.tagesschau.de/inland/rechtsextremismus/halle-attentat-urteil-101.html">
                Attentäter die Höchststrafe
              </a>{" "}
              verhängt.
            </p>
          </ContentMiddle>
        </section>
        <section className="hero">
          <ContentMiddle>
            <h4 className="title is-3">1. Juni 2019 - Istha</h4>
            <p>
              Aus nächster Nähe ist der Kasseler Regierungspräsident Walter
              Lübcke erschossen worden. Lübcke wurde leblos auf der Terrasse
              seines Wohnhauses gefunden. Die Tat gilt als{" "}
              <a href="/https://www.stern.de/politik/deutschland/moerder-von-walter-luebcke-zu-lebenslanger-haft-verurteilt-30353688.html">
                erster rechtsextremistischer Mord
              </a>{" "}
              an einem Politiker in der Bundesrepublik Deutschland. Im Jahr 2021
              ist der Täter Stephan E. verurteilt worden, alle Beteiligten
              legten{" "}
              <a href="https://www.zeit.de/gesellschaft/zeitgeschehen/2021-02/mordfall-walter-luebcke-urteil-prozess-revision-familie-freispruch-nebenklaeger">
                Revision
              </a>{" "}
              ein.
            </p>
          </ContentMiddle>
        </section>
        <ParallaxBanner
          className="is-hidden-mobile"
          layers={[
            {
              image: "/tor_logo.svg",
              amount: 0.5,
            },
          ]}
          style={{
            width: "100%",
          }}
        ></ParallaxBanner>
        <ParallaxBanner
          className="is-hidden-tablet"
          layers={[
            {
              children: (
                <img
                  src="/tor_logo.svg"
                  style={{ width: "100%", height: "80%" }}
                />
              ),
              amount: 0.5,
              props: { style: { width: "100%" } },
            },
          ]}
          style={{
            width: "100%",
          }}
        ></ParallaxBanner>
        <section className="hero">
          <ContentMiddle>
            <h4 className="title is-3">Vielzahl an Fällen</h4>
            <p>
              Vielzahl an Fällen Dies ist nur eine kurze Erinnerung an die
              jüngsten Fälle. Es reihen sich viele weitere ein, wie etwa die
              Mordserie der NSU-Terrorzelle. Die Liste der Fälle ist jedoch viel
              umfangreicher. Laut der{" "}
              <a href="https://www.amadeu-antonio-stiftung.de/rassismus/todesopfer-rechter-gewalt/">
                Amadeu Antonio Stiftung
              </a>{" "}
              starben seit der Wende 213 Menschen durch rechte Gewalt (Stand
              15.01.2021).
            </p>
          </ContentMiddle>
        </section>
        <section className="hero is-primary">
          <ContentMiddle>
            <h4 className="title is-3">Du kannst etwas tun</h4>
            <p>
              Wir wollen mit <a href="/blog">Tatort Rechts</a> einen Schwerpunkt
              setzen auf rechte Gewalt und diese sichtbar machen. Dieses Projekt
              ist ein Prototyp, das Recherche-Tool ein erster Schritt. Wie du
              auf der Karte sehen kannst, fehlen uns noch{" "}
              <a href="/blog/daten">Daten</a> aus mehreren Bundesländern. Wenn
              du Kenntnis über öffentlich bekannte Vorfälle rechter,
              rassistischer oder antisemitischer Gewalt hast, dann{" "}
              <a href="/blog/mach-mit">mach mit</a> und ergänze weitere Daten.
            </p>
          </ContentMiddle>
        </section>
      </ParallaxProvider>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const content = await fetchContent("home");
  return { props: { content } };
}

export default Home;
