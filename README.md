# WP-TIT20B

Projektarbeit Webprogrammierung – HardwareVergleich46

von Dario Neumann, Luise Frerichs, Tempest Glodowski, Marc Hoppe, Marko Jahn und Markus Simianer

Im Zuge der Vorlesung „Webprogrammierung“ soll im Rahmen einer Projektarbeit eine Webanwendung zu einem frei wählbaren Thema erstellt werden. Für das hiesige Projekt wurde sich dafür entschieden, eine Webanwendung in Form eines Onlineshops für Computerhardware umzusetzen. Mit dieser Webanwendung soll es für NutzerInnen möglich sein sich einen schnellen Überblick über verschiedene Computerhardware und neueste Techniken zu verschaffen. Ausgehend von einer Startseite, auf der eine kurze Übersicht über die Funktionalität der Webanwendung erfolgt, sollen Informationen und weiterführende Links zu ausgewählter Computerhardware abgerufen werden können. Dazu zählen beispielsweise Prozessoren, Grafikkarten und Monitore. Auf den jeweiligen Seiten dieser Hardware sollen Informationen, wie der Name, Hersteller und Preis, zu einzelnen Modellen dargestellt werden. Außerdem findet sich dort ein Link zu einem Shop, bei dem der Artikel bestellt werden kann.

Neben dem Informieren über Computerhardware soll es für NutzerInnen möglich sein, mit den ShopbetreiberInnen Kontakt aufzunehmen, um beispielsweise Fragen zu Produkten zu stellen oder Feedback zum Shop zu geben. Des Weiteren sollen in einem Impressum Informationen über die ShopbetreiberInnen hinterlegt sein.

Ziel ist es nach und nach so viele Funktionen zu implementieren, so dass am Ende ein funktionsfähiger Shop für Computerhardware bereitgestellt werden kann.

## Dokumentation für Anwender

### Favoriten

Bei Interesse an einem Produkt, kann dieses den Favoriten hinzugefügt werden (kein Zugriff für andere User), in dem auf den Button "Zu Favoriten hinzufügen" geklickt wird. Diese werden dann im Navigationspunkt "Meine Favoriten" gelistet und können angesehen werden. Dies ermöglicht Besuchern der Seite ein besseres Einkaufserlebnis und erhöht die Wahrscheinlichkeit, Produkte zu kaufen.

### Meistbesucht

HardwareVergleich46 trackt mittels Cookies die Seitenaufrufe von Usern und speichert diese in "Meistbesucht", in der User auch selbst sehen können, welche Seiten sie sich am häufigsten angesehen haben (nur für den eingeloggten Account selbst sichtbar).

### Kommentare

Kommentare ermöglichen es, den Usern Erfahrungen und Empfehlungen zu einzelnen Produkten zu teilen. Dazu kann der Text in das Inputfeld zum jeweiligen Produkt geschrieben werden und mit dem Button "Kommentar hinzufügen" in den Textbereich darunter geschrieben werden (für alle sichtbar).

## Dokumentation Docker

### Build Container

docker build -t hardwarevergleich46-node .

### Start Container

docker run -d -p 8080:8080 hardwarevergleich46-node

### Adresse

http://localhost:8080/

## Dokumentation für Entwickler

### Node und ejs

Im Branch node des Projektes wurde eine Umstrukturierung des Projektes vorgenommen. Die Webseite wird nun mit Node.js gehostet. Dabei werden die Pakete EJS, express und nodemon verwendet. EJS wird verwendet, da ein Template existieren und wir an dieses übergeben welcher Inhalt angezeigt werden soll und EJS kombiniert dann beides. Das Docker-Image wird auf dem Node:17-Alpine-Image aufgebaut und kopiert die package.json- und yarn.lock-Dateien in das Arbeitsverzeichnis von Alpine, die die zu installierenden Pakete enthalten. yarn installiert anschließend die benötigten Pakete. Zuletzt wird der Port 8080 freigegeben und mit “yarn run start“ das Hosting im Container gestartet, sobald der Container aus dem Image heraus erstellt und gestartet wird.

### Projektarbeit: interaktive Website

Index.js:

- Zwei Maps (accounts und alleKommentare) zum Speichern der Daten in index.js hinzugefügt.
- ein Account in *accounts *beinhaltet ein Array mit den Inhalten: Username, eine Map für die eigenen Kommentare, ein Set für die eigenen Favoriten und eine map für die meistbesuchten Seiten
- *alleKommentare *beinhaltet pro Artikel mehrere Arrays mit je dem Usernamen und dem Kommentar zum Artikel
- Login-Handler hinzugefügt, welcher über ein Form in der template.ejs aufgerufen wird. Dort wird der oben im Textfeld eingegebene Name abgerufen und überprüft, ob dieser schon in *accounts *existiert. Falls nein wird ein neuer account angelegt und die Inhaltszähler mit 0 initialisiert, sowie der Cookie gesetzt. Falls der Username bereits existiert passiert nichts
- Kommentar-Handler hinzugefügt, welcher über mehrere Forms in den HTML-Seiten aufgerufen wird. Es wird über den Cookie der Account des Absenders bestimmt und diesem der Kommentar hinzugefügt. Außerdem wird auch der Kommentar in die alleKommentare Collection hinzugefügt.
- Favorit-Handler hinzugefügt, welcher über mehrere Forms in den HTML-Seiten aufgerufen werden. Beide bestimmen den Account des Absenders und fügen den Artikel / entfernen den Artikel aus dem Favoriten Set.
- Jedes mal wenn ein HTTP-Get Handler angesprochen wird, wird der Account des Absenders bestimmt und der entsprechende Inhaltszähler um 1 erhöht.

views:

- In der template.ejs wurden zwei Variablen *account *und alleKommentare angelegt. Account bekommt vom HTTP-get Handler den Account des aufrufenden und *alleKommentare *bekommt die Referenz der *alleKommentare *Collection.
- Aus diesen zwei Variablen werden in den 3 neuen Views und in der template.ejs die benötigten Daten abgerufen und iteriert. Dazu wird eine spezielle Syntax genutzt, welche es erlaubt JavaScript in den HTML-Dokumenten zu verwenden (Durch <% und %> gekennzeichnet)
