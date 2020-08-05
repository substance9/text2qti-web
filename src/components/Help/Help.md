text2qti-web allows users to create the quiz in a more user-friendly markdown text format. It converts the text-format quiz into QTI-format ZIP file which could be imported to a Canvas course. The markdown-to-QTI conversion code running on backend is a modified version of open-source project [text2qti](https://github.com/gpoore/text2qti) created by [Geoffrey Poore](https://github.com/gpoore). We customize the code to support more question types (fill-in-multiple-blanks and multiple-dropdowns) and customized format.

This tools is currently hosted on Azure App Cloud . If you prefer running it on your own host, please choose the version, access the Github repo and follow the instructions in README file:

[Web version](https://github.com/substance9/text2qti-web)

[Command-line version](https://github.com/substance9/text2qti)


## Getting Started
1. Copy/Download [quiz template markdown text](https://raw.githubusercontent.com/substance9/text2qti/master/template.md)
2. Adjust the contents
3. Go to the homepage of text2qti-web, copy the modified content to the textarea or select the markdown format file
4. Click "Convert"
5. If the file is converted correctly, a green status block will be shown below "Convert" button, with a download button in it.
6. Click the download button to get the generated QTI zip file
7. Import the QTI zip file on Canvas (detailed later)


## Format and Examples
This help document aims to give learn-by-doing instructions by directly providing a template. The template includes sample questions that cover each question type. The comments in the template also give instructions and descriptions about the format. The detailed specification for the format could be found at the text2qti repo's [README document](https://github.com/gpoore/text2qti/blob/master/README.md). Please note that the format we are using in this tool has some differences comparing with the original format in gpoore's text2qti repo. The differences are illustrated below:

### Difference between our customized quiz format and original text2qti format
#### Question Creation
Instead of using number followed by a period(e.g. `1.`), we are using `Q.` to indicate the the creation of the question

#### Indentation
Descriptions, questions, choices, feedback, and text regions may span multiple paragraphs and include arbitrary Markdown content like code blocks or quotations. Original text2qti format requires that everything must be indented to at least the same level as the start of the first paragraph on the initial line. We removed this requirement in our format. 

#### Support of Multiple-Dropdowns and Fill-In-Multiple-Blanks Question Type
To create a **Fill-In-Multiple-Blanks question**, in the question creation/description part, type a reference word (no spaces) surrounded by brackets at every place you want to show an answer box. Below, use `<>` followed by spaces and `[reference word]` for answers of each blank marked by the reference word. Example:
```
Q.  In the box below, every place you want to show an answer box, type a reference word (no spaces) surrounded by brackets(i.e. "Roses are [color1], violets are [color2]")
<>    [color1]    red
<>    [color1]    RED
<>    [color1]    Red
<>    [color2]    BLUE
```

To create a **Multiple-Dropdowns**, in the question creation/description part, follow the same rules to add reference words at the places for the answer box. Below, use `{ }` followed by spaces and `[reference word]` for incorrect answers of each blank marked by the reference word and use `{*}` for correct answers. Example:
```
Q:  In the box below, every place you want to show an answer, type a reference word (no spaces) surrounded by brackets(i.e. "Roses are ((color1)), violets are ((color2))")
{*}   [color1]   red
{ }   [color1]   blue
{ }   [color1]   yellow
{*}   [color2]   purple
{ }   [color2]   white
```

#### Fill-In-The-Blank (Short Answer) Question
To make the Fill-In-The-Blank question's format be consistent with Fill-In-Multiple-Blanks, we change the format pattern of a correct answer of Fill-In-The-Blank question to `<>` instead of `*`

#### Feedback for incorrect response/answer
Original text2qti format use dash `-` to identify the feedback for incorrect answer. However, the dash symbol is also commonly used as the mark of a bulletin point to create a list in markdown. So we use `~` to mark feedback for incorrect answer in our format.

## Template Markdown File
Download at [https://raw.githubusercontent.com/substance9/text2qti/master/template.md](https://raw.githubusercontent.com/substance9/text2qti/master/template.md)

## Upload and Import to Canvas Course
1. Go to the homepage of the Canvas course which the quiz should be in 
2. Click "Settings" on the left side of the page
3. Click "Import Course Content" on the right side of the page
4. In the "Import Content Section", choose the proper options for your quiz:
	1. In "Content Type" dropdown selection, choose "QTI .zip file"
	2. Select the zip file you downloaded / generated from text2qti tool
	3. (optional) Select the desired question bank for the quiz
	4. (optional) Choose either overwrite
5. Click "Import"
 

## Related Links
- Original text2qti Github Repo: [https://github.com/gpoore/text2qti](https://github.com/gpoore/text2qti)
- Customized text2qti Github Repo (used as the backend of this text2qti-web): [https://github.com/substance9/text2qti](https://github.com/substance9/text2qti)
- Front-end of text2qti Github Repo: [https://github.com/substance9/text2qti-web](https://github.com/substance9/text2qti-web)

## Contact 
For help and questions, please create issues on the [text2qti-web GitHub issue page](https://github.com/substance9/text2qti-web/issues) or directly contact Guoxi Wang (guoxiw1 [at] uci [dot] edu). 