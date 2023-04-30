
const fs = require('fs');
const path = require('path');
const PDFParser = require('pdf-parse');
const figlet = require('figlet');





// Location
const toTransformDir = './toTransform';
const resultJsonDir = './resultJson';
if (!fs.existsSync(resultJsonDir)) {
    fs.mkdirSync(resultJsonDir);
}
const finalDir = './finalDir';
if (!fs.existsSync(finalDir)) {
    fs.mkdirSync(finalDir);
}

//My BRAND
figlet('Dev by Neo\'s', function(err, data) {
    if (err) {
        console.log('Error: ', err);
        return;
    }
    console.log(data);
});


//Convert all pdf to json
fs.readdirSync(toTransformDir).forEach(file => {
    if (path.extname(file).toLowerCase() === '.pdf') {
        const pdfData = fs.readFileSync(path.join(toTransformDir, file));
        const fileName = path.parse(file).name;
        PDFParser(pdfData).then(function(data) {
            fs.writeFileSync(path.join(resultJsonDir, `${fileName}.json`), JSON.stringify(data));
        });
    }
});
console.info("Script is running, please wait...")


//Get all Link and excluded some links.
const excludedLink = ['https://replit.com/', 'https://repl.it/','https://repl.it/']
const getAllLink = async (finalDir) => {
    const linksByPDF = {};

    // Parcourir chaque fichier JSON dans le dossier resultJson
    fs.readdirSync(resultJsonDir).forEach(file => {
        if (path.extname(file).toLowerCase() === '.json') {
            const jsonData = JSON.parse(fs.readFileSync(path.join(resultJsonDir, file)));

            // Récupérer les liens de chaque PDF
            const fileName = path.parse(file).name;
            const links = jsonData.text.match(/\bhttps?:\/\/\S+/gi)
                .filter(link => !excludedLink.some(excluded => link.includes(excluded)));
            linksByPDF[fileName] = links;
        }
    });

    // Créer le fichier MD contenant tous les liens classés par PDF
    let mdContent = '';
    Object.keys(linksByPDF).forEach(pdfName => {
        mdContent += `# ${pdfName}\n`;
        linksByPDF[pdfName].forEach(link => {
            mdContent += `- [${link}](${link})\n`;
        });
        mdContent += '\n';
    });
    // Créer le fichier HTML avec un thème sombre et bien organisé
    let htmlContent = `
<html>
    <head>
        <title>Liens PDF</title>
                <style>
                body {
                background-color: #2c3e50;
                color: #fff;
                margin: 0;
                padding: 0;
                font-family: sans-serif;
            }
            h1 {
                color:rgba(0, 255, 255, 0.8);
                font-size: 36px;
                text-align: center;
                margin-top: 50px;
                text-shadow: 3px 3px 6px black;
            }
            h2 {
                color: #f9f9fa;
                font-size: 24px;
                margin-top: 50px;
                text-align: center;
                text-transform: uppercase;
                text-shadow: 3px 3px 6px black;
                letter-spacing: 10px;

            }
            table {
                border-collapse: collapse;
                width: 80%;
                margin: 0 auto;
                margin-top: 50px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            }
            th {
                text-align: left;
                padding: 16px;
                background:linear-gradient(180deg, rgba(0, 255, 255, 0.8), rgba(0, 0, 139, 0.66));
                color: white;
                font-weight: bold;
                text-transform: uppercase;
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
            }
            td {
                text-align: left;
                padding: 16px;
                border-bottom: 1px solid #ddd;
            }
            tr:hover {
                background-color: rgba(149, 149, 149, 0.27);
            }
            a {
                color: #b942f5;
                text-decoration: none;

            }
            a:hover {
                color: white;

                text-decoration: none;


            }
        </style>
    </head>
    <body>
        <h1>PDF ALL LINK</h1>
`;

    Object.keys(linksByPDF).forEach(pdfName => {
        htmlContent += `<h2>${pdfName}</h2>
    <table>
        <tr>
            <th>Lien</th>
        </tr>`;
        linksByPDF[pdfName].forEach(link => {
            htmlContent += `
        <tr>
            <td><a target="_blank" href="${link}">${link}</a></td>
        </tr>`;
        });
        htmlContent += `
    </table>`;
    });

    htmlContent += `
    </body>
</html>`;
    fs.writeFileSync(path.join(finalDir, 'liens.pdf.md'), mdContent);
    fs.writeFileSync(path.join(finalDir, 'liens.pdf.html'), htmlContent);


};






setTimeout( async() => {
    try{
       await  getAllLink(finalDir)
        console.log("Les liens ont bien été récuperer a l'adresse suivante:  -> " + path.join(finalDir, 'liens.pdf.md'))
        console.log("Les liens ont bien été récuperer a l'adresse suivante:  -> " + path.join(finalDir, 'liens.pdf.html'))

    }
    catch (err){
        console.log(err)
    }

}, 5000)