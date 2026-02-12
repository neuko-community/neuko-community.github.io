---
name: wiki-entry-from-workspace
description: Create a lore wiki entry by researching in both lore-repo and neuko-community.github.io, then writing and saving the article into this repo's wiki/entries folder, organized by type (people, locations, events, concepts, organizations, subjects, technology). Use when the user wants a new wiki article, lore entry, or documented topic. MANDATORY TRIGGERS: "create wiki entry", "add wiki article", "write a lore entry for", "document [topic] in the wiki"
---

# Wiki Entry From Workspace

You create Saint Juniper / G*BOY lore wiki entries by **pulling information from both workspaces** and **writing the article into this repository** under `wiki/entries/`, organized by entry type. This skill combines research (both repos), structure (from the lore-repo wiki-entry-generator conventions), and placement (this repo only).

**Goals (from the traditional wiki plan):** Aggregate lore from all available sources, produce encyclopedia-style articles with consistent structure and cross-references, and place them in the Neuko wiki so the site can serve them. All content must be grounded in actual documents; tone is neutral and in-universe.

**Style (B–C hybrid):** Entries are **matter-of-fact and less comprehensive**—between Report (fact-first, minimal quoted testimony) and Lore-bullet (bullet-heavy, short paragraphs). Use a **reference card** under the lead for quick-consumable facts; prefer bullets for events and lists; keep paragraphs short; trim "Theories", "In the Leaked Documents", and See Also.

---

## 1. Source Philosophy: In-Universe Knowledge

**Critical distinction:** This encyclopedia represents what **in-universe characters** (activists, researchers, The Bloc members) would know, not what ARG players watching videos would know.

### What to Include

✅ **Recovered materials from lore-drops** (logs, documents, audio recordings, staff journals, memos, experiment logs)
- These are treated as leaked or recovered documents that The Bloc obtained
- Can be cited as "materials recovered by The Bloc" or "leaked documents"
- Represent actual in-universe sources that researchers would have access to

✅ **Video content that represents in-universe events**
- Broadcasts (facility addresses, hijacked communications)
- Public announcements
- Documented incidents that would be recorded/accessible
- Must be content that exists within the story world

### What to Exclude

❌ **Video content that is meta-ARG narrative**
- Player-facing exposition that wouldn't exist as a document in-universe
- Abstract narrative sequences without clear in-world context
- Content that only makes sense as ARG puzzle pieces

### How to Determine

Ask: "Would The Bloc or other in-universe researchers have access to this information, or is this only for ARG players?" If only for players, don't use it or use it very sparingly with appropriate framing.

---

## 2. Where to find information (required — both workspaces)

You **must** search and use material from **both** of these roots when researching for an entry:

### Workspace A: lore-repo

