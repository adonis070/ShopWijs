# ShopWijs

ShopWijs is een React-webapplicatie waarmee gebruikers producten kunnen bekijken, zoeken, filteren, sorteren en vergelijken. Ingelogde gebruikers kunnen producten bewaren in een persoonlijke favorietenlijst.

Dit project is gemaakt voor de Frontend-eindopdracht van NOVI Hogeschool. Het functioneel ontwerp maakt geen deel uit van deze repository.

## Gebruikte techniek

- React met JavaScript en Vite
- React Router voor de navigatie
- Zelfgeschreven CSS met Flexbox
- [Fake Store API](https://fakestoreapi.com) voor producten en categorieën
- NOVI Dynamic API voor registratie, inloggen en favorieten
- React Context voor de inlogstatus en de favorieten

## Installatie

Benodigd: [Node.js](https://nodejs.org) (versie 20 of hoger) en npm.

1. Installeer de afhankelijkheden:

   ```bash
   npm install
   ```

2. Maak een `.env`-bestand aan op basis van het voorbeeld:

   ```bash
   cp .env.example .env
   ```

   Op Windows (PowerShell): `Copy-Item .env.example .env`

   Vul in `.env` bij `VITE_NOVI_PROJECT_ID` het project-ID in dat je van de NOVI Dynamic API hebt ontvangen. Zonder project-ID werken registreren en inloggen niet.

3. Start de ontwikkelserver:

   ```bash
   npm run dev
   ```

4. Open http://localhost:5173.

De NOVI Dynamic API accepteert alleen requests vanaf `localhost:5173` (of `3000`). Daarom draait de ontwikkelserver vast op poort 5173. Is die poort al in gebruik, dan stopt Vite met een foutmelding; sluit dan eerst de andere server af.

## Beschikbare scripts

| Script            | Omschrijving                                      |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Start de ontwikkelserver                          |
| `npm run build`   | Maakt een productiebuild in de map `dist`         |
| `npm run preview` | Bekijkt de productiebuild lokaal                  |
| `npm run lint`    | Controleert de code met ESLint                    |

## Projectstructuur

```
src/
├── components/   Herbruikbare componenten (Navbar, Footer, ProductCard, ...)
├── context/      React Context voor inlogstatus en favorieten (AuthProvider, FavoritesProvider)
├── pages/        Pagina's die aan een route gekoppeld zijn
├── services/     API-aanroepen
├── styles/       CSS-bestanden
├── utils/        Hulpfuncties (notatie, zoeken, filteren en sorteren)
├── App.jsx       Routes en vaste opmaak
└── main.jsx      Startpunt van de applicatie
```

## Pagina's

| Route            | Pagina                         | Status       |
| ---------------- | ------------------------------ | ------------ |
| `/`              | Homepage / productoverzicht    | Klaar        |
| `/producten/:id` | Productdetailpagina            | Klaar        |
| `/producten`     | Zoek-, filter- en sorteerpagina | Klaar       |
| `/favorieten`    | Favorietenpagina (beveiligd)   | Klaar        |
| `/inloggen`      | Inlog- en registratiepagina    | Klaar        |
| `/vergelijken`   | Productvergelijking            | Klaar        |

## Zoeken, filteren en sorteren

Op de pagina `/producten` kun je:

- zoeken op productnaam (direct tijdens het typen, hoofdletterongevoelig);
- filteren op categorie;
- sorteren op prijs, van laag naar hoog of van hoog naar laag.

Deze keuzes werken tegelijk. De gekozen categorie en sortering staan in de URL, bijvoorbeeld `/producten?categorie=electronics&sortering=prijs-oplopend`. Daardoor openen de categorieknoppen op de homepage direct een gefilterd overzicht. Met de knop **Alles wissen** zet je alle keuzes in één keer terug.

## Producten vergelijken

Op de pagina `/vergelijken` kies je met twee keuzelijsten twee producten. Na een klik op **Vergelijken** staan afbeelding, titel, prijs, categorie, beoordeling en beschrijving naast elkaar in een tabel. De laagste prijs en de hoogste beoordeling krijgen een groen label.

- Een gekozen product vervang je via de keuzelijst; de vergelijking werkt direct bij.
- Het product dat in de andere keuzelijst is gekozen, kun je niet nog eens kiezen.
- Met minder dan twee gekozen producten verschijnt de melding om twee producten te selecteren.

De productgegevens komen uit de Fake Store API; voor de vergelijking is geen account nodig.

## Registreren en inloggen

Op de pagina `/inloggen` staan twee tabbladen:

- **Registreren** maakt een account aan via `POST /api/users` van de NOVI Dynamic API. Nieuwe accounts krijgen de rol `user`.
- **Inloggen** gebruikt `POST /api/login`. De API geeft een JWT-token terug, die een uur geldig is.

De inlogstatus staat in een React Context (`AuthProvider`) en blijft bewaard in `localStorage`, zodat je ingelogd blijft na het herladen van de pagina. Verloopt de token, dan word je automatisch uitgelogd. Uitloggen verwijdert alleen de token; daarvoor is geen API-aanroep nodig.

De favorietenpagina is beveiligd. Ben je niet ingelogd, dan ga je eerst naar het inlogformulier en daarna terug naar de pagina die je wilde bekijken.

## Favorieten

Ingelogde gebruikers bewaren producten met de knop **Toevoegen aan favorieten** op de productdetailpagina. Een bewaard product toont een gevuld hart. Op de pagina `/favorieten` staan de eigen favorieten, met een knop om ze te verwijderen.

De favorieten staan in de NOVI-collectie `favorites` met de velden `id`, `userId` en `productId`:

| Actie | Request |
| ----- | ------- |
| Eigen favorieten ophalen | `GET /api/users/{userId}/favorites` |
| Toevoegen | `POST /api/favorites` met `{ "userId": 1, "productId": 5 }` |
| Verwijderen | `DELETE /api/favorites/{id}` |

Alle requests sturen de JWT-token mee (`Authorization: Bearer ...`). Het gebruikers-ID komt uit de claim `userId` van die token. Een product dat al bewaard is, wordt niet nog eens toegevoegd. Afbeelding, titel en prijs van de producten komen uit de Fake Store API.

Elke request naar de NOVI API stuurt de header `novi-education-project-id` mee. De NOVI-database is een leeromgeving die dagelijks wordt geleegd: gebruik alleen testgegevens, geen echte persoonsgegevens.
