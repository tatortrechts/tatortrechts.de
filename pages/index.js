import Head from "next/head";
import {
  Parallax,
  ParallaxBanner,
  ParallaxProvider,
} from "react-scroll-parallax";
import ContentMiddle from "../components/ContentMiddle";
import Element from "../components/Element";
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
        <meta
          property="og:image"
          content="http://euro-travel-example.com/thumbnail.jpg"
          key="preview-image"
        />
        <meta property="og:description" content={description}></meta>
      </Head>
      <NavBar />
      <div className="tor-margin-top"></div>

      <ParallaxProvider>
        <section
          class="hero is-halfheight has-text-black"
          style={{ backgroundColor: "#fb6a4a" }}
        >
          <div className="columns">
            <div className="column is-6 has-text-centered">
              <div class="hero-body has-text-black">
                <div class="" style={{ margin: "auto" }}>
                  <p class="title">Fast 16.000 rechte Gewalttaten</p>
                  {/* <p class="subtitle">Fullheight subtitle</p> */}
                </div>
              </div>
              <div class="hero-body">
                <div class="" style={{ margin: "auto" }}>
                  <p class="title">haben 12 Organisationen</p>
                  {/* <p class="subtitle">Fullheight subtitle</p> */}
                </div>
              </div>
              <div class="hero-body">
                <div class="" style={{ margin: "auto" }}>
                  <p class="title">seit dem Jahr 2000 registriert.</p>
                  {/* <p class="subtitle">Fullheight subtitle</p> */}
                </div>
              </div>
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
            </div>
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
        </section>

        <ContentMiddle>
          Stell dir vor du steigst Abends aus dem Bus aus und plötzlich greift
          dich ein Mann an. Er schlägt dich. Und dann eskaliert die Situation,
          der Mann zieht eine Waffe und zielt auf dich. Das ist kein
          Gedankenspiel.
        </ContentMiddle>
        {/* <section class="hero is-medium is-link">
          <div class="hero-body">
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
        <ContentMiddle>
          In dem Fall aus Bremen-Vegesack ist niemand tödlich verletzt worden.
          Doch wie gefährlich rechtsradikale Ideologien und rassistische
          Überzeugungen sein können, zeigen eine Reihe von Beispielen in der
          jüngsten Vergangenheit.
        </ContentMiddle>
        <ContentMiddle>
          19. Februar 2020 - HANAU Bei dem Anschlag in Hanau starben neun
          Menschen mit Migrationshintergrund durch Schüsse des Täters Tobias R.
          Laut einem Gutachten für die Generalbundesanwaltschaft sollen bei
          Tobias R. Anzeichen für eine paranoide Schizophrenie und darauf
          aufgesetzt eine rechtsradikale Ideologie erkennbar gewesen sein, so
          berichtet es der Spiegel. In der Tatnacht war der Notruf der Polizei
          unterbesetzt, wie Hessens Innenminister einräumte.
        </ContentMiddle>
        <ContentMiddle>
          9. Oktober 2019 - HALLE Zum höchsten jüdischen Feiertag Jom Kippur
          versuchte ein 27-Jähriger zu den Feierlichkeiten gewaltsam in eine
          Synagoge in Halle einzudringen. Als das nicht gelang erschoss er
          wahllos zwei Menschen, seine Tat streamte er live ins Internet. Für
          den rechtsterroristischen Anschlag wurde gegen den Attentäter die
          Höchststrafe verhängt. Rechte Gewalt passiert auch in deiner Stadt.
        </ContentMiddle>
        <ParallaxBanner
          className="your-class"
          layers={[
            {
              image: "/images/karte.png",
              amount: 0.5,
            },
          ]}
          style={{
            height: "300px",
          }}
        >
          <h1>Banner Children</h1>
        </ParallaxBanner>

        <hr />
        <hr />
        <div className="vertical">
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
        </div>
        <ContentMiddle>
          Recherche-Tool Auf dieser Webseite “Tatort Rechts”, wollen wir über
          rechte Gewalttaten informieren. Wir haben dafür ein Recherche-Tool
          entwickelt, bei dem User*innen Daten zu rechten Gewalttaten gezielt
          durchsuchen können. Das hat es so bislang noch nicht gegeben. All
          diese Daten sind bislang auf einzelnen Seiten verstreut gewesen und
          dazu noch in einem Format, das eine systematische Suche unmöglich
          gemacht hat. Nach Zusammenhängen suchen Unser Recherche-Tool bietet
          dir zwei Möglichkeiten der Suche. Das geht zum einen über eine Karte,
          auf der die Daten gemappt sind und du reinzoomen kannst. Und außerdem
          über ein Suchfeld, bei dem du anhand von Schlagworten oder Ortangaben
          die Ergebnisse filtern kannst. Wenn du es noch nicht entdeckt hast,
          hier geht es zu unserem Recherche-Tool. Mehr als tausend Taten Rechte
          Gewalt ist real. Sie passiert in Deutschland, überall. Doch nur in
          acht Bundesländern wird sie durch Opferberatungsstellen erfasst. Der
          Verband dieser Beratungsstellen, der VBRG e. V., zählte im Jahr 2019
          1.347 rechts, rassistisch und antisemitisch motivierte Angriffe.
        </ContentMiddle>
      </ParallaxProvider>

      <ContentMiddle>
        <div>
          <small>
            Das Vorhaben wurde mit Mitteln des Bundesministeriums für Bildung
            und Forschung unter dem Förderkennzeichen 01IS20S43 gefördert. Die
            Verantwortung für den Inhalt dieser Veröffentlichung liegt beim
            Autor.
          </small>
        </div>
        <div className="columns is-centered level mt-5">
          <div className="column is-4">
            <img src="/logo-bmbf.svg" />
          </div>
          <div className="column is-3">
            <img src="/logo-ptf.svg" />
          </div>
        </div>
      </ContentMiddle>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const content = await fetchContent("home");
  return { props: { content } };
}

export default Home;
