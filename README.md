# WP-TIT20B

Projektarbeit Webprogrammierung – HardwareVergleich46

von Dario Neumann, Luise Frerichs, Tempest Glodowski, Marc Hoppe, Marko Jahn und Markus Simianer

Im Zuge der Vorlesung „Webprogrammierung“ soll im Rahmen einer Projektarbeit eine Webanwendung zu einem frei wählbaren Thema erstellt werden. Für das hiesige Projekt wurde sich dafür entschieden, eine Webanwendung in Form eines Onlineshops für Computerhardware umzusetzen. Mit dieser Webanwendung soll es für NutzerInnen möglich sein sich einen schnellen Überblick über verschiedene Computerhardware und neueste Techniken zu verschaffen. Ausgehend von einer Startseite, auf der eine kurze Übersicht über die Funktionalität der Webanwendung erfolgt, sollen Informationen und weiterführende Links zu ausgewählter Computerhardware abgerufen werden können. Dazu zählen beispielsweise Prozessoren, Grafikkarten und Monitore. Auf den jeweiligen Seiten dieser Hardware sollen Informationen, wie der Name, Hersteller und Preis, zu einzelnen Modellen dargestellt werden. Außerdem findet sich dort ein Link zu einem Shop, bei dem der Artikel bestellt werden kann.

Neben dem Informieren über Computerhardware soll es für NutzerInnen möglich sein mit den ShopbetreiberInnen Kontakt aufzunehmen, um beispielsweise Fragen zu Produkten zu stellen oder Feedback zum Shop zu geben. Des Weiteren sollen in einem Impressum Informationen über die ShopbetreiberInnen hinterlegt sein.

Ziel ist es nach und nach so viele Funktionen zu implementieren, so dass am Ende ein funktionsfähiger Shop für Computerhardware bereitgestellt werden kann.


## Build Container

docker build -t hardwarevergleich46-node .

## Start Container

docker run -d -p 8080:8080 hardwarevergleich46-node

## Adresse

http://localhost:8080/
