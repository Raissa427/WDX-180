# Tasks

## CONTENT

  ### Content Review & curriculum selection: [Machine Learning for Web Developers (Web ML)](https://www.youtube.com/playlist?list=PLOU2XLYxmsILr3HQpqjLAUkIPa5EaZiui)

  - Total duration: 07:53:45
  - Videos counted: 47

  Please use the [**Review Form**](https://docs.google.com/document/d/1CRaejbYTLorucBXauv2Z-FEqXtYB5K1hdsZu7496YEc/edit?usp=sharing) if you intend to review the content and provide a valuable feedback. Create a copy of the form template and start working there.

  ### Content Review & curriculum selection: [Dave Gray's Next.js course](https://www.youtube.com/playlist?list=PL0Zuz27SZ-6Pk-QJIdGd1tGZEzy9RTgtj)

  - Videos: 1 - 12. 14 - 15. 19 - 22. 25.

  ### Create Searchable Glossary based on MDN

  **Specifications:**

  - Based on [MDN Web Docs Glossary](https://developer.mozilla.org/en-US/docs/Glossary). [Source](https://github.com/mdn/content/tree/ac9555df73c8d2825c886fa94aac13f87295e74c/files/en-us/glossary)

  > **IMPORTANT:** If you are up to the challenge, please create a branch named `tasks-glossary` and work on that branch. Try to implement as many unit tests as possible to ensure the reliability of your code.

  - Glossary terms should be placed in `resources/glossary/` as Markdown files (`.md`).

  - Markdown files should be parsed using the `tools/yari.parser.js` script.

  - (New) glossary terms should also be appended to the `resources/terms.json` file in alphabetical order.

  ### Create local/offline version of MDN HTTP Status Codes

  - [Source](https://github.com/mdn/content/tree/ac9555df73c8d2825c886fa94aac13f87295e74c/files/en-us/web/http/status)

  > **IMPORTANT:** If you are up to the challenge, please create a branch named `tasks-glossary-http` and work on that branch. Try to implement as many unit tests as possible to ensure the reliability of your code.

  - Destination folder: `resources/HTTP/`

  - Markdown files should be parsed using the `tools/yari.parser.js` script.

  - (New) glossary terms should also be appended to the `resources/terms.json` file in alphabetical order.

## MISC

  ### Create a local/offline version of JS Linux

    - Project Manager: Kostas Minaidis (@kostasx)

    - URL: https://bellard.org/jslinux/vm.html?url=alpine-x86.cfg&mem=192
    - FAQ: https://bellard.org/jslinux/faq.html
    - Resources: https://copy.sh/v86/
    - Easy to install precompiled JSLinux demo: https://bellard.org/tinyemu/jslinux-2019-12-21.tar.gz

  ### Convert `Awesome Developer Dictionary` to JSON Format and integrate into resources

    - Project Manager: Kostas Minaidis (@kostasx)

  - [Source](https://github.com/dephraiim/awesome-developer-dictionary)

  ### Complete unit testing and documentation pages for the tools

    - Project Manager: Kostas Minaidis (@kostasx)

    Scripts found in `tools/` folder must be accompanied by several unit tests.

    At this point, only a handful of scripts contain unit tests. Check [the relevant file](../tools/README.md) to get more information about the tools and their testing status.

    If you feel ready to contribute, and it's the first time you are working on the testing of a tool, please reach out to the corresponding Project Manager for the tool before starting to work on the tests.

  ### Set up GitHub Actions to run housekeeping scripts (linting, etc.)

    - Project Manager: Kostas Minaidis (@kostasx)

    For more information reach out to: Kostas Minaidis (@kostasx)

  ### Implement Digital Certificates Issuing (Next.js)

    - Project Manager: Kostas Minaidis (@kostasx)

    A special certificate HTML template, along with a unique address on our website will be used to certify the attendance and completion of the various parts of our curriculum (60°, 120°, 180°).

    **Specifications:**

    - Must be built on top of `Next.js`
    - Must have a unique (hashed) shareable URL

## TOOLS

  ### Create linter for the /user/progress.draft.*.csv files

  - Project Manager: Kostas Minaidis (@kostasx)

  - File: tools/progress.linter.js

  - Requirements:
    - Ensure that the level column is set to the appropriate values (Beginner, Intermediate, Advanced)
    - Ensure that the COMPLETED columns has either FALSE or TRUE, in all uppercase and no other value or missing
    - Check for unintended commas (,) inside the field values. Commas should be included inside "double quotes" if they are intended as values
    - Ensure there are no discrepancies in the week and day columns, e.g. they are all in ascending order, no days or weeks are skipped, they are 2 digit numbers, etc. 
    - Two modes: lint the boilerplate files and lint the students' updated files and check for errors

  ### Create linter for the /user/progress.draft.terms.csv file

  - Project Manager: Kostas Minaidis (@kostasx)

  - File: tools/progress.linter.js

  - Requirements:
    - Check that all entries have a slug
    - Check that no duplicate slugs are found
    - Check that no empty lines are found
    - Run linter on commit

  ### Develop script that validates the progress sheets (user/*.csv) before committing

    - Project Manager: Kostas Minaidis (@kostasx)

  ### Implement Weekly Feedback/Follow-up form

    - Project Manager: Kostas Minaidis (@kostasx)

    At the end of each week, we ask students to submit a feedback form in order to check on their progress and get some valuable feedback on how things are going.

    **Specifications:**

    - Must be anonymous

  ### Implement a tool to estimate reading time for markdown files

    - Project Manager: Kostas Minaidis (@kostasx)

    > **IMPORTANT:** If you are up to the challenge, please create a branch named `tasks-markdown-reading-time` and work on that branch. Try to implement as many unit tests as possible to ensure the reliability of your code.

    The tool should be able to read and parse a markdown file, estimate the reading time and possibly have the ability to automatically update the file with a section containing the reading time, ideally somewhere at the top of the file.

    - Possible (library) candidates: [reading-time](https://github.com/ngryman/reading-time)

  ### Complete open tasks for the validator.js tool

    - Project Manager: Kostas Minaidis (@kostasx)

    See the [README.md](../tools/README.md#toolsvalidatorjs) file `Tasks` section for more details. 

## PLATFORM (npm run learn)  

### Read, parse and display markdown content from `curriculum` folder in Next.js