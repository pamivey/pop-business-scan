# Profitable on Purpose Business Scan

A standalone, static assessment site: *"What's Getting Between You and More Profit?"*

10 questions → a primary and secondary profit constraint (Pricing, Capacity, Focus,
Financial Clarity, or Decision-Making) → a personalized result page → a call to
action into Profitable on Purpose.

Built with plain HTML, CSS and JavaScript. No build step, no dependencies, no
database. Works as-is on GitHub Pages.

```
/index.html
/css/style.css
/js/app.js
/assets/pop-logo.jpg
/README.md
```

---

## 1. Replace the POP logo

The header currently uses `/assets/pop-logo.jpg` (the wordmark you supplied).

To swap it:
1. Drop your new file into `/assets/`.
2. In `index.html`, update every `src="assets/pop-logo.jpg"` (there are three:
   the header logo, the Open Graph image, and the favicon placeholder) to your
   new filename.
3. If your new logo has a transparent background, PNG is a better format than
   JPG — a transparent PNG will look correct on both the white header and any
   colored section you might add later.

## 2. Change brand colours

All colour is controlled from CSS variables at the top of `css/style.css`:

```css
:root {
  --pop-black: #1a1a1a;
  --pop-white: #ffffff;
  --pop-accent: #ec177c;      /* POP brand pink */
  --pop-accent-deep: #b8115f; /* darker shade of the pink, used on hover only */
  --pop-secondary: #1a1a1a;   /* reserved — set this if a second brand colour is confirmed */
  --pop-muted: #6b6b6b;
  --pop-border: #e4e0da;
  --pop-bg-soft: #faf9f7;
}
```

Change a value once here and it updates everywhere that variable is used
(buttons, progress bar, chart bars, links, etc.). `--pop-secondary` is wired
into the token system but not yet used anywhere visually — it's there so you
can introduce a second brand colour later without restructuring the CSS.

## 3. Change the CTA and destination URLs

Open `js/app.js` and edit the `CONFIG` block at the very top:

```js
const CONFIG = {
  POP_EVENT_URL: "https://www.viwconnect.com/event-details/profitable-on-purpose-connect-conference",
  POP_INFO_URL: "https://thepopbusiness.com",
  SITE_URL: "https://thepopbusiness.github.io/business-scan/"
};
```

- **POP_EVENT_URL** — where the "Bring My Result to POP" button on the result
  page goes.
- **POP_INFO_URL** — where the "Learn more about Profitable on Purpose" text
  link goes.
- **SITE_URL** — the public URL of this scan once it's live. This is only used
  to build the text people copy or share when they hit "Share My Result" —
  update it once you know your final GitHub Pages (or custom domain) URL.

## 4. Edit the questions

Also in `js/app.js`, in the `QUESTIONS` array. Each question looks like this:

```js
{
  id: "q1",
  category: "pricing",
  text: "When a prospective client pushes back on your price, what usually happens next?",
  answers: [
    { text: "...", points: { pricing: 0 } },
    { text: "...", points: { pricing: 1 } },
    { text: "...", points: { pricing: 2 } },
    { text: "...", points: { pricing: 3, focus: 1 } }
  ]
}
```

- `category` is just a label for your own reference; scoring only looks at
  each answer's `points`.
- `points` can award points to more than one category (see the last answer
  above — it's a pricing issue, but it also nudges the focus score, because
  chasing every deal that pushes back also eats attention). This overlap is
  intentional; real constraints interact with each other.
- Keep exactly 4 answers per question, and keep them in increasing order of
  severity (least constrained → most constrained) — the UI doesn't enforce
  this order, but the copy will read oddly if you don't.
- You can add, remove or reorder questions freely. The progress bar
  ("Question X of 10") and the result chart both read the question count and
  scoring ceiling automatically from this array — nothing else needs updating.

## 5. Edit the result copy

Also in `js/app.js`, in the `RESULTS` object — one entry per category
(`pricing`, `capacity`, `focus`, `financialClarity`, `decisionMaking`). Each
entry has `label`, `explanation`, `symptoms` (an array of 3), `why`,
`nextMove`, and `question`.

The `SECONDARY_INTERACTIONS` object just below it holds the one or two
sentences used in the "Also worth watching" section — one per category,
written so it can follow any primary result. `{primary}` gets swapped for
the actual primary result's label at render time.

## 6. Adjusting scoring

Scoring logic lives in `js/app.js` under **PART 4: APPLICATION LOGIC** and
does not normally need editing — it reads everything from `QUESTIONS` above
it. Two functions matter if you do want to change the mechanics:

- `calculateScores()` — sums each answer's `points` into a total per
  category.
- `determinePrimaryAndSecondary()` — ranks categories by score, and breaks
  ties first by how many "high severity" (3-point) answers a category
  picked up, then by a fixed fallback order (`CATEGORY_ORDER`, near the top
  of the file). This guarantees the scan can never return an empty or
  ambiguous result, even if someone picks the mildest answer to every
  question.

