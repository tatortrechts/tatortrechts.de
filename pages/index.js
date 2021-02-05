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
        {/* <section
          className="hero is-halfheight has-text-black"
          style={{ backgroundColor: "#fb6a4a" }}
        >
          <div className="columns">
            <div className="column is-6 has-text-centered">
              <div className="hero-body has-text-black">
                <div className="" style={{ margin: "auto" }}>
                  <p className="title">Fast 16.000 rechte Gewalttaten</p>
                  <p className="subtitle">Fullheight subtitle</p>
                </div>
              </div>
              <div className="hero-body">
                <div className="" style={{ margin: "auto" }}>
                  <p className="title">haben 12 Organisationen</p>
                  <p className="subtitle">Fullheight subtitle</p>
                </div>
              </div>
              <div className="hero-body">
                <div className="" style={{ margin: "auto" }}>
                  <p className="title">seit dem Jahr 2000 registriert.</p>
                  <p className="subtitle">Fullheight subtitle</p>
                </div>
              </div> */}
        {/* <p>
                {" "}
                et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor
                in hendrerit in vulputate velit esse molestie consequat, vel
                illum dolore eu feugiat nulla facilisis
              </p> */}
        {/* </div>
            <div className="column is-6">
              <Parallax
                className="custom-class"
                y={[20, -20]}
                tagOuter="figure"
              >
                <img
                  src="/images/Tatort Rechts_Symbolfoto_Waffengewalt.jpg"
                  style={{ width: "40rem" }}
                />
              </Parallax>
            </div>
          </div>
        </section> */}
        {/* <ContentMiddle>
          Stell dir vor du steigst Abends aus dem Bus aus und plötzlich greift
          dich ein Mann an. Er schlägt dich. Und dann eskaliert die Situation,
          der Mann zieht eine Waffe und zielt auf dich. Das ist kein
          Gedankenspiel.
        </ContentMiddle> */}
        {/* <section className="hero is-medium is-link">
          <div className="hero-body">
            <p style={{ maxWidth: "30rem", margin: "auto" }}>
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              <a href="/">consequat</a>. Duis autem vel eum iriure dolor in
              hendrerit in vulputate velit esse molestie consequat, vel illum
              dolore eu feugiat nulla facilisis at vero eros et accumsan et
              iusto odio dignissim qui blandit praesent luptatum zzril delenit
              augue duis dolore te feugait nulla facilisi. Nam liber tempor cum
              soluta nobis eleifend option congue nihil imperdiet doming id quod
              mazim placerat facer possim assum. Lorem ipsum dolor sit amet,
              consectetuer adipiscing elit, sed diam nonummy nibh euismod
              tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
              enim ad minim veniam, quis nostrud exerci tation ullamcorper
              suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis
              autem vel eum iriure dolor in hendrerit in vulputate velit esse
              molestie consequat, vel illum dolore eu feugiat nulla facilisis.
              At vero eos et accusam et justo duo dolores et ea rebum. Stet
              clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
              magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
              justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
              takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor
              sit amet, consetetur sadipscing elitr, At accusam aliquyam diam
              diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et
              et invidunt justo labore Stet clita ea et gubergren, kasd magna no
              rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum
              dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            </p>
          </div>
        </section> */}
        {/* <hr /> */}
        {/* <hr /> */}
        {/* <div className="vertical">
          <div className="elements linear">
            {elements.map((_, i) => {
              const n = i - amount;
              return (
                <Parallax
                  key={n}
                  className="smallLinear"
                  x={[`${offA * n}${unit}`, `${offB * n}${unit}`]}
                >
                  <Element name={n * -1} />
                </Parallax>
              );
            })}
          </div>
        </div> */}
        <section className="hero is-primary" style={{ marginBottom: "2rem" }}>
          <ContentMiddle>
            {/* <h4 className="title is-4">Rechte Gewalt vor deiner Haustür</h4> */}
            <h1 className="title is-2">
              <b className="is-size-1">12</b> Projekte haben seit
            </h1>
            <h1 className="title is-2">
              dem Jahr <b className="is-size-1">2000</b> fast
            </h1>
            <h1 className="title is-2">
              <b className="is-size-1"> 16.000</b> Fälle mit
            </h1>
            <h1 className="title is-2">
              <b className="is-size-1">rechtem </b> Bezug registriert.
            </h1>
          </ContentMiddle>
        </section>

        <section className="hero">
          <ContentMiddle>
            <h2 className="title is-4">Rechte Gewalt vor deiner Haustür</h2>

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
            backgroundColor: "lightgrey",
          }}
        >
          <a href="/karte">
            <ParallaxBanner
              className="your-class"
              layers={[
                {
                  image: "/images/karte.jpg",
                  amount: 0.2,
                },
              ]}
              style={{
                // margin: "auto",
                width: "100%",
                // width: "50rem",
                height: "60rem",
              }}
            ></ParallaxBanner>
          </a>
        </div>
        <section className="hero">
          <ContentMiddle>
            <h4 className="title is-4">Recherche-Tool</h4>
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
            <h4 className="title is-4">Gezielte Suchen</h4>
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
            <h4 className="title is-4">Zusammenhänge sehen</h4>
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
              image: "/images/Tatort_Rechts_Symbolfoto_Zusammenhänge.jpg",
              amount: 0.5,
            },
          ]}
          style={{
            height: "500px",
          }}
        ></ParallaxBanner>

        <section className="hero">
          <ContentMiddle>
            <h4 className="title is-4">Waffen und Hakenkreuz</h4>
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
          style={{
            height: "500px",
          }}
        ></ParallaxBanner>

        <section className="hero">
          <ContentMiddle>
            <h4 className="title is-4">Gefahr von Rechtsradikalismus</h4>
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
          style={{
            height: "500px",
          }}
        ></ParallaxBanner>

        <section className="hero">
          <ContentMiddle>
            <h4 className="title is-4">19. Februar 2020 - Hanau</h4>
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
            <h4 className="title is-4">9. Oktober 2019 - Halle</h4>
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
            <h4 className="title is-4">1. Juni 2019 - Istha</h4>
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
          className="your-class"
          layers={[
            {
              image: "/tor_logo.svg",
              amount: 0.5,
            },
          ]}
          style={{
            width: "100%",
            // height: "30rem",
          }}
        ></ParallaxBanner>
        <section className="hero">
          <ContentMiddle>
            <h4 className="title is-4">Vielzahl an Fällen</h4>
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
        <section className="hero">
          <ContentMiddle>
            <h4 className="title is-4">Du kannst etwas tun</h4>
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
