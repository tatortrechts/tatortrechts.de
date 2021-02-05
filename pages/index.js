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
              Fast <b className="is-size-1"> 16.000</b> rechte Gewalttaten
            </h1>
            <h1 className="title is-2">
              haben <b className="is-size-1">12</b> Organisationen
            </h1>
            <h1 className="title is-2">
              seit dem Jahr <b className="is-size-1">2000</b> registriert.
            </h1>
          </ContentMiddle>
        </section>

        <section className="hero">
          <ContentMiddle>
            <h2 className="title is-4">Rechte Gewalt vor deiner Haustür</h2>

            <p>
              LAUT der Antonio-Amadeu-Stiftung starben seit der Wende 213
              Menschen durch rechte Gewalt (Stand 15.01.2021). Rechte Gewalt
              passiert überall. Wenn du wissen willst wo, dann nutz unser
              Recherche-Tool.
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
          <ParallaxBanner
            className="your-class"
            layers={[
              {
                image: "/images/karte.png",
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
        </div>
        <section className="hero">
          <ContentMiddle>
            <h4 className="title is-4">Recherche-Tool</h4>
            <p>
              Mit Tatort Rechts ist es möglich, die öffentlich verfügbaren Daten
              zu rechter Gewalt von 12 Organisationen systematisch und gezielt
              zu durchsuchen. Das geht über reinzoomen in eine
            </p>
            <p>
              Karte oder über ein Suchfeld, das Ergebnisse für dich filtert.
              Seit dem Jahr 2000 haben die 12 Organisationen zusammen etwa
              16.000 Fälle von rechter Gewalt registriert.
            </p>
          </ContentMiddle>
        </section>
        <section className="hero">
          <ContentMiddle>
            <h4 className="title is-4">Mach mit!</h4>
            <p>
              Tatort Rechts ist ein Prototyp, das Recherche-Tool ein erster
              Schritt. Wie du siehst, fehlen uns noch Daten aus mehreren
              Bundesländern. Wenn du Kenntnis über öffentlich bekannte Vorfälle
              rechter Gewalt hast, dann kontaktier uns, damit wir weitere Daten
              ergänzen können. Wie genau, sagen wir dir hier (LINK einfügen zu
              Text auf Blog).
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
            <h4 className="title is-4">Waffen und Hakenkreuz</h4>
            <p>
              STELL dir vor du steigst Abends aus dem Bus aus und plötzlich
              greift dich ein Mann an. Er schlägt dich. Und dann eskaliert die
              Situation, der Mann zieht eine Waffe und zielt auf dich.
            </p>
            <p>Das ist kein Gedankenspiel.</p>
          </ContentMiddle>
        </section>
        <section className="hero">
          <ContentMiddle>
            <p>
              Es ist tatsächlich passiert, in Bremen-Vegesack. Der Mann mit der
              Waffe wurde später von der Polizei festgenommen, in seiner Wohnung
              wurde neben Drogen und weiteren Waffen ein Hakenkreuz aus Metall
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
              IN dem Fall aus Bremen-Vegesack ist niemand tödlich verletzt
              worden. Doch wie gefährlich rechtsradikale Ideologien oder
              rassistische Überzeugungen werden können, zeigen die jünsten
              Ereignisse: Die Anschläge in Hanau, Halle und der Mord am Kasseler
              Regierungspräsidenten Walter Lübcke. Und dies sind nur einige
              wenige Beispiele.
            </p>
          </ContentMiddle>
        </section>
        <section className="hero">
          <ContentMiddle>
            <h4 className="title is-4">19. Februar 2020 - Hanau</h4>
            <p>
              BEI dem Anschlag in Hanau starben neun Menschen mit
              Migrationshintergrund durch Schüsse des Täters Tobias R. Laut
              einem Gutachten für die Generalbundesanwaltschaft sollen bei
              Tobias R. Anzeichen für eine paranoide Schizophrenie und darauf
              aufgesetzt, eine “rechtsradikale Ideologie” erkennbar gewesen
              sein, so berichtet es der Spiegel. In der Tatnacht konnten
              offenbar Notrufe von der Polizei nicht entgegengenommen werden.
              Der Notruf der Polizei war unterbesetzt, wie Hessens Innenminister
              einräumte.
            </p>
          </ContentMiddle>
        </section>

        <section className="hero">
          <ContentMiddle>
            <h4 className="title is-4">9. Oktober 2019 - Halle</h4>
            <p>
              ZUM höchsten jüdischen Feiertag Jom Kippur versuchte ein
              27-Jähriger zu den Feierlichkeiten gewaltsam in eine Synagoge in
              Halle einzudringen. Als das nicht gelang erschoss er wahllos zwei
              Menschen, seine Tat streamte er live ins Internet. Für den
              rechtsterroristischen Anschlag wurde gegen den Attentäter die
              Höchststrafe verhängt.
            </p>
          </ContentMiddle>
        </section>
        <section className="hero">
          <ContentMiddle>
            <h4 className="title is-4">1. Juni 2019 - Istha</h4>
            <p>
              AUS nächster Nähe ist der Kasseler Regierungspräsident Walter
              Lübcke erschossen worden. Lübcke wurde leblos auf der Terrasse
              seines Wohnhauses gefunden. Die Tat gilt als erster
              rechtsextremistischer Mord an einem Politiker in der
              Bundesrepublik Deutschland. Im Jahr 2021 ist der Täter Stephan E.
              verurteilt worden, alle Beteiligten legten Revision ein.
            </p>
          </ContentMiddle>
        </section>
        {/* <ContentMiddle>
          <h4 className="title is-4">Recherche-Tool</h4>
          <p>
            Auf dieser Webseite “Tatort Rechts”, wollen wir über rechte
            Gewalttaten informieren. Wir haben dafür ein Recherche-Tool
            entwickelt, bei dem User*innen Daten zu rechten Gewalttaten gezielt
            durchsuchen können. Das hat es so bislang noch nicht gegeben. All
            diese Daten sind bislang auf einzelnen Seiten verstreut gewesen und
            dazu noch in einem Format, das eine systematische Suche unmöglich
            gemacht hat.
          </p>
        </ContentMiddle>
        <ContentMiddle>
          <h4 className="title is-4">Nach Zusammenhängen suchen</h4>
          <p>
            Unser Recherche-Tool bietet dir zwei Möglichkeiten der Suche. Das
            geht zum einen über eine Karte, auf der die Daten gemappt sind und
            du reinzoomen kannst. Und außerdem über ein Suchfeld, bei dem du
            anhand von Schlagworten oder Ortangaben die Ergebnisse filtern
            kannst. Wenn du es noch nicht entdeckt hast, hier geht es zu unserem
            Recherche-Tool.
          </p>
        </ContentMiddle>
        <ContentMiddle>
          <h4 className="title is-4">Mehr als tausend Taten</h4>
          <p>
            Rechte Gewalt ist real. Sie passiert in Deutschland, überall. Doch
            nur in acht Bundesländern wird sie durch Opferberatungsstellen
            erfasst. Der Verband dieser Beratungsstellen, der VBRG e. V., zählte
            im Jahr 2019 1.347 rechts, rassistisch und antisemitisch motivierte
            Angriffe.
          </p>
        </ContentMiddle> */}
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
