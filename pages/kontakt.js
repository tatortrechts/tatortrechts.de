import Head from "next/head";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { fetchContent } from "../utils/networking";

function Kontakt({ content }) {
  const { seo_title: title, search_description: description } = content.meta;

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
      <div dangerouslySetInnerHTML={{ __html: content.body }} />
      <h2 class="title is-2">Datenschutz</h2>
      <p>
        Wir informieren Sie nachfolgend gemäß den gesetzlichen Vorgaben des
        Datenschutzrechts (insb. gemäß BDSG n.F. und der europäischen
        Datenschutz-Grundverordnung ‚DS-GVO‘) über die Art, den Umfang und Zweck
        der Verarbeitung personenbezogener Daten durch unser Unternehmen. Diese
        Datenschutzerklärung gilt auch für unsere Websites und
        Sozial-Media-Profile. Bezüglich der Definition von Begriffen wie etwa
        „personenbezogene Daten“ oder „Verarbeitung“ verweisen wir auf Art. 4
        DS-GVO.
      </p>
      <strong>Name und Kontaktdaten des / der Verantwortlichen</strong>
      <br />
      Unser/e Verantwortliche/r (nachfolgend „Verantwortlicher“) i.S.d. Art. 4
      Zif. 7 DS-GVO ist:
      <br />
      <br /> Johannes Filter c/o Onion Space (Aufgang 4) ExRotaprint
      <br />
      Gottschedstraße 4<br />
      13357 Berlin
      <br />
      E-Mail-Adresse: kontakt@tatortrechts.de
      <br />
      <br />
      <strong>
        Datenarten, Zwecke der Verarbeitung und Kategorien betroffener Personen
      </strong>
      <br />
      <p>
        Nachfolgend informieren wir Sie über Art, Umfang und Zweck der Erhebung,
        Verarbeitung und Nutzung personenbezogener Daten.
      </p>
      <strong>1. Arten der Daten, die wir verarbeiten</strong>
      <br />
      Bestandsdaten (Name, Adresse etc.), <br />
      <br />
      <strong>2. Zwecke der Verarbeitung nach Art. 13 Abs. 1 c) DS-GVO</strong>
      <br />
      Nutzererfahrung verbessern, Kontaktanfragen abwickeln, <br />
      <br />
      <strong>
        3. Kategorien der betroffenen Personen nach Art. 13 Abs. 1 e) DS-GVO
      </strong>
      <br />
      Besucher/Nutzer der Website, <br />
      <br />
      <p>
        Die betroffenen Personen werden zusammenfassend als „Nutzer“ bezeichnet.
      </p>
      <br />
      <strong>Rechtsgrundlagen der Verarbeitung personenbezogener Daten</strong>
      <p>
        Nachfolgend Informieren wir Sie über die Rechtsgrundlagen der
        Verarbeitung personenbezogener Daten:
      </p>
      <ol style="margin:10px 0px; padding:15px;">
        <li>
          Wenn wir Ihre Einwilligung für die Verarbeitung personenbezogenen
          Daten eingeholt haben, ist Art. 6 Abs. 1 S. 1 lit. a) DS-GVO
          Rechtsgrundlage.
        </li>
        <li>
          Ist die Verarbeitung zur Erfüllung eines Vertrags oder zur
          Durchführung vorvertraglicher Maßnahmen erforderlich, die auf Ihre
          Anfrage hin erfolgen, so ist Art. 6 Abs. 1 S. 1 lit. b) DS-GVO
          Rechtsgrundlage.
        </li>
        <li>
          Ist die Verarbeitung zur Erfüllung einer rechtlichen Verpflichtung
          erforderlich, der wir unterliegen (z.B. gesetzliche
          Aufbewahrungspflichten), so ist Art. 6 Abs. 1 S. 1 lit. c) DS-GVO
          Rechtsgrundlage.
        </li>
        <li>
          Ist die Verarbeitung erforderlich, um lebenswichtige Interessen der
          betroffenen Person oder einer anderen natürlichen Person zu schützen,
          so ist Art. 6 Abs. 1 S. 1 lit. d) DS-GVO Rechtsgrundlage.
        </li>
        <li>
          Ist die Verarbeitung zur Wahrung unserer oder der berechtigten
          Interessen eines Dritten erforderlich und überwiegen diesbezüglich
          Ihre Interessen oder Grundrechte und Grundfreiheiten nicht, so ist
          Art. 6 Abs. 1 S. 1 lit. f) DS-GVO Rechtsgrundlage.
        </li>
      </ol>
      <br />
      <strong>
        Weitergabe personenbezogener Daten an Dritte und Auftragsverarbeiter
      </strong>
      <p>
        Ohne Ihre Einwilligung geben wir grundsätzlich keine Daten an Dritte
        weiter. Sollte dies doch der Fall sein, dann erfolgt die Weitergabe auf
        der Grundlage der zuvor genannten Rechtsgrundlagen z.B. bei der
        Weitergabe von Daten an Online-Paymentanbieter zur Vertragserfüllung
        oder aufgrund gerichtlicher Anordnung oder wegen einer gesetzlichen
        Verpflichtung zur Herausgabe der Daten zum Zwecke der Strafverfolgung,
        zur Gefahrenabwehr oder zur Durchsetzung der Rechte am geistigen
        Eigentum.
        <br />
        Wir setzen zudem Auftragsverarbeiter (externe Dienstleister z.B. zum
        Webhosting unserer Websites und Datenbanken) zur Verarbeitung Ihrer
        Daten ein. Wenn im Rahmen einer Vereinbarung zur Auftragsverarbeitung an
        die Auftragsverarbeiter Daten weitergegeben werden, erfolgt dies immer
        nach Art. 28 DS-GVO. Wir wählen dabei unsere Auftragsverarbeiter
        sorgfältig aus, kontrollieren diese regelmäßig und haben uns ein
        Weisungsrecht hinsichtlich der Daten einräumen lassen. Zudem müssen die
        Auftragsverarbeiter geeignete technische und organisatorische Maßnahmen
        getroffen haben und die Datenschutzvorschriften gem. BDSG n.F. und
        DS-GVO einhalten
      </p>
      <br />
      <strong>Datenübermittlung in Drittstaaten</strong>
      <p>
        Durch die Verabschiedung der europäischen Datenschutz-Grundverordnung
        (DS-GVO) wurde eine einheitliche Grundlage für den Datenschutz in Europa
        geschaffen. Ihre Daten werden daher vorwiegend durch Unternehmen
        verarbeitet, für die DS-GVO Anwendung findet. Sollte doch die
        Verarbeitung durch Dienste Dritter außerhalb der Europäischen Union oder
        des Europäischen Wirtschaftsraums stattfinden, so müssen diese die
        besonderen Voraussetzungen der Art. 44 ff. DS-GVO erfüllen. Das
        bedeutet, die Verarbeitung erfolgt aufgrund besonderer Garantien, wie
        etwa die von der EU-Kommission offiziell anerkannte Feststellung eines
        der EU entsprechenden Datenschutzniveaus oder der Beachtung offiziell
        anerkannter spezieller vertraglicher Verpflichtungen, der so genannten
        „Standardvertragsklauseln“.
        <br />
        Soweit wir aufgrund der Unwirksamkeit des sog. „Privacy Shields“, nach
        Art. 49 Abs. 1 S. 1 lit. a) DSGVO die ausdrückliche Einwilligung in die
        Datenübermittlung in die USA von Ihnen einholen, weisen wird
        diesbezüglich auf das Risiko eines geheimen Zugriffs durch US-Behörden
        und die Nutzung der Daten zu Überwachungszwecken, ggf. ohne
        Rechtsbehelfsmöglichkeiten für EU-Bürger, hin.
      </p>
      <br />
      <strong>Löschung von Daten und Speicherdauer</strong>
      <p>
        Sofern nicht in dieser Datenschutzerklärung ausdrücklich angegeben,
        werden Ihre personenbezogen Daten gelöscht oder gesperrt, sobald die zur
        Verarbeitung erteilte Einwilligung von Ihnen widerrufen wird oder der
        Zweck für die Speicherung entfällt bzw. die Daten für den Zweck nicht
        mehr erforderlich sind, es sei denn deren weitere Aufbewahrung ist zu
        Beweiszwecken erforderlich oder dem stehen gesetzliche
        Aufbewahrungspflichten entgegenstehen. Darunter fallen etwa
        handelsrechtliche Aufbewahrungspflichten von Geschäftsbriefen nach § 257
        Abs. 1 HGB (6 Jahre) sowie steuerrechtliche Aufbewahrungspflichten nach
        § 147 Abs. 1 AO von Belegen (10 Jahre). Wenn die vorgeschriebene
        Aufbewahrungsfrist abläuft, erfolgt eine Sperrung oder Löschung Ihrer
        Daten, es sei denn die Speicherung ist weiterhin für einen
        Vertragsabschluss oder zur Vertragserfüllung erforderlich.
      </p>
      <br />
      <strong>Bestehen einer automatisierten Entscheidungsfindung</strong>
      <p>
        Wir setzen keine automatische Entscheidungsfindung oder ein Profiling
        ein.
      </p>
      <br />
      <strong>
        Bereitstellung unserer Website und Erstellung von Logfiles
      </strong>
      <ol style="margin:10px 0px; padding:15px;">
        <li>
          Wenn Sie unsere Webseite lediglich informatorisch nutzen (also keine
          Registrierung und auch keine anderweitige Übermittlung von
          Informationen), erheben wir nur die personenbezogenen Daten, die Ihr
          Browser an unseren Server übermittelt. Wenn Sie unsere Website
          betrachten möchten, erheben wir die folgenden Daten:
          <br />
          • IP-Adresse;
          <br />
          • Internet-Service-Provider des Nutzers;
          <br />
          • Datum und Uhrzeit des Abrufs;
          <br />
          • Browsertyp;
          <br />
          • Sprache und Browser-Version;
          <br />
          • Inhalt des Abrufs;
          <br />
          • Zeitzone;
          <br />
          • Zugriffsstatus/HTTP-Statuscode;
          <br />
          • Datenmenge;
          <br />
          • Websites, von denen die Anforderung kommt;
          <br />
          • Betriebssystem.
          <br />
          Eine Speicherung dieser Daten zusammen mit anderen personenbezogenen
          Daten von Ihnen findet nicht statt.
          <br />
          <br />
        </li>
        <li>
          Diese Daten dienen dem Zweck der nutzerfreundlichen, funktionsfähigen
          und sicheren Auslieferung unserer Website an Sie mit Funktionen und
          Inhalten sowie deren Optimierung und statistischen Auswertung.
          <br />
          <br />
        </li>
        <li>
          Rechtsgrundlage hierfür ist unser in den obigen Zwecken auch liegendes
          berechtigtes Interesse an der Datenverarbeitung nach Art. 6 Abs. 1 S.1
          lit. f) DS-GVO.
          <br />
          <br />
        </li>
        <li>
          Wir speichern aus Sicherheitsgründen diese Daten in Server-Logfiles
          für die Speicherdauer von 7 Tage Tagen. Nach Ablauf dieser Frist
          werden diese automatisch gelöscht, es sei denn wir benötigen deren
          Aufbewahrung zu Beweiszwecken bei Angriffen auf die
          Serverinfrastruktur oder anderen Rechtsverletzungen.
          <br />
        </li>
      </ol>
      <br />
      <strong>Matomo (früher PIWIK)</strong>
      <ol style="margin:10px 0px; padding:15px;">
        <li>
          Wir haben auf unserer Website den Webanalysedienst /
          OpenSource-Software „Matomo“ installiert, um die Nutzung unserer
          Website zu analysieren und zu verbessern.
          <br />
          <br />
        </li>
        <li>
          <strong>
            Datenkategorie und Beschreibung der Datenverarbeitung:
          </strong>{" "}
          IP-Adresse, technische Informationen zu Browser und Provider zzgl.
          Endgerät, Standort, Interessen und besuchte Seiten. Für die Analyse
          setzt die Software Cookies auf Ihrem Computer. Wir haben die sog. „IP
          Anonymisation“ aktiviert, wodurch Ihre IP-Adresse an den letzten 6
          Stellen Stellen gekürzt wird. Dadurch ist eine Personenbezogenheit der
          Daten nicht mehr möglich. Zudem wird diese IP nicht mit anderen von
          uns erhobenen Daten zusammengeführt. Die Daten werden auf unseren
          Servern in Deutschland verarbeitet und gespeichert.
          <br />
          <br />
        </li>
        <li>
          <strong>Zweck der Verarbeitung:</strong> Diese Daten werden zum Zwecke
          des Marketings, der Analyse und Optimierung unserer Website gesammelt
          und gespeichert.
          <br />
          <br />
        </li>
        <li>
          <strong>Rechtsgrundlagen:</strong> Haben Sie für Verarbeitung Ihrer
          personenbezogenen Daten mittels „Tracking“ Ihre Einwilligung erteilt
          („Opt-in“), dann ist Art. 6 Abs. 1 S. 1 lit. a) DS-GVO die
          Rechtsgrundlage. Rechtsgrundlage ist zudem unser in den obigen Zwecken
          liegendes berechtigtes Interesse an der Datenverarbeitung nach Art. 6
          Abs. 1 S.1 lit. f) DS-GVO. Bei Services, die im Zusammenhang mit einem
          Vertrag erbracht werden, erfolgt das Tracking und die Analyse des
          Nutzerhaltens nach Art. 6 Abs. 1 S. 1 lit. b) DS-GVO, um mit den
          dadurch gewonnen Informationen, optimierte Services zur Erfüllung des
          Vertragszwecks anbieten zu können.
          <br />
          <br />
        </li>
        <li>
          <strong>Speicherdauer:</strong> nach Erhebung der Daten werden diese
          anonymisiert. Die Speicherdauer der Cookies beträgt maximal 13 Monate
          bzw. bis zu ihrer Löschung durch Sie als Nutzer. Die Server-Logs
          werden nach 7 Tage Tagen automatisch gelöscht.
          <br />
          <br />
        </li>
        <li>
          <strong>Widerspruch:</strong> Sie können der Datenerhebung und
          -speicherung jederzeit kostenlos mit Wirkung für die Zukunft
          widersprechen. Sie können der Installation von Cookies durch Matomo
          auf verschiedene Arten widersprechen bzw. diese verhindern:
          <br />
          <br />
          &bull; Sie können die Cookies in Ihrem Browser durch die{" "}
          <strong>Einstellung “keine Cookies akzeptieren”</strong> unterbinden,
          was auch die Cookies von Drittanbietern beinhaltet;
          <br />
          <br />
          &bull; Sie können die Cookies von Matomo über diesen Link
          deaktivieren:
          <br />
          <br />
          <strong>
            <a
              href="https://matomo.beyondopen.de/index.php?module=CoreAdminHome&action=optOut&language=en&backgroundColor=&fontColor=&fontSize=&fontFamily=
