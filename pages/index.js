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
        <section
          className="hero tor-gradient"
          style={{
            marginBottom: "2rem",
          }}
        >
          <ContentMiddle>
            <h1 className="title is-3" style={{ lineHeight: 1.6 }}>
              <b className="is-size-2">13</b> Projekte haben seit dem Jahr{" "}
              <b className="is-size-2">2000</b> über{" "}
              <b className="is-size-2"> 16.000</b> Fälle mit rechtem Bezug
              registriert.
              <br />
              Wir zeigen die Fälle auf einer <a href="/karte">Karte</a>.
            </h1>
            <h1 className="title is-3" style={{ lineHeight: 1.6 }}></h1>
            <div className="columns">
              {/* <div className="column">
                <h1 className="title is-2" style={{ lineHeight: 1.6 }}>
                  <b className="is-size-1">13</b> Projekte haben seit
                  <br /> dem Jahr <b className="is-size-1">2000</b>
                  <br /> über <b className="is-size-1"> 16.000</b> Fälle mit
                  <br /> <b className="is-size-1">rechtem</b> Bezug registriert.
                </h1>
              </div> */}

              {/* <div
                className="column is-3"
                style={{
                  filter: "blur(8px)",
                  backgroundImage:
                    "url(/images/Tatort_Rechts_Logo_Verbindungen.svg);",
                }}
              ></div> */}
            </div>
            <div></div>
          </ContentMiddle>
        </section>

        <section className="hero">
          <ContentMiddle>
            <h2 className="title is-3">Rechte Gewalt vor deiner Haustür</h2>

            <p>
              Hinter <a href="/ueber">Tatort Rechts</a> stehen{" "}
              <a href="/blog/team">Johannes Filter und Anna Neifer</a>. Seit
              Sommer 2020 arbeiten wir an diesem Projekt, haben vieles verworfen
              und am Ende liest du jetzt diese Zeilen. Mit Tatort Rechts wollen
              wir einen Schwerpunkt setzen zu rechter, rassistischer und
              antisemitischer Gewalt. Wir wollen offen legen: diese Gewalt
              passiert überall. Wenn du wissen willst wo, dann nutze unser{" "}
              <a href="/karte">Recherche-Tool</a>.
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
              style={{ height: "30rem" }}
              className="tor-landing-map"
              layers={[
                {
                  image: "/images/karte.jpg",
                  speed: -20,
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
              von <a href="/blog/quellen">13 Projekt-Seiten</a> systematisch zu
              durchsuchen. Das hat es so bisher noch nicht gegeben. Du kannst
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
              Seit dem Jahr 2000 sind auf den 13 Projekt-Seiten zusammen etwa
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
          style={{ height: "30rem" }}
          layers={[
            {
              image: "/images/Tatort_Rechts_Symbolfoto_Zusammenhaenge.jpg",
              speed: -5,
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
              <a href="/fall/13135">Es ist tatsächlich passiert</a>, in
              Bremen-Vegesack. Der Mann mit der Waffe wurde später von der
              Polizei festgenommen, in seiner Wohnung wurde neben Drogen und
              weiteren Waffen{" "}
              <a href="https://www.weser-kurier.de/region/die-norddeutsche_artikel,-intensivtaeter-bedroht-36jaehrigen-_arid,1952655.html">
                ein Hakenkreuz aus Metall
              </a>{" "}
              gefunden.
            </p>
          </ContentMiddle>
        </section>
        <ParallaxBanner
          style={{ height: "30rem" }}
          layers={[
            {
              image: "/images/Tatort_Rechts_Symbolfoto_Waffengewalt.jpg",
              speed: -5,
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
          style={{ height: "30rem" }}
          layers={[
            {
              image: "/images/Tatort_Rechts_Symbolfoto_Kerzen.jpg",
              speed: -5,
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
              <a href="https://www.spiegel.de/panorama/justiz/hanau-anschlag-neues-gutachten-zum-taeter-psychisch-krank-und-ein-rassist-a-00000000-0002-0001-0000-000174211404">
                der Spiegel
              </a>
              . In der Tatnacht konnten offenbar Notrufe von der Polizei nicht
              entgegengenommen werden. Der{" "}
              <a href="https://www.hessenschau.de/panorama/beuth-raeumt-notruf-panne-in-hanauer-tatnacht-ein,beuth-notrufpanne-hanau-100.html">
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
              <a href="https://www.tagesschau.de/inland/rechtsextremismus/halle-attentat-urteil-101.html">
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
              <a href="https://www.stern.de/politik/deutschland/moerder-von-walter-luebcke-zu-lebenslanger-haft-verurteilt-30353688.html">
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
              speed: -5,
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
              speed: -5,
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
              Dies ist nur eine kurze Erinnerung an die jüngsten Fälle. Es
              reihen sich viele weitere ein, wie etwa die Mordserie der
              NSU-Terrorzelle. Die Liste der Fälle ist jedoch weit
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
            <h4 className="title is-3">Sichtbarkeit</h4>
            <p>
              Wir wollen mit <a href="/blog">Tatort Rechts</a> es User*innen
              ermöglichen, sich selbst einen Eindruck von den Fällen zu
              verschaffen. Durch das Recherche-Tool können Fälle mit rechtem
              Bezug sichtbar gemacht und verortet werden. Wie du auf der Karte
              sehen kannst, fehlen noch <a href="/blog/daten">Daten</a> aus
              mehreren Bundesländern.{" "}
              <a href="https://tatortrechts.de/blog/mach-mit">Mach mit</a>.
              Schick uns einen Hinweis zu öffentlich bekannten Vorfällen
              rechter, rassistischer oder antisemitischer Gewalt.
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
