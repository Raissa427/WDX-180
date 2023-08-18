const path = require("node:path");
const fs = require("node:fs");
const { parseArgs } = require("node:util");
// https://pawelgrzybek.com/til-node-js-18-3-comes-with-command-line-arguments-parser/
const { warn, ok, info } = require("./utils");

/* 
  Description: this script parses MDN markdown files and replaces the following patterns:

  Search and remove:

  {{LearnSidebar}}

  {{PreviousMenuNext("Learn/Getting_started_with_the_web/HTML_basics", "Learn/Getting_started_with_the_web/JavaScript_basics", "Learn/Getting_started_with_the_web")}}

  Search and replace {{Glossary}} links:

  ...

  Search and replace links:

  ...

*/

/**
 * TODO: ADD TESTS
 * @param {string} textContent 
 * @returns string
 */
function removeTemplateContent( textContent ){

  // Thank you ChatGPT! 
  // const templateRegex = /{{QuicklinksWithSubPages\("[A-Za-z_\/]+"\)}}\s*\n|{{GlossarySidebar}}\s*\n|{{LearnSidebar}}|{{(?:LearnSidebar)?(?:PreviousMenuNext|PreviousMenu|NextMenuPrevious)\(["'][^"']*["'],\s*["'][^"']*["'],\s*["'][^"']*["']\)}}\s*\n/g;

  const templateRegex = /{{QuicklinksWithSubPages\("[A-Za-z_\/]+"\)}}\s*\n|{{GlossarySidebar}}\s*\n|{{LearnSidebar}}|{{(?:LearnSidebar)?(?:PreviousMenuNext|PreviousMenu|NextMenuPrevious)\([^)]+\)}}\s*\n/g;

  // const templateRegex = /{{PreviousMenu\([^)]+\)}}\s*\n/g

  const templateMatches = textContent.match(templateRegex); 

  if ( templateMatches ){
    console.log( templateMatches )
    ok("Substituted {{Template}} matches successfully");
    return textContent.replace(templateRegex, "");
  }

  return textContent;

}

function replaceHTMLGlossaryLinks( textContent, fileName ){

  // Thank you ChatGPT! 
  const glossaryRegex = /(<[^>]*>)\{\{[Gg]lossary\("([^"]+)"(?:,\s*"([^"]+)")?\)\}\}(<\/[^>]*>)/g;

  function replaceGlossary(match, openingTag, p1, p2, closingTag) {
    // console.log({ p1, p2, openingTag, closingTag });
    // TODO: Replace MDN domain with local resources/glossary path if available
    let baseLink = "https://developer.mozilla.org/en-US/docs/Glossary/";
    let link = "";

    const glossaryDirectory = path.join(__dirname, '..', "resources", "glossary", `${p1}.md`);

    if (fs.existsSync(glossaryDirectory)){
      // Count the number of remaining path segments
      const subfolderCount = fileName.split(path.sep).length - 1;
      const parentPaths = Array.from({ length: subfolderCount}).fill( "../" ).join("");
      link = `${parentPaths}resources/glossary/${p1}.md`
      console.log(`Local glossary entry for ${p1} exists.`); 
    } else {
      link = `${baseLink}${p1[0].toUpperCase() + p1.slice(1).replace(/\s+/g, "_")}`;
    }

    const output = `${openingTag}<a href="${link}">${ p2 ? p2 : p1}</a>${closingTag}`;
    // console.log({ match, output });
    // console.log(match, p1, p2);
    return output;
  }

  if ( textContent.match(glossaryRegex) ){
    ok("Substituted {{Glossary}} matches successfully");
    return textContent.replace(glossaryRegex, replaceGlossary);
  } 

  info("\n No HTML {{Glossary}} matches found on this file");
  return textContent;

}

function replaceGlossaryLinks( textContent, fileName ){

    // Thank you ChatGPT! 
    const glossaryRegex = /\{\{[Gg]lossary\("([^"]+)"(?:,\s*"([^"]+)")?\)\}\}/g;

    function replaceGlossary(match, p1, p2) {
      // TODO: Replace MDN domain with local resources/glossary path if available
      let baseLink = "https://developer.mozilla.org/en-US/docs/Glossary/";
      let link = "";

      const glossaryDirectory = path.join(__dirname, '..', "resources", "glossary", `${p1}.md`);

      if (fs.existsSync(glossaryDirectory)){
        // Count the number of remaining path segments
        const subfolderCount = fileName.split(path.sep).length - 1;
        const parentPaths = Array.from({ length: subfolderCount}).fill( "../" ).join("");
        link = `${parentPaths}resources/glossary/${p1}.md`
        console.log(`Local glossary entry for ${p1} exists.`); 
      } else {
        link = `${baseLink}${p1[0].toUpperCase() + p1.slice(1).replace(/\s+/g, "_")}`;
      }
  
      const output = p2 ? `[${p2}](${link})` : `[${p1}](${link})`;
      // console.log(match, p1, p2);
      return output;
    }

    if ( textContent.match(glossaryRegex) ){
      ok("Substituted {{Glossary}} matches successfully");
      return textContent.replace(glossaryRegex, replaceGlossary);
    } 

    info("\n No {{Glossary}} matches found on this file");
    return textContent;
  
}

