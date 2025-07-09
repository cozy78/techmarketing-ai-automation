# 🚀 TechMarketing AI - B2B Marketing Automation Platform

Eine KI-gestützte Marketing-Automatisierungsplattform, die technische Produktdaten in überzeugende Marketing-Inhalte verwandelt und nahtlos mit Make.com, HubSpot und Google Workspace integriert.

## UI Screenshot

![TechMarketingUI](<Screenshot 2025-07-09 151757.png>)

---

## 📋 Inhaltsverzeichnis

* Überblick
* Features
* Live Demo
* Verwendung
* Technologie-Stack
* Roadmap

---

## 🎯 Überblick

**TechMarketing AI** ist eine All-in-One Marketing-Automatisierungsplattform speziell für B2B-Unternehmen im technischen Bereich. Die Plattform nutzt KI (simuliert, ohne API), um aus technischen Produktbeschreibungen zielgruppengerechte Marketing-Inhalte zu generieren und automatisiert Lead-Scoring, E-Mail-Kampagnen und Social Media Posts.

### Kernfunktionen:

* **Content Generator**: Verwandelt technische Specs in Marketing-Copy
* **Lead Scoring**: Automatische Bewertung von Leads (0–100 Punkte)
* **E-Mail Optimizer**: Personalisierte E-Mail-Kampagnen
* **Social Media Suite**: Multi-Platform Content-Erstellung

---

## ✨ Features

### 1. Content Generator

* Generiert zielgruppenspezifische Marketing-Texte
* Anpassbare Tonalität und Dringlichkeit
* Branchen-spezifische Optimierung
* Lead-Capture Modal für E-Mail-Versand des generierten Contents als PDF

![ContentGeneratorUI](<Screenshot 2025-07-09 160729.png>)
![LeadCaptureModalUI](<Screenshot 2025-07-09 152301.png>)
![MakeAuto](<Screenshot 2025-07-09 152512.png>)
![SamplePDF](<Screenshot 2025-07-09 161724.png>)

### 2. Lead Scoring

* Automatische Bewertung basierend auf:

  * Unternehmensgröße
  * Website-Verhalten
  * E-Mail-Engagement
* Hot/Warm/Cold Lead Kategorisierung
* HubSpot CRM Integration
* Automatischer Erstkontakt via Mail in der passenden Tonalität

![LeadScoringUI](<Screenshot 2025-07-09 151846.png>)
![CalculatedScore](<Screenshot 2025-07-09 151926.png>)
![MakeAuto](<Screenshot 2025-07-09 151958.png>)
![HubspotListLogic](<Screenshot 2025-07-09 152120.png>)
![EMailSend](<Screenshot 2025-07-09 152209.png>)

### 3. E-Mail Optimizer

* Customer Journey basierte Personalisierung
* (A/B-Test Varianten) --> Version 2.0
* Rollen-basierte Inhalte
* (Automatischer E-Mail-Versand via Gmail) --> Version 2.0

![EMailOptimizerUI](<Screenshot 2025-07-09 152651.png>)

### 4. Social Media Suite

* Multi-Platform Content (LinkedIn, Twitter/X, Facebook)
* Content-Ziel Optimierung
* Plattform-spezifische Formatierung
* Bessere Features --> Version 2.0

![SuiteUI](<Screenshot 2025-07-09 152726.png>)

---

## 🌐 Live Demo

**Demo ansehen:** *(Optionaler Link)*

**Zugangsdaten:**

* Keine Anmeldung erforderlich
* Alle Features frei zugänglich (Demo-Modus ohne GPT-API)

---

### Make.com Szenario Setup: Lead Scoring Automation

**Szenario-Struktur:**

* Webhook → Empfängt Lead-Daten
* HubSpot CRM → Erstellt/Updated Kontakt in passende Liste
* Router → Verteilt nach Lead-Score
* Gmail → Sendet angepasste E-Mails

![MakeAuto](<Screenshot 2025-07-09 151958-1.png>)

### Content Generation + E-Mail

**Szenario-Struktur:**

* Webhook → Empfängt Content-Daten
* Google Docs → Erstellt Dokument
* Google Drive → Teilt Dokument → PDF wird generiert
* Gmail → Sendet E-Mail mit PDF im Anhang

![MakeAuto](<Screenshot 2025-07-09 152512-1.png>)

### Google Workspace Verbindung

