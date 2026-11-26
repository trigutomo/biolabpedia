# Graph Report - biolabpedia  (2026-11-25)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 135 nodes · 109 edges · 47 communities (7 shown, 40 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.85)
- Token cost: 972 input · 600 output

## Community Hubs (Navigation)
- Astro Content Collections
- YAML Processing Scripts
- Project Configuration
- Page Layouts and Templates
- NPM Build Scripts
- TypeScript Configuration
- File System Utilities
- Link Validation
- Hotplate Stirrer Guides
- Micropipette Troubleshooting
- Lab Consumables Selection
- Serological Pipette Usage
- Lab Cleaning and Safety
- Aseptic Laboratory Techniques
- Content Configuration
- 1000 µL Filter Tips
- 100 µL Filter Tips
- 10 µL Filter Tips Rack
- 100 µL Filter Tips Rack
- 200 µL Filter Tips Rack
- Pipette Tip Selection
- Contamination Control
- Solution Preparation Troubleshooting
- Centrifuge Troubleshooting
- Microcentrifuge Tube Guide
- 1.5 mL Microcentrifuge Tubes
- 0.1-2.5 µL Micropipettes
- 0.5-10 µL Micropipettes
- 1000-5000 µL Micropipettes
- 100-1000 µL Micropipettes
- 10-100 µL Micropipettes
- 20-200 µL Micropipettes
- 2-20 µL Micropipettes
- Electrophoresis Equipment
- Parafilm Lab Sealing
- Lab Equipment Maintenance
- 10 µL Pipette Tips
- 1000 µL Blue Tips
- 200 µL Yellow Tips
- Serological Pipette Principles
- 10 mL Serological Pipettes
- Microscope Slide Storage
- Microscope Slide Preparation
- Buffer Preparation Techniques
- Centrifugation Basics
- Vortex Mixer Models
- Vortex Mixer Operation

## God Nodes (most connected - your core abstractions)
1. `scripts` - 6 edges
2. `PILLAR_LIST` - 4 edges
3. `astro` - 4 edges
4. `walk()` - 3 edges
5. `astro@^5.13.5` - 2 edges
6. `Hotplate stirrer: memilih, mengoperasikan, dan memelihara` - 2 edges
7. `Kesalahan umum pipetting dan cara mengatasinya` - 2 edges
8. `Props` - 1 edges
9. `Props` - 1 edges
10. `articles` - 1 edges

## Surprising Connections (you probably didn't know these)
- `Filter tips bag 10 µL` --references--> `Memilih dan memahami bahan habis pakai`  [EXTRACTED]
  src/content/articles/filter-tips-bag-10.md → README.md
- `Serological pipette 5 mL steril` --references--> `Panduan penggunaan`  [EXTRACTED]
  src/content/articles/serological-pipette-5-steril.md → README.md
- `Decon 90 pembersih laboratorium` --references--> `Perawatan, penyimpanan, dan keselamatan`  [EXTRACTED]
  src/content/articles/decon-90-pembersih.md → README.md
- `Teknik aseptik dasar di laboratorium` --references--> `Teknik dasar laboratorium`  [EXTRACTED]
  src/content/articles/teknik-aseptik.md → README.md
- `Filter tips bag 1000 µL` --semantically_similar_to--> `Filter tips rack 1000 µL`  [INFERRED] [semantically similar]
  src/content/articles/filter-tips-bag-1000.md → src/content/articles/filter-tips-rack-1000.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Solution and Buffer Preparation Flow** — src_content_articles_teknik_larutan_buffer, src_content_articles_mengatasi_kesalahan_larutan, src_content_articles_hotplate_stirrer_panduan, src_content_articles_vortex_mixer_penggunaan [INFERRED 0.85]
- **Centrifugation Workflow** — src_content_articles_teknik_sentrifus, src_content_articles_mengatasi_masalah_sentrifus, src_content_articles_microcentrifuge_tubes [INFERRED 0.90]
- **Pipetting Knowledge Ecosystem** — src_content_articles_micropipette_dasar, src_content_articles_kesalahan_umum_pipetting, src_content_articles_memilih_pipette_tips, src_content_articles_filter_tips_rack_10, src_content_articles_filter_tips_rack_100, src_content_articles_filter_tips_rack_1000, src_content_articles_filter_tips_rack_200 [INFERRED 0.90]

## Communities (47 total, 40 thin omitted)

### Community 0 - "Astro Content Collections"
Cohesion: 0.11
Nodes (12): Props, articles, collections, PILLAR_LIST, pillars, pillar, related, articles (+4 more)

### Community 1 - "YAML Processing Scripts"
Cohesion: 0.11
Nodes (12): fs, yaml, fs, yaml, fs, fs, yaml, fs (+4 more)

### Community 2 - "Project Configuration"
Cohesion: 0.22
Nodes (8): dependencies, astro@^5.13.5, description, name, private, type, version, astro

### Community 4 - "NPM Build Scripts"
Cohesion: 0.33
Nodes (6): scripts, astro, build, build:file, dev, preview

### Community 5 - "TypeScript Configuration"
Cohesion: 0.40
Nodes (4): astro/tsconfigs/strict, exclude, extends, include

### Community 8 - "Hotplate Stirrer Guides"
Cohesion: 0.67
Nodes (3): Kenali alat laboratorium, Hotplate stirrer: memilih, mengoperasikan, dan memelihara, Hotplate stirrer Thermo Cimarec+

### Community 9 - "Micropipette Troubleshooting"
Cohesion: 0.67
Nodes (3): Pemecahan masalah dan kesalahan umum, Kesalahan umum pipetting dan cara mengatasinya, Micropipette: cara kerja, jenis, dan penggunaan dasar

## Knowledge Gaps
- **48 isolated node(s):** `astro/tsconfigs/strict`, `Memilih dan memahami bahan habis pakai`, `Filter tips bag 10 µL`, `Panduan penggunaan`, `Serological pipette 5 mL steril` (+43 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 106 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `astro` connect `Project Configuration` to `Astro Content Collections`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **What connects `astro/tsconfigs/strict`, `Memilih dan memahami bahan habis pakai`, `Filter tips bag 10 µL` to the rest of the system?**
  _48 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Astro Content Collections` be split into smaller, more focused modules?**
  _Cohesion score 0.10507246376811594 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `NPM Build Scripts` to `Project Configuration`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Should `YAML Processing Scripts` be split into smaller, more focused modules?**
  _Cohesion score 0.10822510822510822 - nodes in this community are weakly interconnected._
- **Why does `PILLAR_LIST` connect `Astro Content Collections` to `Page Layouts and Templates`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._