function replaceDOMXrefLinks( textContent, fileName ){

  // Thank you ChatGPT! 
  const glossaryRegex = /\{\{domxref\("([^"]+)"(?:,\s*"([^"]+)")?\)\}\}/g;

  function replaceGlossary(match, p1, p2) {
    // console.log({ match, p1, p2 });
    // TODO: Replace MDN domain with local resources/glossary path if available
    let baseLink = "https://developer.mozilla.org/en-US/docs/Web/API/";
    let link = "";

    // const glossaryDirectory = path.join(__dirname, '..', "resources", "glossary", `${p1}.md`);

    // TODO: UPDATE TO REFLECT Document/ FOLDER FOR LOCAL OFFLINE FILES
    if ( false && fs.existsSync(glossaryDirectory) ){

      // Count the number of remaining path segments
      const subfolderCount = fileName.split(path.sep).length - 1;
      const parentPaths = Array.from({ length: subfolderCount}).fill( "../" ).join("");
      link = `${parentPaths}resources/glossary/${p1}.md`
      console.log(`Local glossary entry for ${p1} exists.`); 

    } else {

      const [ base, term ] = p1.split(".");
      // console.log({ base, term });
      link = `${baseLink}${base}/${term}`;
    
    }

    const output = p2 ? `[${p2}](${link})` : `[${p1}](${link})`;
    // console.log({ output });
    // console.log(match, p1, p2);
    return output;
  }

  if ( textContent.match(glossaryRegex) ){
    ok("Substituted {{Glossary}} matches successfully");
    return textContent.replace(glossaryRegex, replaceGlossary);
  } 

  info("\n No {{Glossary}} matches found on this file");
  return textContent;

}

function parseMDNLinks( textContent ){
  const domain = "https://developer.mozilla.org"
  const regex = /\[([^\]]+)\]\((\/en-US\/docs\/[^\)]+)\)/g;
  const matches = textContent.match(regex);
  if ( matches ){
    console.log( matches );
    // return textContent.replace( regex )
    return textContent.replace(regex, (match, linkText, url) => {
      // console.log( match ); // [...](...)
      // console.log( linkText); // Link label
      // console.log( url ); // Link URL: /en-us/docs/...
      const newUrl = domain + url;
      return `[${linkText}](${newUrl})`;
    });
  }

  return textContent;
}

function parseImages( textContent ){

  const regex = /!\[([^\]]*)]\(((?!https?:\/\/)[^\)]+)\)/g;
  
  const matches = textContent.match(regex);
  
  if (matches) {
    return textContent.replace( regex, (match, altText, imgSrc)=>{
      if ( imgSrc.startsWith("assets") ){
        return match;
      }
      return `![${altText}](assets/${imgSrc})`
    })
  }
  
  return textContent;
}

function parseElementTerm( textContent ){

  const URL = "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/";
  const pattern = /{{(htmlelement|HTMLElement)\("(.*?)"(?:, "(.*?)")?\)}}/g;
  return textContent.replace(pattern, ( match, _, termA, termB )=>{
    const link = `${URL}${termA}`;
    return `[\`<${termB ? termB : termA}>\`](${link})`;
  })
}

function parseCSSTerm( textContent ){
  // {{cssxref("width")}}
  //=> https://developer.mozilla.org/en-US/docs/Web/CSS/width
  const domain = "https://developer.mozilla.org/en-US/docs/Web/CSS/";
  const regex = /{{cssxref\("([^"]+)"\)}}/g;
  return textContent.replace( regex, (match, cssTerm)=>{
    return `[\`${cssTerm}\`](${domain}${cssTerm})`
  })
}

function parseHTTPStatus( textContent ){
  const URL = "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/";
  const pattern = /{{(HTTPStatus)\("(.*?)"(?:, "(.*?)")?\)}}/g;
  return textContent.replace(pattern, ( match, _, termA, termB )=>{
    const link = `${URL}${termA}`;
    const output = `[${termB ? termB : termA}](${link})`;
    // console.log({ output }); 
    return output;
  })
}

// Orchestrate Parsing & Modifications
function parseYariDynamicContent( textContent, fileName ){

  let updatedContents = textContent;

  // Run this first:
  updatedContents = replaceHTMLGlossaryLinks(updatedContents, fileName);
  // Then run this one:
  updatedContents = replaceGlossaryLinks(updatedContents, fileName);
  updatedContents = removeTemplateContent(updatedContents);
  updatedContents = parseMDNLinks(updatedContents);
  updatedContents = parseImages(updatedContents);
  updatedContents = parseElementTerm(updatedContents);
  updatedContents = parseCSSTerm(updatedContents);
  updatedContents = parseHTTPStatus(updatedContents);
  updatedContents = replaceDOMXrefLinks(updatedContents);

  return updatedContents;

}

if (require.main === module) {
  // console.log("This script was executed directly.");
  init();
} else {
  // console.log("This script was imported as a module.");
}

function init(){

  const fileName = process.argv[2];

  if ( !fileName ){
    warn("No filename.")
    process.exit();
  }

  try {
  
    console.log(`Processing ${fileName}`);
    
    const file = fs.readFileSync(fileName, "utf-8");
    fs.writeFileSync( fileName, parseYariDynamicContent(file, fileName), "utf8" );
  
  } catch(e){
  
    warn(e.message);
  
  }

}


module.exports = {
  parseYariDynamicContent,
  parseMDNLinks,
  parseHTTPStatus,
  parseImages,
  parseElementTerm,
  parseCSSTerm,
  replaceHTMLGlossaryLinks,
  replaceDOMXrefLinks
};