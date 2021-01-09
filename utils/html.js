import cheerio from "cheerio";
import ky from "ky-universal";
import { API_LOCATION } from "./networking";

async function imageToHtml(imgId, className = null) {
  const url = API_LOCATION + `/content/api/v2/images/${imgId}/`;
  const apiResponse = await ky.get(url).json();
  const src = API_LOCATION + apiResponse.meta.download_url;
  const { title } = apiResponse;
  const { caption } = apiResponse.meta;
  //   if (className === null) return `<img src="${src}" alt="${title}" />`;
  return `<div class="level">
  <div class="level-item has-text-centered">
    <figure class='image'>
    <img src="${src}" alt="${title}" class="${className}" />
    <figcaption>${caption}</figcaption>
    </figure>
  </div>
</div>`;
}

async function fixHtml(html) {
  const $ = cheerio.load(html);

  // wasn't working with replaceWith
  await Promise.all(
    $("embed").map(async function () {
      const imageId = $(this).attr("id");
      const className = $(this).attr("format");
      console.log(className);
      let fixedClass = null;
      //   if (className === "left") fixedClass = "is-pulled-left";
      //   if (className === "right") fixedClass = "is-pulled-right";
      //   if (className === "fullwidth") fixedClass = "is-fullwidth";
      fixedClass = "is-centered";
      const newImage = await imageToHtml(imageId, fixedClass);
      $(this).before(newImage);
      $(this).remove();
      return;
    })
  );

  return $.html();
}

async function transformToHtml(content) {
  const contentList = await Promise.all(
    content.map(async (x) => {
      if (x.type == "heading") {
        return `<h1 class="title">${x.value}</h1>`;
      }

      if (x.type == "image") {
        const html = await imageToHtml(x.value);
        return html;
      }

      if (x.type == "paragraph") {
        const fixedHtml = await fixHtml(x.value);
        return `<div class="content">${fixedHtml}</div>`;
      }

      if (x.type == "quote") {
        console.log(x);
        const fixedHtml = await fixHtml(x.value.quote);
        let optauthor = "";
        if (x.value.author)
          optauthor = `<p class="has-text-right">– ${x.value.author}</p>`;
        return `<div class="content"><blockquote>${fixedHtml}</blockquote>${optauthor}</div>`;
      }

      if (x.type == "two_columns") {
        const left = await transformToHtml(x.value.left_column);
        const right = await transformToHtml(x.value.right_column);

        return `<div class="columns is-desktop"><div class="column">${left}</div><div class="column">${right}</div></div>`;
      }

      console.error("problem with " + x);
    })
  );

  return (
    `<section class="section"><div class="container">` +
    contentList.join("") +
    `</div></section>`
  );
}

export { transformToHtml };