This logic has been tested against all 1,048,576 possible ways to answer the
10 questions — every path produces a valid, distinct primary and secondary
result.

## 7. Uploading to GitHub

1. Create a new repository on GitHub (public, since GitHub Pages on a free
   plan requires a public repo unless you're on GitHub Pro/Team).
2. Upload all the files in this folder, keeping the folder structure intact
   (`css/`, `js/`, `assets/` as subfolders — don't flatten them).
3. Commit to the `main` branch.

## 8. Enabling GitHub Pages

1. In the repository, go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to "Deploy from a branch".
3. Set **Branch** to `main` and the folder to `/ (root)`.
4. Save. GitHub will give you a URL like
   `https://yourusername.github.io/your-repo-name/` — it can take a minute
   or two to go live the first time.
5. Paste that URL into `SITE_URL` in `js/app.js` (see step 3 above) and
   re-upload the file so the share text points to the right place.

All asset paths in this project are relative (`css/style.css`,
`assets/pop-logo.jpg`, etc.), so it will work correctly whether it's hosted
at the root of a domain or inside a repository subdirectory — no path
changes needed either way.

## 9. Connecting a custom domain later

If you want the scan at something like `scan.thepopbusiness.com`:

1. In **Settings → Pages**, enter the custom domain and save — GitHub will
   create a `CNAME` file in your repo automatically.
2. At your domain registrar (or wherever `thepopbusiness.com`'s DNS is
   managed), add a `CNAME` record pointing the subdomain (e.g. `scan`) to
   `yourusername.github.io`.
3. Update `SITE_URL` in `js/app.js` to the new custom domain once it's
   working.

## 10. Testing before you publish

- Open `index.html` directly in a browser first (double-click it, or use a
  simple local server) to click through the whole flow: start → all 10
  questions → back-and-forth navigation → result → share → retake.
- Confirm the **Back** button preserves previously selected answers.
- Confirm **Continue** stays disabled until an answer is chosen (no
  skipping).
- Try at least one path through each of the five results to proof-read the
  copy in context.
- Check the browser console for errors (right-click → Inspect → Console).
- Resize the browser window (or use device toolbar) to check roughly
  375px, 768px and 1440px wide.
- Test "Share My Result" — on a phone or a browser that supports the Web
  Share API you'll get the native share sheet; elsewhere it copies text to
  your clipboard and shows a confirmation.

---

## Analytics

`index.html` has a commented placeholder near the top of `<head>` for a
Google Analytics (or similar) snippet. The app already calls a single
`trackEvent(name, payload)` function throughout — `scan_started`,
`question_answered`, `scan_completed`, `result_pricing`, `result_capacity`,
`result_focus`, `result_financial_clarity`, `result_decision_making`,
`pop_cta_clicked`, and `result_shared`. Right now `trackEvent()` just logs to
the console. Once you install a real analytics script, edit that one
function (bottom of `js/app.js`) to forward events to it.

## SEO / social sharing

Title, meta description, Open Graph and Twitter/X card tags are already set
in `index.html`. The Open Graph and Twitter image tags currently point at
the logo file as a placeholder — swap in a proper 1200×630px social image
before launch for the best-looking link previews, and add a real favicon
file in place of the logo placeholder.

---

## How the scoring works, in plain terms

Every answer quietly adds points to one or two of the five constraint
categories. After the 10th question, the app adds everything up, and
whichever category has the highest total becomes the **primary** result —
the second-highest becomes the **secondary** result, shown as "Also worth
watching." Ties are broken deterministically (see section 6), so the scan
never gets stuck or returns something ambiguous.

## Strategic and usability decisions worth flagging

- **Overlap by design.** Several answers award points to more than one
  category (for example, always chasing discounts to close a sale scores
  against pricing, but also nudges the focus score). This reflects the
  brief's instruction that business issues are interconnected, but it does
  mean a respondent's secondary result is sometimes driven as much by
  spillover from other questions as by the two questions written for that
  category directly. Worth knowing if you're fine-tuning scores later.
- **The chart's scale is relative, not absolute.** Each bar is scaled
  against the maximum score *that specific category* could reach given the
  current question set — not a shared fixed ceiling — so bars stay
  meaningful even though categories don't all have the same number of
  scoring paths feeding into them (Decision-Making, for instance, quietly
  picks up small overlap points from several other questions, so it has a
  higher ceiling than Pricing). If you add or edit questions, this scaling
  recalculates on its own.
- **Auto-advance was intentionally left out.** The brief allowed either
  auto-advance or a Continue button; a visible **Continue** button was used
  instead, so a respondent always has a clear moment to change their mind
  before moving on, rather than the choice locking in the instant they tap
  it.
- **No email opt-in gate**, per the brief — the result is shown immediately
  and the transition into POP happens after the value has already been
  delivered.
- **Result labels use the same five names throughout** ("Pricing",
  "Capacity", "Focus", "Financial Clarity", "Decision-Making") in the
  headline, the chart, the "also worth watching" line and the analytics
  event names, so nothing needs re-mapping if you rename a category later —
  do it once in `RESULTS[key].label`.
