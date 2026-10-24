# ShopWijs

ShopWijs is een React-webapplicatie waarmee gebruikers producten kunnen bekijken, zoeken, filteren, sorteren en vergelijken. Ingelogde gebruikers kunnen producten bewaren in een persoonlijke favorietenlijst.

Dit project is gemaakt voor de Frontend-eindopdracht van NOVI Hogeschool. Het functioneel ontwerp staat in de map [`docs`](docs).

## Gebruikte techniek

- React met JavaScript en Vite
- React Router voor de navigatie
- Zelfgeschreven CSS met Flexbox
- [Fake Store API](https://fakestoreapi.com) voor producten en categorieën
- NOVI Dynamic API voor registratie, inloggen en favorieten (volgt in een latere fase)

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

3. Start de ontwikkelserver:

   ```bash
   npm run dev
   ```

4. Open de URL die in de terminal verschijnt (standaard http://localhost:5173).

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
├── context/      React Context voor authenticatie (volgt later)
├── pages/        Pagina's die aan een route gekoppeld zijn
├── services/     API-aanroepen
├── styles/       CSS-bestanden
├── utils/        Hulpfuncties (prijs- en categorienotatie)
├── App.jsx       Routes en vaste opmaak
└── main.jsx      Startpunt van de applicatie
```

## Pagina's

| Route            | Pagina                         | Status       |
| ---------------- | ------------------------------ | ------------ |
| `/`              | Homepage / productoverzicht    | Klaar        |
| `/producten/:id` | Productdetailpagina            | Klaar        |
| `/producten`     | Zoek-, filter- en sorteerpagina | Placeholder |
| `/favorieten`    | Favorietenpagina               | Placeholder  |
| `/inloggen`      | Inlog- en registratiepagina    | Placeholder  |
| `/vergelijken`   | Productvergelijking            | Placeholder  |