"
            >
              Link
            </a>
          </strong>
          . Dieser Cookie gilt nur für unsere Website und Ihren aktuellen
          Browser und hat nur solange Bestand bis Sie Ihre Cookies löschen. In
          dem Falle müssten Sie den Cookie erneut setzen.
          <br />
          <br />
        </li>
        <li>
          Weitere Informationen entnehmen Sie der Datenschutzerklärung von
          Matomo unter:{" "}
          <a href="https://matomo.org/privacy/" rel="nofollow" target="_blank">
            https://matomo.org/privacy/
          </a>
          .<br />
          <br />
        </li>
      </ol>
      <br />
      <strong>Präsenz in sozialen Medien</strong>
      <ol style="margin:10px 0px; padding:15px;">
        <li>
          Wir unterhalten in sozialen Medien Profile bzw. Fanpages. Bei der
          Nutzung und dem Aufruf unseres Profils im jeweiligen Netzwerk durch
          Sie gelten die jeweiligen Datenschutzhinweise und Nutzungsbedingungen
          des jeweiligen Netzwerks.
          <br />
          <br />
        </li>
        <li>
          <strong>
            Datenkategorien und Beschreibung der Datenverarbeitung:
          </strong>{" "}
          Nutzungsdaten, Kontaktdaten, Inhaltsdaten, Bestandsdaten. Ferner
          werden die Daten der Nutzer innerhalb sozialer Netzwerke im Regelfall
          für Marktforschungs- und Werbezwecke verarbeitet. So können z.B.
          anhand des Nutzungsverhaltens und sich daraus ergebender Interessen
          der Nutzer Nutzungsprofile erstellt werden. Die Nutzungsprofile können
          wiederum verwendet werden, um z.B. Werbeanzeigen innerhalb und
          außerhalb der Netzwerke zu schalten, die mutmaßlich den Interessen der
          Nutzer entsprechen. Zu diesen Zwecken werden im Regelfall Cookies auf
          den Rechnern der Nutzer gespeichert, in denen das Nutzungsverhalten
          und die Interessen der Nutzer gespeichert werden. Ferner können in den
          Nutzungsprofilen auch Daten unabhängig der von den Nutzern verwendeten
          Geräte gespeichert werden (insbesondere, wenn die Nutzer Mitglieder
          der jeweiligen Plattformen sind und bei diesen eingeloggt sind). Für
          eine detaillierte Darstellung der jeweiligen Verarbeitungsformen und
          der Widerspruchsmöglichkeiten (Opt-Out) verweisen wir auf die
          Datenschutzerklärungen und Angaben der Betreiber der jeweiligen
          Netzwerke. Auch im Fall von Auskunftsanfragen und der Geltendmachung
          von Betroffenenrechten weisen wir darauf hin, dass diese am
          effektivsten bei den Anbietern geltend gemacht werden können. Nur die
          Anbieter haben jeweils Zugriff auf die Daten der Nutzer und können
          direkt entsprechende Maßnahmen ergreifen und Auskünfte geben. Sollten
          Sie dennoch Hilfe benötigen, dann können Sie sich an uns wenden.
          <br />
          <br />
        </li>
        <li>
          <strong>Zweck der Verarbeitung:</strong> Kommunikation mit den auf den
          sozialen Netzwerken angeschlossenen und registrierten Nutzern;
          Information und Werbung für unsere Produkte, Angebote und
          Dienstleistungen; Außerdarstellung und Imagepflege; Auswertung und
          Analyse der Nutzer und Inhalte unserer Präsenzen in den sozialen
          Medien.
          <br />
          <br />
        </li>
        <li>
          <strong>Rechtsgrundlagen:</strong> Die Rechtsgrundlage für die
          Verarbeitung der personenbezogenen Daten ist unser in den obigen
          Zwecken liegendes berechtigtes Interesse gemäß Art. 6 Abs. 1 S. 1 lit.
          f) DS-GVO. Soweit Sie uns bzw. dem Verantwortlichen des sozialen
          Netzwerks eine Einwilligung in die Verarbeitung Ihrer
          personenbezogenen Daten erteilt haben, ist Rechtsgrundlage Art. 6 Abs.
          1 S. 1 lit. a) i.V.m. Art. 7 DS-GVO.
          <br />
          <br />
        </li>
        <li>
          <strong>Datenübermittlung/Empfängerkategorie:</strong> Soziales
          Netzwerk.
          <br />
          <br />
        </li>
        <li>
          Die Datenschutzhinweise, Auskunftsmöglichkeiten und
          Widerspruchmöglichkeiten (Opt-Out) der jeweiligen Netzwerke /
          Diensteanbieter finden Sie hier:
          <br />
          <br />• <strong>Facebook</strong> – Diensteanbieter: Facebook Ireland
          Ltd., 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland);
          Website:{" "}
          <a href="http://www.facebook.com/" rel="nofollow" target="_blank">
            www.facebook.com
          </a>
          ; Datenschutzerkl&auml;rung:&nbsp;
          <a
            href="https://www.facebook.com/about/privacy/"
            rel="nofollow"
            target="_blank"
          >
            https://www.facebook.com/about/privacy/
          </a>
          , Opt-Out:&nbsp;
          <a
            href="https://www.facebook.com/settings?tab=ads"
            rel="nofollow"
            target="_blank"
          >
            https://www.facebook.com/settings?tab=ads
          </a>
          &nbsp;und&nbsp;
          <a
            href="http://www.youronlinechoices.com/"
            rel="nofollow"
            target="_blank"
          >
            http://www.youronlinechoices.com
          </a>
          ; Widerspruch:{" "}
          <a
            href="https://www.facebook.com/help/contact/2061665240770586"
            rel="nofollow"
            target="_blank"
          >
            https://www.facebook.com/help/contact/2061665240770586
          </a>
          ; Vereinbarung &uuml;ber gemeinsame Verarbeitung personenbezogener
          Daten auf Facebook-Seiten (Art. 26 DS-GVO):{" "}
          <a
            href="https://www.facebook.com/legal/terms/page_controller_addendum"
            rel="nofollow"
            target="_blank"
          >
            https://www.facebook.com/legal/terms/page_controller_addendum
          </a>
          , Datenschutzhinweise f&uuml;r Facebook-Seiten:{" "}
          <a
            href="https://www.facebook.com/legal/terms/information_about_page_insights_data"
            rel="nofollow"
            target="_blank"
          >
            https://www.facebook.com/legal/terms/information_about_page_insights_data
          </a>
          .<br />
          <br />• <strong>Instagram</strong> – Diensteanbieter: Facebook Ireland
          Ltd., 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland)
          &ndash; Datenschutzerkl&auml;rung/ Opt-Out:&nbsp;{" "}
          <a
            href="https://help.instagram.com/519522125107875"
            rel="nofollow"
            target="_blank"
          >
            https://help.instagram.com/519522125107875
          </a>
          , Widerspruch:{" "}
          <a
            href="https://help.instagram.com/contact/186020218683230"
            rel="nofollow"
            target="_blank"
          >
            https://help.instagram.com/contact/186020218683230
          </a>
          ; Vereinbarung &uuml;ber gemeinsame Verarbeitung personenbezogener
          Daten auf Instagram-Seiten (Art. 26 DS-GVO):{" "}
          <a
            href="https://www.facebook.com/legal/terms/page_controller_addendum"
            rel="nofollow"
            target="_blank"
          >
            https://www.facebook.com/legal/terms/page_controller_addendum
          </a>
          .<br />
          <br />• <strong>Twitter</strong> – Diensteanbieter: Twitter Inc., 1355
          Market Street, Suite 900, San Francisco, CA 94103, USA) -
          Datenschutzerkl&auml;rung:&nbsp;
          <a
            href="https://twitter.com/de/privacy"
            target="_blank"
            rel="nofollow"
          >
            https://twitter.com/de/privacy
          </a>
          , Opt-Out:&nbsp;
          <a
            href="https://twitter.com/personalization"
            target="_blank"
            rel="nofollow"
          >
            https://twitter.com/personalization
          </a>
          .<br />
          <br />
        </li>
      </ol>
      <br />
      <strong>Rechte der betroffenen Person</strong>
      <ol style="margin:10px 0px; padding:15px;">
        <li>
          <strong>
            Widerspruch oder Widerruf gegen die Verarbeitung Ihrer Daten
            <br />
            <br />
            Soweit die Verarbeitung auf Ihrer Einwilligung gemäß Art. 6 Abs. 1
            S. 1 lit. a), Art. 7 DS-GVO beruht, haben Sie das Recht, die
            Einwilligung jederzeit zu widerrufen. Die Rechtmäßigkeit der
            aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung
            wird dadurch nicht berührt.
            <br />
            <br />
            Soweit wir die Verarbeitung Ihrer personenbezogenen Daten auf die
            Interessenabwägung gemäß Art. 6 Abs. 1 S. 1 lit. f) DS-GVO stützen,
            können Sie Widerspruch gegen die Verarbeitung einlegen. Dies ist der
            Fall, wenn die Verarbeitung insbesondere nicht zur Erfüllung eines
            Vertrags mit Ihnen erforderlich ist, was von uns jeweils bei der
            nachfolgenden Beschreibung der Funktionen dargestellt wird. Bei
            Ausübung eines solchen Widerspruchs bitten wir um Darlegung der
            Gründe, weshalb wir Ihre personenbezogenen Daten nicht wie von uns
            durchgeführt verarbeiten sollten. Im Falle Ihres begründeten
            Widerspruchs prüfen wir die Sachlage und werden entweder die
            Datenverarbeitung einstellen bzw. anpassen oder Ihnen unsere
            zwingenden schutzwürdigen Gründe aufzeigen, aufgrund derer wir die
            Verarbeitung fortführen.
            <br />
            <br />
            Sie können der Verarbeitung Ihrer personenbezogenen Daten für Zwecke
            der Werbung und Datenanalyse jederzeit widersprechen. Das
            Widerspruchsrecht können Sie kostenfrei ausüben. Über Ihren
            Werbewiderspruch können Sie uns unter folgenden Kontaktdaten
            informieren:
            <br />
            <br /> Johannes Filter c/o Onion Space (Aufgang 4) ExRotaprint
            <br />
            Gottschedstraße 4<br />
            13357 Berlin
            <br />
            E-Mail-Adresse: kontakt@tatortrechts.de
            <br />
          </strong>
          <br />
        </li>
        <li>
          <strong>Recht auf Auskunft</strong>
          <br />
          Sie haben das Recht, von uns eine Bestätigung darüber zu verlangen, ob
          Sie betreffende personenbezogene Daten verarbeitet werden. Sofern dies
          der Fall ist, haben Sie ein Recht auf Auskunft über Ihre bei uns
          gespeicherten persönlichen Daten nach Art. 15 DS-GVO. Dies beinhaltet
          insbesondere die Auskunft über die Verarbeitungszwecke, die Kategorie
          der personenbezogenen Daten, die Kategorien von Empfängern, gegenüber
          denen Ihre Daten offengelegt wurden oder werden, die geplante
          Speicherdauer, die Herkunft ihrer Daten, sofern diese nicht direkt bei
          Ihnen erhoben wurden.
          <br />
          <br />
        </li>
        <li>
          <strong>Recht auf Berichtigung</strong>
          <br />
          Sie haben ein Recht auf Berichtigung unrichtiger oder auf
          Vervollständigung richtiger Daten nach Art. 16 DS-GVO.
          <br />
          <br />
        </li>
        <li>
          <strong>Recht auf Löschung</strong>
          <br />
          Sie haben ein Recht auf Löschung Ihrer bei uns gespeicherten Daten
          nach Art. 17 DS-GVO, es sei denn gesetzliche oder vertraglichen
          Aufbewahrungsfristen oder andere gesetzliche Pflichten bzw. Rechte zur
          weiteren Speicherung stehen dieser entgegen.
          <br />
          <br />
        </li>
        <li>
          <strong>Recht auf Einschränkung</strong>
          <br />
          Sie haben das Recht, eine Einschränkung bei der Verarbeitung Ihrer
          personenbezogenen Daten zu verlangen, wenn eine der Voraussetzungen in
          Art. 18 Abs. 1 lit. a) bis d) DS-GVO erfüllt ist:
          <br />
          • Wenn Sie die Richtigkeit der Sie betreffenden personenbezogenen für
          eine Dauer bestreiten, die es dem Verantwortlichen ermöglicht, die
          Richtigkeit der personenbezogenen Daten zu überprüfen;
          <br />
          <br />
          • die Verarbeitung unrechtmäßig ist und Sie die Löschung der
          personenbezogenen Daten ablehnen und stattdessen die Einschränkung der
          Nutzung der personenbezogenen Daten verlangen;
          <br />
          <br />
          • der Verantwortliche die personenbezogenen Daten für die Zwecke der
          Verarbeitung nicht länger benötigt, Sie diese jedoch zur
          Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen
          benötigen, oder
          <br />
          <br />
          • wenn Sie Widerspruch gegen die Verarbeitung gemäß Art. 21 Abs. 1
          DS-GVO eingelegt haben und noch nicht feststeht, ob die berechtigten
          Gründe des Verantwortlichen gegenüber Ihren Gründen überwiegen.
          <br />
          <br />
        </li>
        <li>
          <strong>Recht auf Datenübertragbarkeit</strong>
          <br />
          Sie haben ein Recht auf Datenübertragbarkeit nach Art. 20 DS-GVO, was
          bedeutet, dass Sie die bei uns über Sie gespeicherten
          personenbezogenen Daten in einem strukturierten, gängigen und
          maschinenlesbaren Format erhalten können oder die Übermittlung an
          einen anderen Verantwortlichen verlangen können.
          <br />
          <br />
        </li>
        <li>
          <strong>Recht auf Beschwerde</strong>
          <br />
          Sie haben ein Recht auf Beschwerde bei einer Aufsichtsbehörde. In der
          Regel können Sie sich hierfür an die Aufsichtsbehörde insbesondere in
          dem Mitgliedstaat ihres Aufenthaltsorts, ihres Arbeitsplatzes oder des
          Orts des mutmaßlichen Verstoßes wenden.
          <br />
          <br />
        </li>
      </ol>
      <br />
      <strong>Datensicherheit</strong>
      <p>
        Um alle personenbezogen Daten, die an uns übermittelt werden, zu
        schützen und um sicherzustellen, dass die Datenschutzvorschriften von
        uns, aber auch unseren externen Dienstleistern eingehalten werden, haben
        wir geeignete technische und organisatorische Sicherheitsmaßnahmen
        getroffen. Deshalb werden unter anderem alle Daten zwischen Ihrem
        Browser und unserem Server über eine sichere SSL-Verbindung
        verschlüsselt übertragen.
      </p>
      <br />
      <br />
      <strong>Stand: 12.02.2021</strong>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const content = await fetchContent("kontakt");
  return { props: { content } };
}

export default Kontakt;