1. Client-ID via Google Auth Platform
2. Apis hinzufügen (Docs/Mail/Drive)
3. Autorisiere Zugriff auf:

   * Google Docs (Dokumente erstellen)
   * Google Drive (Berechtigungen)
   * Gmail (E-Mails senden)

4. Autorisierte Weiterleitungs-URIs
5. Client-ID & Schlüssel in Make einfügen


### HubSpot Integration

1. HubSpot API Key generieren
2. In Make.com HubSpot-Modul konfigurieren
3. Feld-Mapping einrichten:

   * Email → Contact Email
   * Company → Company Name
   * Score → Lead Score (Custom Property)
   * Priority → Lead Status
   * Quelle → Lead Source

---

## 📱 Verwendung

### Content Generator

1. Produktbeschreibung eingeben

   * Technische Details, Features, Spezifikationen
2. Parameter auswählen

   * Zielgruppe, Branche, Tonalität, Fokus-Metrik
3. Content generieren → KI simuliert Marketing-Text
4. Lead-Capture Modal erscheint

### E-Mail-Versand

* Name und E-Mail eingeben
* Content wird als Google Doc gespeichert → PDF wird generiert
* E-Mail mit PDF wird versendet

### Lead Scoring Workflow

1. Lead-Daten eingeben (E-Mail, Firmengröße, Aktivität)
2. Score berechnen → Automatische Punktevergabe + Kategorie
3. Automation: HubSpot-Kontakt wird erstellt + E-Mail-Versand gestartet

## 🔧 Technologie-Stack

| Bereich    | Technologie                      |
| ---------- | -------------------------------- |
| Frontend   | Vanilla JavaScript, HTML5, CSS3  |
| UI         | Custom CSS, Gradient-Design      |
| Automation | Make.com (Webhooks, Gmail, Docs) |
| CRM        | HubSpot                          |
| Dokumente  | Google Docs API                  |
| E-Mail     | Gmail API                        |

---

📊 Anwendungsfälle
🔧 B2B-Technologieunternehmen
Produkt-Launch-Kampagnen
→ Automatisierte Inhaltserstellung für neue technische Produkte

Lead-Qualifizierung
→ Intelligentes Scoring zur Vertriebspriorisierung

Multi-Channel-Marketing
→ Konsistente Kommunikation über alle Plattformen hinweg

🏭 Industrielle Fertigung
Technische Dokumentation
→ Komplexe Produktspezifikationen in verständliche Marketing-Texte umgewandelt

Kundensegmentierung
→ Automatisches Routing basierend auf Unternehmensprofilen

Messe-Nachbereitung
→ Personalisierte E-Mail-Sequenzen nach Events

🧑‍💼 Professionelle Dienstleistungen
Thought Leadership
→ Branchenwissen in überzeugende Social-Media-Beiträge verwandeln

Kundengewinnung
→ Automatisierte Nurturing-Kampagnen zur Leadpflege

Angebotsgenerierung
→ Individuelle Inhalte für Angebote und Pitch-Dokumente

🧠 Intelligenter Lead Scoring Algorithmus

Multifaktor-Analyse
→ Unternehmensgröße, Engagement-Historie, Verhaltensdaten

Dynamisches Scoring
→ Echtzeit-Updates basierend auf Nutzerinteraktionen

Prädiktive Einblicke
→ Prognosen zur Conversion-Wahrscheinlichkeit

Automatisierte Aktionen
→ Workflow-Ausführung auf Basis von Triggern

✍️ KI-gestützte Content-Adaption

Kontextabhängige Generierung
→ Branchen- und zielgruppenspezifische Optimierung

Tonalitäts-Anpassung
→ z. B. professionell, innovativ oder vertrauenswürdig

Formatoptimierung
→ Anpassung an Plattform-Limits und Best Practices

🔧 No-Code-Automationsbrücke

Visueller Workflow-Builder
→ Make.com-Integration für nicht-technische Nutzer

API-First-Architektur
→ Einfache Anbindung an bestehende Marketing-Stacks

Echtzeit-Synchronisation
→ Sofortiger Datenfluss zwischen allen Systemen


## 🗺️ Roadmap

**Version 2.0 geplant:**

* ✅ (OpenAI API Integration für echte KI-Texte)
* ✅ A/B Testing Dashboard
* ✅ Analytics Dashboard

---

Thank you for reading❤️

