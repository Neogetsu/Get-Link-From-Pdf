
const fs = require('fs');
const path = require('path');
const PDFParser = require('pdf-parse');
const figlet = require('figlet');




const toTransformDir = './toTransform';


const resultJsonDir = './resultJson';
if (!fs.existsSync(resultJsonDir)) {
    fs.mkdirSync(resultJsonDir);
}




figlet('Dev by Neo\'s', function(err, data) {
    if (err) {
        console.log('Error: ', err);
        return;
    }
    console.log(data);
});


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




const excludedLink = ['https://replit.com/', 'https://repl.it/','https://repl.it/']
const getAllLink = (finalDir) => {
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

   // console.log(mdContent)
    fs.writeFileSync(path.join(finalDir, 'liens.pdf.md'), mdContent);
};

// Appel de la fonction getAllLink avec le dossier final en argument
const finalDir = './finalDir';
if (!fs.existsSync(finalDir)) {
    fs.mkdirSync(finalDir);
}




setTimeout( async() => {
    try{
       await  getAllLink(finalDir)
        console.log("Les liens ont bien été récuperer a l'adresse suivante:  -> " + path.join(finalDir, 'liens.pdf.md'))

    }
    catch (err){
        console.err(err)
    }

}, 5000)