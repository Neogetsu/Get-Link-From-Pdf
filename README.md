# STUDY GET LINK FROM PDF

Ce script permet de récupérer tous les liens présents dans des fichiers PDF et de les classer par PDF dans un fichier Markdown.

## Utilisation

1. Placez tous les fichiers PDF à analyser dans le dossier `toTransform` à la racine du projet.
2. Initialisez le projet en installant les dépendances avec la commande `npm install`.
3. Lancez la commande `npm run get-links` pour lancer l'analyse des fichiers PDF.
4. Les fichiers JSON contenant les liens seront enregistrés dans le dossier `resultJson` à la racine du projet.
5. Les liens classés par PDF seront enregistrés dans le fichier `liens.pdf.md` dans le dossier `finalDir` à la racine du projet.

## Personnalisation

- Pour exclure certains liens de l'analyse, modifiez le tableau `excludedLink` dans le fichier `getLinks.js`.
- Pour modifier le nom du fichier MD final, modifiez le nom du fichier passé en argument à la fonction `getAllLink()` dans le fichier `getLinks.js`.
- Pour modifier le dossier de destination du fichier MD final, modifiez le chemin passé en argument à la fonction `getAllLink()` dans le fichier `getLinks.js`.


 

 


# ###~~Dev by Neo's
