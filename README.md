# Care Instructor

Tämä dokumentti kuvaa kuva-analyysipalvelumme kustannusrakennetta eri tarkkuustasoilla.

## Aloitus

1. Kloonaa repositorio:
```bash
git clone https://github.com/laguagu/woodnotes
cd woodnotes
```

2. Asenna riippuvuudet:
```bash
npm install
```

3. Kopioi [`.env.example`](.env.example) tiedosto nimellä `.env.local`:
```bash
cp .env.example .env.local
```

Tiedoston sisältö:
```
OPENAI_API_KEY=""
# Autentikointi ei ole käytössä koska middleware on pois käytöstä "_" prefix merkillä 
# Basic auth kovakoodattu username,password katso middleware.ts
BASIC_AUTH_USER=testuser
BASIC_AUTH_PASSWORD="testpassword"
```

4. Käynnistä kehityspalvelin:
```bash
npm run dev
```

## Julkaisu

Rakenna Docker kontti ([Dockerfile](Dockerfile))

## Tekoäly tunnistus

[app/api/visio/route.ts](app/api/visio/route.ts) vaatii OpenAI fine tuned mallin: "ft:gpt-4o-2024-08-06:personal:woodnotes-6-11-2024:AQbfjWX4".

Mallia ei voi jakaa, joten tee oma fine-tuunattu malli käyttäen [woodnotes_carpets_optimized.jsonl](woodnotes_carpets_optimized.jsonl) tiedoston datasettiä tai tee oma datasetti käyttäen [create-dataset.js](create-dataset.js) scriptiä.

Lisätietoa: https://platform.openai.com/docs/guides/fine-tuning 
(Pohja mallina toimii gpt-4o)

## Kustannukset eri tarkkuustasoilla

Olemme analysoineet kustannuksia kolmella eri tarkkuustasolla: matala (low), automaattinen (auto) ja korkea (high). Alla on erittely kustannuksista per kuva-analyysi:

| Tarkkuustaso  | Kustannus per analyysi | Suhteellinen kustannus |
| ------------- | ---------------------- | ---------------------- |
| Matala (Low)  | $0.001365              | 1x                     |
| Auto          | $0.001790              | 1.31x                  |
| Korkea (High) | $0.004845              | 3.55x                  |

## Kustannusten vertailu

- Korkea tarkkuus on noin 3.55 kertaa kalliimpi kuin matala tarkkuus
- Korkea tarkkuus on noin 2.71 kertaa kalliimpi kuin automaattinen tarkkuus
- Automaattinen tarkkuus on noin 1.31 kertaa kalliimpi kuin matala tarkkuus

## Kustannuserittely korkealla tarkkuudella

Esimerkki korkean tarkkuuden analyysista:

- Kuvan koko: 768x971 pikseliä
- Syötetokenit: 1690, kustannus $0.004225
- Tulostokenit: 62, kustannus $0.000620
- Kokonaiskustannus: $0.004845

## Arvioituja kustannuksia eri käyttömäärille (korkea tarkkuus)

| Analyysien määrä | Kustannus (USD) | Kustannus (EUR, arvio) |
| ---------------- | --------------- | ---------------------- |
| 100 / päivä      | $0.4845         | ~0,45 €                |
| 1 000 / päivä    | $4.845          | ~4,50 €                |
| 10 000 / päivä   | $48.45          | ~45,00 €               |
| 100 000 / päivä  | $484.50         | ~450,00 €              |

## Huomioita

1. Kustannukset ovat arvioita ja voivat vaihdella riippuen analysoitavien kuvien monimutkaisuudesta ja koosta.
2. Automaattinen tarkkuustaso tarjoaa hyvän tasapainon kustannusten ja analyysin tarkkuuden välillä useimmissa käyttötapauksissa.
3. Korkeaa tarkkuustasoa suositellaan käytettäväksi vain silloin, kun tarvitaan erityisen yksityiskohtaista analyysia.
4. Matala tarkkuustaso voi olla riittävä yksinkertaisille kuville tai kun nopeus ja kustannustehokkuus ovat etusijalla.

Suosittelemme testaamaan eri tarkkuustasoja oman käyttötapauksenne mukaan optimaalisen tasapainon löytämiseksi kustannusten ja analyysin laadun välillä.