- **lore-drops/** — Episode 1/2 loot drops: decoded .txt files, GBOY-MANIFESTO, experiment logs, staff journals, ORIGIN_THEORY, PROTOCOLS_TIER0, intake reports, surveillance logs, node logs, etc.
  - **Treatment**: These are **recovered materials** that can be cited as documents "recovered by The Bloc" or "leaked documents" - they represent in-universe sources that activists/researchers would have access to
- **videos/** — Transcripts (e.g. TheBloc, FacilityAddress, EP1 PT1/2/3, G*BOY, Roaches, The Formation).
  - **Treatment**: Exercise **discernment** - videos are ARG content for players and may not represent in-universe public knowledge. Determine if the video represents:
    - **Usable**: A broadcast, public announcement, or documented event that would be accessible in-universe (e.g., hijacked broadcasts, facility addresses)
    - **Unusable**: Meta-narrative or player-facing content that wouldn't exist as public information in-universe
- Primary for: G-304/G*BOY, Dr. Kerr, Dr. Ravel, Variable-G, Saint Juniper, Miter, Bloc members, Harmony, leaked docs, missions, escape events.

### Workspace B: neuko-community.github.io (this repo)

- **wiki/lore.md** — High-level lore overview.
- **wiki/timeline.md** — Chronological events.
- **wiki/transmissions/** — Posts and overview.
- **wiki/badges.md**, **wiki/whats-neuko.md**, **wiki/projects.md**, **wiki/community/**, and other wiki pages.
- Primary for: timeline, transmissions, badges, community, puzzles, and summary-level lore.

Do not rely on only one workspace. Cross-reference both so the entry is complete and consistent with the full Neuko story.

---

## 3. Entry types and where to save

Each entry belongs to one **type**. Save the file under `wiki/entries/<type>/<slug>.md` in **this repository** (neuko-community.github.io).

| Type | Folder | Examples |
|------|--------|----------|
| People | `entries/people/` | Dr. Kerr, Dr. Ravel, Z*L1NE, 1NK, GUMM1, Magdalena, Agent K, Erik Purdue |
| Subjects | `entries/subjects/` | G-304/G*BOY, G-312 |
| Places / Locations | `entries/locations/` | Saint Juniper Research Campus, Hill Devil State Park, Chamber 304, St. Juniper Paranormal Museum, Shinkai Metropolis |
| Events | `entries/events/` | G-304 escape, the ritual, badge distribution phases, major incidents |
| Concepts / Programs | `entries/concepts/` | Variable-G Trials, Harmony Program, Division of Gravitational Cognition, head jack, the Mindverse |
| Organizations | `entries/organizations/` | The Bloc, Miter Corporation, Nocturne Squadron |
| Technology | `entries/technology/` | Heliox sensors, Variable-G chambers, HB-Series Entrainment, inhibitor |

**Slug convention:** Identifier-preserving; spaces and punctuation → hyphens; `*` → `-` (e.g. G*BOY → `G-BOY.md`, Saint Juniper Research Campus → `Saint-Juniper-Research-Campus.md`).

---

## 4. Article structure (same as lore-repo wiki skill)

Use this structure for every entry. Adjust sections to the entry type (see Section guidelines by type below).

**Article order:** title → infobox → lead → **reference card** → sections → See Also → References → footer.

```markdown
# [Article Title]

---
**[FIELD NAME]**: [Value - select 3-5 most essential fields for this entry type]  
**[FIELD NAME]**: [Value]  
**[FIELD NAME]**: [Value]  
**[FIELD NAME]**: [Value]  

---

[1–2 sentence lead stating who/what they are and what they're known for. Write like Wikipedia opening. No restating scope or "This article covers…". Second sentence only for current status or primary significance.]

**At a glance** (or **Key facts**)

- [4–8 bullets: highest-signal facts only—who/what, affiliation, status, one-line origin, key ability or role, 1–2 standout events. No prose; phrases or short lines. See Reference card rules below.]

## Overview

[Short paragraphs (2–4 sentences) for key beats; bullets for events, traits, outcomes, lists. Fact-first: "Recovered logs show…" or "Documents state…"; paraphrase over long block quotes; quotes to one short line when they add tone.]

## [Type-appropriate sections]

[One short paragraph + bullets per section when possible. Fewer subsections; merge Background/Formation where it fits. No exhaustive tables—summarize (e.g. "Notable missions (14D–26C): [2–3 line summary]" or 3–5 bullet lines).]

## See Also

- [6–12 most relevant links](entries/type/slug.md); trim if long.

## References

1. **Source name** — Brief description with attribution
   - Example: "Internal memo recovered by The Bloc (February 11, 1994)"
   - Example: "Staff journal entry obtained by activist researchers (March 2, 1997)"
   - Example: "Leaked experiment log from Division of Gravitational Cognition"
2. …

---

*This article is part of the Saint Juniper Research Documentation Project*
```

**Infobox fields:** Use 3-5 essential fields in ALL CAPS with two spaces at end of each line. Include blank line before closing `---`. Common fields by type:

- **People**: REAL NAME, BORN, OCCUPATION, ORGANIZATION, STATUS
- **Subjects**: DESIGNATION, FACILITY, CLASSIFICATION, STATUS
- **Organizations**: INDUSTRY, ESTABLISHED, PRODUCTS, STATUS
- **Locations**: LOCATION TYPE, ESTABLISHED, OPERATOR, STATUS
- **Technology**: FULL NAME, DEVELOPER, ESTABLISHED, STATUS
- **Concepts/Programs**: MANUFACTURER (if applicable), ESTABLISHED, STATUS, key defining characteristic
- **Events**: DATE, LOCATION, PARTICIPANTS, OUTCOME

**Reference card (required):** Place directly under the lead, before the first `##` section. Purpose: quick-consumable summary so readers can stop there or continue for depth. Use 4–8 bullet points (or a compact 2-column list); phrases or short lines only—no prose. 

**Focus on PUBLIC NOTABILITY, not personal backstory.** Type-specific content:

- **People:** 
  - Founding/leadership role in organizations (with brief context of what org does)
  - Major public actions/accomplishments (broadcast hijacking, publications, operations)
  - Professional specialization (communications, research, etc.)
  - Location/dates if relevant
  - Publications or known works
  - **Example**: "Co-founded The Bloc (1999), organization investigating Miter Corporation research programs" NOT "Real name Rosaline (Rozz). From Saint Juniper; friend went missing"

- **Subjects:** 
  - Designation, facility, tier classification
  - Escape/containment status
  - Key abilities (one-line description)
  - Major incidents or significance
  - **Example**: "Subject G-304; Tier-0 prototype; escaped Saint Juniper Research Campus (2025)" NOT "152 BPM resonance; Partition region"

- **Organizations / Locations / Concepts:** 
  - What it is, core purpose
  - Who runs it or where it is located
  - One-line significance or impact
  - **Example**: "Underground activist organization investigating alleged Miter Corporation research programs" NOT "Has three founders who met at museum"

Use a small heading such as **At a glance** or **Key facts**; keep to a single block so it stays scannable.

**Links:** Use standard Markdown with **relative paths**. Since entries are nested in `entries/<type>/`, use `../` to navigate between types:
- From `entries/people/Z-L1NE.md` to another person: `[1NK](1NK.md)` (same directory)
- From `entries/people/Z-L1NE.md` to a location: `[Saint Juniper](../locations/Saint-Juniper.md)` (up one level, then into locations/)
- From `entries/subjects/G-BOY.md` to a person: `[Dr. Kerr](../people/Dr-Kerr.md)`
- From `entries/locations/Saint-Juniper.md` to an organization: `[The Bloc](../organizations/The-Bloc.md)`

Pattern: `../TYPE/filename.md` to link across types; `filename.md` to link within the same type.

---

## 5. Section guidelines by type

Follow the same logic as the lore-repo wiki-entry-generator:

### People

- **Lead paragraph**: State who they are, what they're known for, their significance. Write like Wikipedia opening.
- **At a glance**: Focus on accomplishments and public notability (see Reference card section above).
- **Overview**: Role, significance, organizational context (short paragraph + bullets for key actions).
- **Early Life**: Biographical details. Mention traumatic events objectively without narrative flourish (e.g., "experienced a traumatic incident when an acquaintance disappeared" not "a close friend went missing and it devastated her circle").
- **Career and Activism** (or **Research/Work**): Public actions, professional work, notable operations. What they did, when, with what result.
- **Controversies** (when needed): Disputed events, unverified claims. Use neutral framing:
  - "The organization claims..."
  - "Allegations remain unverified"
  - "The operation failed when..."
- **Personal Life** (when relevant): Current situation, domestic life. Brief and factual.
- **Legacy** / **Current Status**: Impact, fate, ongoing situation.
- **See Also**: 6–12 most relevant links.

### Subjects (e.g. G-304, G-312)

- **Overview**: Designation, significance (short paragraph + bullets).
- **Background**: Acquisition, classification (brief).
- **Trials and Experiments**: Summarize; 3–5 bullets for standout missions only if needed.
- **Abilities/Phenomena**: What they could do; observed effects (bullets).
- **Escape/Current Status**: One short paragraph; optional 3–5 bullet log points.
- **See Also**: 6–12 most relevant (researchers, protocols, facilities, The Bloc).

### Places / Locations

- **Overview**: Purpose, significance.
- **History**: Establishment, key periods.
- **Facilities**: Physical description.
- **Notable Events**: Major incidents.
- **Current Status**: What happened to the place.
- **See Also**: Organizations, people, experiments.

### Events

- **Overview**: What happened, when, significance.
- **Background**: Causes, context.
- **Sequence**: Key moments, timeline.
- **Aftermath**: Consequences.
- **See Also**: People, places, concepts, documents.

### Concepts / Programs

- **Overview**: What it is, purpose.
- **Background**: Origins, theory.
- **Methodology**: How it works/worked.
- **Implementation**: Applications, trials.
- **Results/Outcomes**: What was discovered or achieved.
- **See Also**: Related concepts, people, subjects.

### Organizations

- **Overview**: Role, identity.
- **History**: Formation, evolution.
- **Structure**: Leadership, divisions (if known).
- **Activities**: What they do/did.
- **Notable Operations**: Key actions or projects.
- **See Also**: Related organizations, people, locations.

### Technology

- **Overview**: Function, what it is.
- **Technical Specifications**: From documents.
- **Development**: Origins, creators.
- **Applications**: How it was used.
- **Notable Uses**: Specific experiments or incidents.
- **See Also**: Related tech, facilities, researchers.

---

## 6. Style and special sections (Encyclopedia Voice)

### 5.1 Encyclopedia Voice Principles

Write as if for **a general public audience within the Saint Juniper universe**. These are public-facing encyclopedia articles, not insider lore documentation.

**CRITICAL RULES:**

1. **No source justification** — State facts directly without explaining where information came from
   - ❌ BAD: "In documented narration, she describes experiencing..."
   - ✅ GOOD: "She experienced a traumatic incident..."
   - ❌ BAD: "According to testimony attributed to Z*L1NE..."
   - ✅ GOOD: "Z*L1NE co-founded The Bloc in 1999..."

2. **No meta-framing about documentation** — Don't reference the documentation process itself
   - ❌ BAD: "Z*L1NE serves as the primary narrator of The Bloc's origin story for new members"
   - ✅ GOOD: "Z*L1NE co-founded The Bloc with 1NK and GUMM1 in 1999"
   - ❌ BAD: "During an online session documented in November 2025..."
   - ✅ GOOD: "In November 2025, The Bloc claimed Z*L1NE was targeted..."

3. **Contextualize before assuming knowledge** — Explain what things are before diving into details
   - ❌ BAD: Lead with insider details (friend disappearing) before explaining who they are
   - ✅ GOOD: Lead with public notability (co-founded The Bloc, known for broadcast hijacking)
   - ❌ BAD: "Co-founder of The Bloc; friend went missing"
   - ✅ GOOD: "Co-founder of The Bloc, an organization investigating alleged Miter Corporation misconduct"

4. **Use appropriate sections for disputed claims** — Create Controversies or Allegations sections when needed
   - For unverified or disputed events, use neutral language:
     - "The Bloc claims..."
     - "Allegations remain unverified"
     - "No investigation was opened"
   - Place disputed/unverified claims in **Controversies** or **Allegations** sections rather than stating them as fact

5. **Personal details belong in appropriate sections**
   - **Early Life**: childhood experiences, formative events, education
   - **Personal Life**: domestic situation, relationships
   - **Career/Activism**: professional accomplishments, public actions, notable work

### 5.2 What to Infer vs. Avoid

**DO infer and include:**
- Public facts that would be known (even if derived from private conversations in lore)
- Information from recovered documents (logs, memos, staff journals, experiment reports) - cite as "materials recovered by The Bloc"
- Details from audio recordings included in lore-drops - these are treated as leaked recordings
- Approximate dates/timeframes from context (use "c. 1997" for circa)
- Professional roles from described activities
- Public outcomes of events

**DO NOT include:**
- Meta-commentary about narrating stories or recruiting members
- Information from videos that represents out-of-universe ARG content rather than in-universe accessible information
- Insider knowledge that wouldn't be public (save for Controversies section)
- Overly detailed descriptions of how documentation was recovered (brief attribution to The Bloc is acceptable)

**Examples of appropriate sourcing:**

✅ **Good - Recovered document**: "According to internal memos recovered by The Bloc, Dr. Kerr announced the Miter Corporation partnership on February 11, 1994."

✅ **Good - Leaked audio**: "Audio recordings obtained by activists reveal conversations between facility personnel regarding containment protocols."

✅ **Good - In-universe broadcast**: "A facility address broadcast announced Agent K's command of recapture operations."

❌ **Bad - ARG meta-content**: "A narrative video sequence depicts Agent K addressing Erik Purdue through abstract visual metaphors." (This is player-facing content, not an in-universe accessible document)

### 5.3 Structure and Formatting

- **Structure:** Use **bullets** for events, traits, outcomes, and lists (missions, key people). Use **short paragraphs (2–4 sentences)** only for the 2–3 most important narrative beats (e.g. escape, ritual, formation). Fewer subsections; merge Background and Formation where it fits. No exhaustive tables—summarize (e.g. "Notable missions (14D–26C): [2–3 line summary]" or 3–5 bullet lines).
- **Formatting:** `##` / `###` for sections; **bold** for key terms on first use; *italics* for document titles.
- **Tone:** Matter-of-fact, objective, neutral. Write like Wikipedia. Past tense for past events, present for current status.
- **See Also:** 6–12 most relevant links; trim if the list would be long.

### 5.4 Section Types

**Required sections (adjust by entry type):**
- **Lead paragraph**: Who/what they are, what they're known for (like Wikipedia opening)
- **At a glance**: 4–8 bullets focusing on public notability and accomplishments
- **Overview**: Brief context and significance
- **Early Life** (People): Biographical details, formative experiences mentioned objectively
- **Career/Activism** (People): Public actions, professional work, notable operations
- **Personal Life** (when relevant): Current situation, domestic life (brief and factual)
- **Controversies** (when needed): Disputed events, unverified claims, allegations with neutral framing

**Optional sections:**
- **Theories and Interpretations**: One short paragraph or 3–5 bullets; no long speculative blocks
- **Public Narrative vs. Reality**: When there's a clear discrepancy in public accounts
- **Legacy** / **Current Status**: Impact, fate, ongoing situation

### 5.5 Before/After Examples

**Example 1: Lead Paragraph**

❌ **Before (insider lore style):**
> **Z*L1NE** (Rosaline / Rozz) is a co-founder of The Bloc and its primary communications infiltrator. She has been the subject of apparent psychological operations targeting her investigation.

✅ **After (encyclopedia style):**
> **Z*L1NE** (real name **Rosaline**, commonly known as **Rozz**) is an American activist and communications security specialist. She is best known as a co-founder of The Bloc, an organization that investigates and exposes alleged corporate misconduct by the Miter Corporation's research facilities.

**Example 2: At a glance section**

❌ **Before (personal backstory focus):**
> - Co-founder of The Bloc; primary communications infiltrator.
> - Real name Rosaline (Rozz). From Saint Juniper; friend went missing at Hill Devil State Park.
> - Met 1NK and GUMM1 at St. Juniper Paranormal Museum

✅ **After (public notability focus):**
> - Co-founded The Bloc (1999), organization investigating Miter Corporation research programs
> - Specializes in communications security and network infiltration
> - Hijacked Saint Juniper Research Campus broadcast (December 2025)
> - Co-authored *G*BOY Manifesto: Sigils, Symbols, and Memetic Rebellion* (1999)
> - Based in Saint Juniper

**Example 3: Early Life section**

❌ **Before (with source justification and narrative):**
> In documented narration, she describes experiencing a formative incident during this period: a disappearance at Hill Devil State Park that affected her peer group and devastated her circle.

✅ **After (objective statement):**
> During her junior year of high school (c. 1997), she experienced a traumatic incident when an acquaintance disappeared at Hill Devil State Park under unexplained circumstances. The incident prompted her to research paranormal phenomena at the St. Juniper Paranormal Museum.

**Example 4: Handling disputed/insider information**

❌ **Before (stated as fact with meta-framing):**
> During an online session documented in November 2025, an unidentified voice addressed Z*L1NE directly with the message: "Whoever you are… stop. Just rest now…" The repetitive phrasing suggests psychological operations.

✅ **After (in Controversies section with neutral framing):**
> ### Allegations of harassment
> 
> In November 2025, The Bloc claimed that Z*L1NE had been targeted with psychological deterrence measures while conducting online research. No law enforcement investigation was opened, and the claims remain unverified.

**Example 5: Removing meta-commentary**

❌ **Before (too meta/insider):**
> Z*L1NE serves as the primary narrator of The Bloc's origin story for new members. A documented presentation to a recruit in January 2026 detailed the formation of the group.

✅ **After (public facts only):**
> Z*L1NE was one of three founding members of The Bloc, alongside 1NK and GUMM1. The organization was formed in 1999 following the discovery of what the group alleges to be illegal research operations conducted by the Miter Corporation.

---

## 7. Workflow (what you do)

1. **Research:** Search and read material from **both** lore-repo and neuko-community.github.io for the requested topic. Do not skip either workspace.
   - **Prioritize lore-drops**: Documents, logs, audio recordings - these are in-universe materials that can be directly cited
   - **Evaluate videos carefully**: Determine if content represents in-universe accessible information (broadcasts, recorded events) or meta-ARG narrative
   - **Cite appropriately**: Attribute recovered materials to The Bloc or activist researchers
2. **Classify:** Decide the entry type (people, subjects, locations, events, concepts, organizations, technology) and the slug.
3. **Write:** Draft the full article using the structure and section guidelines above. Include the **reference card** (At a glance / Key facts, 4–8 bullets) directly under the lead; apply B–C hybrid (fact-first, bullets for events/lists, short paragraphs). Use **relative paths** for cross-references: `../TYPE/filename.md` across types, `filename.md` within same type. **Include inline links** within the body text whenever you reference another entry's subject (e.g., link "Dr. Kerr" to `[Dr. Kerr](Dr-E-Kerr.md)` when mentioned in another person's entry).
4. **Save:** Write the file to **neuko-community.github.io/wiki/entries/\<type>/\<slug>.md** (this repo). Create the subfolder if it does not exist.
5. **Update existing entries (bidirectional linking):** After creating the new entry, update existing related entries to link back to it:
   - **Inline links**: Add inline markdown links in the body text where the new entry's subject is mentioned (e.g., if creating "Agent K" entry, update "Erik Purdue" entry to change "Agent K" text to `[Agent K](Agent-K.md)`)
   - **See Also sections**: Add the new entry to the See Also section of related entries using the correct relative path from their location
   - Identify which existing entries should link to the new one based on direct relationships (people who worked together, organizations they belonged to, locations they operated at, events they participated in, etc.)
   - Use proper relative paths: `../TYPE/filename.md` when linking across types, `filename.md` when linking within the same type

---

## 8. Critical reminders

1. **Both workspaces** — Every entry must be informed by lore-repo and neuko-community.github.io. Say explicitly that you searched both if the user asks.
2. **Place in this repo only** — Save to `wiki/entries/<type>/<slug>.md` under neuko-community.github.io. Do not save to lore-repo/wiki.
3. **Paths for links** — Use **relative paths** with `../` to navigate between entry types (e.g. `../people/Z-L1NE.md` from a subject file, `../locations/Saint-Juniper.md` from a people file). Within the same type, use just the filename (e.g. `1NK.md` from another people file).
4. **Bidirectional linking** — When creating a new entry, always update existing related entries to link to it. Add both inline links (in body text where the subject is mentioned) and See Also links. This creates a navigable web of interconnected articles.
5. **Stay in-universe** — Treat all sources as in-world; no ARG or fiction framing. The encyclopedia represents what in-universe characters (like The Bloc) would know, not what ARG players know.
6. **Use sources appropriately** — Base claims on actual files you found. Distinguish between:
   - **Recovered materials** (lore-drops): Can be cited as "materials recovered by The Bloc," "leaked documents," or "obtained by activist researchers" - these represent in-universe sources
   - **Audio recordings** (from lore-drops): Treat as leaked or intercepted recordings - can be cited directly
   - **Videos**: Use with discernment - only if they represent in-universe accessible information (broadcasts, announcements, documented events), not meta-ARG content
   - Cite sources in References with appropriate context (e.g., "Internal memo recovered by The Bloc (February 11, 1994)")
7. **Reference card + B–C hybrid** — Every entry must have an **At a glance** / **Key facts** block (4–8 bullets) under the lead. Prefer bullets over long prose; keep paragraphs short; trim Theories, In the Leaked Documents, and See Also (6–12 links).
8. **USE IN-WORLD DATES, NOT VIDEO RELEASE DATES** — The lore events occurred in the mid-1990s through early 2000s. Video files are named with release dates (2025-2026), but these are NOT the dates when events happened. Known in-world dates:
   - **1993**: Dr. Kerr's theoretical framework
   - **1994**: Miter partnership (February 11, 1994); Variable-G trials begin
   - **c. 1997**: Hill Devil disappearances, Z*L1NE's junior year
   - **1997**: Staff journals documenting facility operations
   - **1999**: The Bloc founded; G*BOY Manifesto published
   - **Early 2000s**: Volunteer infiltration operation, G*BOY escape (exact dates unknown)
   - If an exact date is not known from lore documents, omit the date or use "late 1990s" / "early 2000s"

---

**This skill produces wiki entries that live in the Neuko wiki app, sourced from both the lore repo and the community wiki.**
