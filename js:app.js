/* =========================================================================
   PROFITABLE ON PURPOSE BUSINESS SCAN
   =========================================================================
   This file is organized in five parts. You should rarely need to touch
   anything below "PART 4: APPLICATION LOGIC" — that part reads its content
   from the objects above it.

   PART 1: CONFIG            — URLs you will want to change
   PART 2: QUESTIONS         — the 10 scored questions
   PART 3: RESULTS COPY      — the five result write-ups
   PART 4: APPLICATION LOGIC — navigation, scoring, rendering (rarely edited)
   PART 5: ANALYTICS HOOKS   — event functions, ready for a real service
   ========================================================================= */


/* =========================================================================
   PART 1: CONFIG
   Replace these three values, then everything else updates automatically.
   ========================================================================= */

const CONFIG = {
  // Where "Bring My Result to POP" and the primary CTA button should point.
  // Replace with your live registration or landing page URL.
  POP_EVENT_URL: "https://www.viwconnect.com/event-details/profitable-on-purpose-connect-conference",

  // Where "Learn More About Profitable on Purpose" should point.
  POP_INFO_URL: "https://thepopbusiness.com",

  // The public URL where this scan will live once published on GitHub Pages.
  // Used only to build the text that gets shared/copied. Update this once
  // you know your final GitHub Pages (or custom domain) URL.
  SITE_URL: "https://thepopbusiness.github.io/business-scan/"
};


/* =========================================================================
   PART 2: QUESTIONS
   Each question has 4 answers. Each answer awards points to one or more
   of the five categories:
     pricing | capacity | focus | financialClarity | decisionMaking
   Overlap is intentional — real business constraints interact with each
   other, so an answer is allowed to nudge a second category as well as
   its primary one.
   ========================================================================= */

const QUESTIONS = [
  {
    id: "q1",
    category: "pricing",
    text: "When a prospective client pushes back on your price, what usually happens next?",
    answers: [
      { text: "I hold the number. It's built on what the work is actually worth.", points: { pricing: 0 } },
      { text: "I explain the value again until they come around.", points: { pricing: 1 } },
      { text: "I make a small concession to keep the conversation moving.", points: { pricing: 2 } },
      { text: "I usually adjust the price, or add something extra, to close the deal.", points: { pricing: 3, focus: 1 } }
    ]
  },
  {
    id: "q2",
    category: "pricing",
    text: "Think back to how you landed on what you currently charge for your main offer. What actually drove that number?",
    answers: [
      { text: "A calculation — my costs, target margin and the value delivered.", points: { pricing: 0 } },
      { text: "A look at what other people in my space charge.", points: { pricing: 2 } },
      { text: "A starting number that I've nudged up a little over time.", points: { pricing: 2 } },
      { text: "Honestly, a price I set early on that hasn't been revisited since.", points: { pricing: 3, decisionMaking: 1 } }
    ]
  },
  {
    id: "q3",
    category: "capacity",
    text: "Picture your best month ever — 30% more sales than usual. What actually happens inside the business?",
    answers: [
      { text: "Margins hold. My systems and team absorb it well.", points: { capacity: 0 } },
      { text: "It's tight for a few weeks, but it's manageable.", points: { capacity: 1 } },
      { text: "I end up covering the gap myself — nights, weekends, whatever it takes.", points: { capacity: 2, focus: 1 } },
      { text: "I'd likely have to turn some of it away or push out delivery.", points: { capacity: 3 } }
    ]
  },
  {
    id: "q4",
    category: "capacity",
    text: "If you took two full weeks away from the business right now, no laptop, what would actually happen?",
    answers: [
      { text: "Things would run. My team and systems have it covered.", points: { capacity: 0 } },
      { text: "Mostly fine, with a few things needing my input.", points: { capacity: 1 } },
      { text: "Several things would stall until I'm back.", points: { capacity: 2, focus: 1 } },
      { text: "Very little moves forward without me.", points: { capacity: 3, decisionMaking: 1 } }
    ]
  },
  {
    id: "q5",
    category: "focus",
    text: "How many distinct offers, projects or growth ideas are actively competing for your time and budget right now?",
    answers: [
      { text: "One clear priority. Everything else is on hold.", points: { focus: 0 } },
      { text: "Two, and they genuinely support each other.", points: { focus: 1 } },
      { text: "Three or four, and they don't always pull in the same direction.", points: { focus: 2, decisionMaking: 1 } },
      { text: "Honestly, I've lost count — there's always something new pulling at attention.", points: { focus: 3, capacity: 1 } }
    ]
  },
  {
    id: "q6",
    category: "focus",
    text: "Think about the last quarter. How often did your top priority actually get the most attention?",
    answers: [
      { text: "Almost always — I protect the important work.", points: { focus: 0 } },
      { text: "Most of the time, with a few weeks that got derailed.", points: { focus: 1 } },
      { text: "Less than half the time. Urgent things kept winning.", points: { focus: 2, decisionMaking: 1 } },
      { text: "Rarely. Whatever felt loudest that day usually won.", points: { focus: 3 } }
    ]
  },
  {
    id: "q7",
    category: "financialClarity",
    text: "If someone asked you right now what your net profit margin was last month, how quickly could you answer?",
    answers: [
      { text: "Immediately — I look at this regularly.", points: { financialClarity: 0 } },
      { text: "I could find it within a few minutes.", points: { financialClarity: 1 } },
      { text: "I'd need to dig through my bookkeeping or ask my accountant.", points: { financialClarity: 2 } },
      { text: "I honestly wouldn't know where to start.", points: { financialClarity: 3, decisionMaking: 1 } }
    ]
  },
  {
    id: "q8",
    category: "financialClarity",
    text: "Think about the last pricing, hiring or marketing decision you made. What mainly drove it?",
    answers: [
      { text: "The numbers — I checked it against margin and cash impact first.", points: { financialClarity: 0 } },
      { text: "A mix of numbers and instinct.", points: { financialClarity: 1 } },
      { text: "Mostly instinct, informed by how things generally feel.", points: { financialClarity: 2, decisionMaking: 1 } },
      { text: "Whatever felt urgent or necessary at the time.", points: { financialClarity: 3, focus: 1 } }
    ]
  },
  {
    id: "q9",
    category: "decisionMaking",
    text: "Think about the decisions that took up your mental energy this past week. Where did most of it actually go?",
    answers: [
      { text: "A handful of big strategic or financial calls.", points: { decisionMaking: 0 } },
      { text: "A mix of strategic work and day-to-day problem-solving.", points: { decisionMaking: 1 } },
      { text: "Mostly day-to-day problems and approvals.", points: { decisionMaking: 2, capacity: 1 } },
      { text: "Nearly all of it went to small operational fires.", points: { decisionMaking: 3, capacity: 1 } }
    ]
  },
  {
    id: "q10",
    category: "decisionMaking",
    text: "Is there a decision — hiring, dropping an offer, raising a price — that you know matters, but you keep putting off?",
    answers: [
      { text: "No. I deal with the big calls as they come up.", points: { decisionMaking: 0 } },
      { text: "There's one, but I have a plan to address it soon.", points: { decisionMaking: 1 } },
      { text: "Yes, and it's been sitting for a while.", points: { decisionMaking: 2, focus: 1 } },
      { text: "Yes — more than one — and they keep piling up.", points: { decisionMaking: 3, focus: 1 } }
    ]
  }
];


/* =========================================================================
   PART 3: RESULTS COPY
   One full write-up per category, plus a label used everywhere in the UI.
   ========================================================================= */

const RESULTS = {
  pricing: {
    label: "Pricing",
    explanation: "Your business is generating sales, but the pricing and offer structure underneath those sales isn't pulling its full weight. Money is moving through the business — it's just not settling into profit the way it should.",
    symptoms: [
      "Your prices track close to what others in your space charge, rather than what your work is actually worth.",
      "Some offers sell well but take more time, materials or effort to deliver than the price accounts for.",
      "Revenue keeps climbing, but what's left over at the end of the month doesn't climb with it."
    ],
    why: "Every sale that's under-priced or over-delivered is profit quietly leaving the business before it ever reaches you. Over a year, that gap compounds — it shows up as long hours with thin margins, and it makes every other growth decision harder to fund.",
    nextMove: "Before changing a single number, get precise about what each offer actually costs you to deliver — time included — and what it's genuinely worth to the client who buys it. The right price sits at the intersection of those two answers, not at whatever feels comfortable to say out loud.",
    question: "What would need to change about what I charge, sell or include for every sale to contribute more to the business I'm building?"
  },
  capacity: {
    label: "Capacity",
    explanation: "Demand isn't the problem in your business — delivery is. Right now, more sales tend to create close to an equal amount of extra work, which means growth adds pressure faster than it adds profit.",
    symptoms: [
      "A strong sales month turns into late nights and stretched delivery almost immediately.",
      "Your team, systems or schedule feel tight even at your current pace, let alone a busier one.",
      "Revenue and cost — time, payroll, contractors — tend to rise together instead of revenue pulling ahead."
    ],
    why: "A business that can't take on more without adding a nearly equal amount of cost or hours has a ceiling built into it, whether or not anyone has named it. That ceiling caps profit long before it caps demand, and it's usually the owner who absorbs the difference.",
    nextMove: "Look at how the work actually gets delivered, not how much of it there is. The fix is rarely 'hire more' — it's usually found in what could be systemized, delegated or restructured so that volume and effort stop moving in lockstep.",
    question: "What would have to change for my business to handle 20% more revenue without requiring 20% more of my time or resources?"
  },
  focus: {
    label: "Focus",
    explanation: "Your business isn't short on opportunity — it's short on room. Several offers, projects or ideas are drawing on the same limited pool of time, money and attention, and none of them are getting your full weight.",
    symptoms: [
      "More than one offer, project or growth idea is actively moving at the same time.",
      "Priorities shift depending on what feels most urgent that week.",
      "A genuinely profitable opportunity has taken a back seat to something louder but less valuable."
    ],
    why: "Split attention has a cost even when everything on the list is worthwhile. Every hour spent maintaining a secondary initiative is an hour not spent deepening the one most likely to move profit. Progress on five fronts often adds up to less than real progress on one.",
    nextMove: "Pick the single area of the business most likely to move profit in the next 90 days, and be honest about what needs to pause, not just what needs to start. Focus is a subtraction problem before it's an addition problem.",
    question: "If I could only improve one part of this business over the next 90 days, which one would create the greatest financial impact?"
  },
  financialClarity: {
    label: "Financial Clarity",
    explanation: "You know what's coming in. What's less clear is what's actually left once everything is accounted for — by offer, by client, by decision. That gap in visibility is making it harder to know where your attention truly belongs.",
    symptoms: [
      "You can quote revenue faster than you can quote profit.",
      "Pricing, hiring or marketing choices lean partly on instinct because the numbers aren't fully in view.",
      "At least one offer looks successful on the surface without a clear read on its true margin."
    ],
    why: "Decisions made without financial visibility aren't wrong on purpose — they're just made with incomplete information. That's how profitable offers get under-invested in and unprofitable ones keep getting renewed, quietly, month after month.",
    nextMove: "Start by getting a clear, current picture of profit by offer, not just profit overall. The goal isn't more reporting — it's knowing enough to make your next five decisions with confidence instead of a guess.",
    question: "What financial information would change the quality of the decisions I'm making right now?"
  },
  decisionMaking: {
    label: "Decision-Making",
    explanation: "Your time is going somewhere — it's just not always going toward the decisions with the highest financial weight. Small, operational choices are consuming the attention that bigger strategic and financial calls need.",
    symptoms: [
      "Day-to-day operational choices take up a disproportionate share of your mental energy.",
      "At least one significant strategic or financial decision has been sitting unresolved for a while.",
      "You're still personally involved in decisions someone else on the team could reasonably own."
    ],
    why: "Not all decisions carry the same weight. A business that spends its best hours on $10 and $100 decisions is, by definition, not spending them on the $1,000 and $10,000 decisions that actually move profit. The cost isn't visible day to day — it shows up as opportunity that quietly passed.",
    nextMove: "Separate your open decisions by what's actually at stake financially, not by how loudly they're asking for attention. Then deliberately protect time for the highest-value ones before the smaller ones fill the space again.",
    question: "What $10,000 decision am I avoiding while I'm busy making $10 and $100 decisions?"
  }
};

// One or two sentences describing how a given category, when it shows up as
// the SECONDARY constraint, tends to interact with whatever the PRIMARY
// constraint turns out to be. "{primary}" is replaced at render time with
// the primary result's label (e.g. "Pricing").
const SECONDARY_INTERACTIONS = {
  pricing: "Pricing is worth watching too. When {primary} is already limiting profit, weak pricing removes the cushion that would otherwise protect what's left.",
  capacity: "Capacity is also in the picture. If {primary} improves and more business comes in, growth can quickly hit a ceiling if delivery capacity isn't sitting right behind it.",
  focus: "Focus is playing a role here as well. Divided attention makes it easy for work on {primary} to get quietly overtaken by whatever feels most urgent that day.",
  financialClarity: "Financial clarity is a factor too. Without a clean read on the numbers, it's hard to know for certain that {primary} is really the priority it appears to be.",
  decisionMaking: "Decision-making is tangled up in this too. {primary} is easy to keep deprioritizing when smaller operational decisions keep absorbing your attention."
};

const CATEGORY_ORDER = ["pricing", "capacity", "focus", "financialClarity", "decisionMaking"];


/* =========================================================================
   PART 4: APPLICATION LOGIC
   ========================================================================= */

const state = {
  currentIndex: 0,               // 0-based index into QUESTIONS
  answers: new Array(QUESTIONS.length).fill(null) // stores selected answer index per question
};

// ---- DOM references ----
const screens = {
  landing: document.getElementById("screen-landing"),
  quiz: document.getElementById("screen-quiz"),
  loading: document.getElementById("screen-loading"),
  result: document.getElementById("screen-result")
};

const el = {
  btnStart: document.getElementById("btn-start"),
  progressFill: document.getElementById("progress-fill"),
  progressLabel: document.getElementById("progress-label"),
  progressbar: document.getElementById("progressbar"),
  questionText: document.getElementById("question-text"),
  optionsList: document.getElementById("options-list"),
  btnBack: document.getElementById("btn-back"),
  btnContinue: document.getElementById("btn-continue"),
  loadingText: document.getElementById("loading-text"),

  resultTitle: document.getElementById("result-title"),
  resultExplanation: document.getElementById("result-explanation"),
  resultSymptoms: document.getElementById("result-symptoms"),
  resultWhy: document.getElementById("result-why"),
  resultNextMove: document.getElementById("result-next-move"),
  resultQuestion: document.getElementById("result-question"),
  resultChart: document.getElementById("result-chart"),
  resultSecondaryTitle: document.getElementById("result-secondary-title"),
  resultSecondaryText: document.getElementById("result-secondary-text"),
  btnCta: document.getElementById("btn-cta"),
  linkLearnMore: document.getElementById("link-learn-more"),
  btnShare: document.getElementById("btn-share"),
  btnRetake: document.getElementById("btn-retake"),
  shareConfirm: document.getElementById("share-confirm")
};

let lastResult = null; // populated on scan completion, used by the share button

/**
 * Swap which top-level screen is visible.
 */
function showScreen(name) {
  Object.entries(screens).forEach(([key, node]) => {
    node.hidden = key !== name;
  });
  window.scrollTo({ top: 0, behavior: "auto" });
}

/**
 * Render the question at state.currentIndex into the DOM.
 */
function renderQuestion() {
  const q = QUESTIONS[state.currentIndex];
  const total = QUESTIONS.length;
  const num = state.currentIndex + 1;

  el.progressLabel.textContent = `Question ${num} of ${total}`;
  el.progressbar.setAttribute("aria-valuenow", String(num));
  el.progressFill.style.width = `${(num / total) * 100}%`;

  el.questionText.textContent = q.text;
  el.optionsList.innerHTML = "";

  q.answers.forEach((answer, i) => {
    const wrapper = document.createElement("div");
    wrapper.className = "quiz__option";

    const inputId = `${q.id}-opt${i}`;
    const input = document.createElement("input");
    input.type = "radio";
    input.name = q.id;
    input.id = inputId;
    input.value = String(i);
    if (state.answers[state.currentIndex] === i) {
      input.checked = true;
    }

    const label = document.createElement("label");
    label.setAttribute("for", inputId);

    const marker = document.createElement("span");
    marker.className = "option-marker";
    marker.setAttribute("aria-hidden", "true");

    const textSpan = document.createElement("span");
    textSpan.textContent = answer.text;

    label.appendChild(marker);
    label.appendChild(textSpan);

    input.addEventListener("change", () => {
      state.answers[state.currentIndex] = i;
      el.btnContinue.disabled = false;
      trackEvent("question_answered", { questionId: q.id, category: q.category, answerIndex: i });
    });

    wrapper.appendChild(input);
    wrapper.appendChild(label);
    el.optionsList.appendChild(wrapper);
  });

  el.btnBack.disabled = state.currentIndex === 0;
  el.btnContinue.disabled = state.answers[state.currentIndex] === null;
  el.btnContinue.textContent = state.currentIndex === total - 1 ? "See My Result" : "Continue";

  el.questionText.focus({ preventScroll: true });
}

function goToQuestion(index) {
  state.currentIndex = index;
  renderQuestion();
}

function handleContinue() {
  if (state.answers[state.currentIndex] === null) return; // guard: no skipping

  if (state.currentIndex < QUESTIONS.length - 1) {
    goToQuestion(state.currentIndex + 1);
  } else {
    runScoringSequence();
  }
}

function handleBack() {
  if (state.currentIndex === 0) return;
  goToQuestion(state.currentIndex - 1);
}

/**
 * Sum points across all answered questions into a score per category.
 * Also tracks how many "high severity" (3-point) answers were chosen per
 * category, used only as a tie-breaker.
 */
function calculateScores() {
  const scores = { pricing: 0, capacity: 0, focus: 0, financialClarity: 0, decisionMaking: 0 };
  const highSeverityCounts = { pricing: 0, capacity: 0, focus: 0, financialClarity: 0, decisionMaking: 0 };

  QUESTIONS.forEach((q, qIndex) => {
    const answerIndex = state.answers[qIndex];
    if (answerIndex === null) return; // should never happen — navigation blocks skipping
    const points = q.answers[answerIndex].points;
    Object.entries(points).forEach(([category, value]) => {
      scores[category] += value;
      if (value >= 3) highSeverityCounts[category] += 1;
    });
  });

  return { scores, highSeverityCounts };
}

/**
 * Decide the primary and secondary constraint from a score map.
 * Tie-break order:
 *   1) Higher raw score wins.
 *   2) If tied, more "high severity" (3-point) answers wins.
 *   3) If still tied, CATEGORY_ORDER (a fixed, arbitrary priority list)
 *      decides — this guarantees the app never returns an ambiguous result.
 */
function determinePrimaryAndSecondary(scores, highSeverityCounts) {
  const ranked = [...CATEGORY_ORDER].sort((a, b) => {
    if (scores[b] !== scores[a]) return scores[b] - scores[a];
    if (highSeverityCounts[b] !== highSeverityCounts[a]) return highSeverityCounts[b] - highSeverityCounts[a];
    return CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b);
  });

  return { primary: ranked[0], secondary: ranked[1] };
}

/**
 * Brief, deliberately undramatic loading messages shown during the
 * calculating transition.
 */
const LOADING_MESSAGES = [
  "Reviewing your answers…",
  "Weighing where the constraint sits…",
  "Building your result…"
];

function runScoringSequence() {
  trackEvent("scan_completed");
  showScreen("loading");

  let msgIndex = 0;
  el.loadingText.textContent = LOADING_MESSAGES[0];
  const interval = setInterval(() => {
    msgIndex += 1;
    if (msgIndex < LOADING_MESSAGES.length) {
      el.loadingText.textContent = LOADING_MESSAGES[msgIndex];
    }
  }, 500);

  setTimeout(() => {
    clearInterval(interval);
    const { scores, highSeverityCounts } = calculateScores();
    const { primary, secondary } = determinePrimaryAndSecondary(scores, highSeverityCounts);
    lastResult = { scores, primary, secondary };
    renderResult(lastResult);
    showScreen("result");
    trackEvent(`result_${toSnakeCase(primary)}`);
  }, 1500);
}

function toSnakeCase(camel) {
  return camel.replace(/([A-Z])/g, "_$1").toLowerCase();
}

function renderResult({ scores, primary, secondary }) {
  const primaryResult = RESULTS[primary];
  const secondaryResult = RESULTS[secondary];

  el.resultTitle.textContent = primaryResult.label;
  el.resultExplanation.textContent = primaryResult.explanation;

  el.resultSymptoms.innerHTML = "";
  primaryResult.symptoms.forEach((s) => {
    const li = document.createElement("li");
    li.textContent = s;
    el.resultSymptoms.appendChild(li);
  });

  el.resultWhy.textContent = primaryResult.why;
  el.resultNextMove.textContent = primaryResult.nextMove;
  el.resultQuestion.textContent = `"${primaryResult.question}"`;

  el.resultSecondaryTitle.textContent = secondaryResult.label;
  el.resultSecondaryText.textContent = SECONDARY_INTERACTIONS[secondary].replace("{primary}", primaryResult.label);

  renderChart(scores, primary);

  el.btnCta.href = CONFIG.POP_EVENT_URL;
  el.linkLearnMore.href = CONFIG.POP_INFO_URL;
}

/**
 * For each category, find the highest score it could reach: for every
 * question, take the single largest point value that question could award
 * to that category, and sum those across all questions. This is computed
 * from QUESTIONS directly, so editing the questions or their point values
 * automatically keeps the chart scaled correctly — no number to update by hand.
 */
function calculateMaxPossibleScores() {
  const max = { pricing: 0, capacity: 0, focus: 0, financialClarity: 0, decisionMaking: 0 };
  QUESTIONS.forEach((q) => {
    const questionMax = { pricing: 0, capacity: 0, focus: 0, financialClarity: 0, decisionMaking: 0 };
    q.answers.forEach((answer) => {
      Object.entries(answer.points).forEach(([category, value]) => {
        if (value > questionMax[category]) questionMax[category] = value;
      });
    });
    Object.keys(max).forEach((category) => {
      max[category] += questionMax[category];
    });
  });
  return max;
}

function renderChart(scores, primaryKey) {
  const maxScores = calculateMaxPossibleScores();
  el.resultChart.innerHTML = "";

  CATEGORY_ORDER.forEach((key) => {
    const value = scores[key];
    const maxPossible = maxScores[key] || 1; // guard against divide-by-zero
    const pct = Math.min(100, Math.round((value / maxPossible) * 100));
    const isPrimary = key === primaryKey;

    const row = document.createElement("div");
    row.className = "chart-row";

    const label = document.createElement("span");
    label.className = "chart-row__label" + (isPrimary ? " is-primary" : "");
    label.textContent = RESULTS[key].label;

    const track = document.createElement("div");
    track.className = "chart-row__track";
    const fill = document.createElement("div");
    fill.className = "chart-row__fill" + (isPrimary ? " is-primary" : "");
    track.appendChild(fill);

    const valueEl = document.createElement("span");
    valueEl.className = "chart-row__value";
    valueEl.textContent = String(value);

    row.appendChild(label);
    row.appendChild(track);
    row.appendChild(valueEl);
    el.resultChart.appendChild(row);

    // Animate in on the next frame so the CSS transition actually plays.
    requestAnimationFrame(() => {
      fill.style.width = `${pct}%`;
    });
  });
}

function resetAssessment() {
  state.currentIndex = 0;
  state.answers = new Array(QUESTIONS.length).fill(null);
  lastResult = null;
  el.shareConfirm.textContent = "";
  showScreen("landing");
}

/**
 * Share the result via the Web Share API where available, falling back
 * to copying a short share message to the clipboard.
 */
async function shareResult() {
  if (!lastResult) return;

  const label = RESULTS[lastResult.primary].label;
  const shareText = `My Profitable on Purpose Business Scan says my biggest profit constraint right now is ${label}. What's yours? ${CONFIG.SITE_URL}`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: "Profitable on Purpose Business Scan",
        text: shareText,
        url: CONFIG.SITE_URL
      });
      trackEvent("result_shared", { method: "web_share" });
      return;
    } catch (err) {
      // User cancelled the native share sheet, or it failed — fall through to clipboard.
    }
  }

  try {
    await navigator.clipboard.writeText(shareText);
    el.shareConfirm.textContent = "Copied to your clipboard.";
    trackEvent("result_shared", { method: "clipboard" });
  } catch (err) {
    // Clipboard API can fail in some contexts (e.g. no HTTPS, blocked permission).
    el.shareConfirm.textContent = "Copy this: " + shareText;
  }
}

// ---- Event wiring ----
el.btnStart.addEventListener("click", () => {
  trackEvent("scan_started");
  goToQuestion(0);
  showScreen("quiz");
});

el.btnContinue.addEventListener("click", handleContinue);
el.btnBack.addEventListener("click", handleBack);
el.btnRetake.addEventListener("click", () => {
  resetAssessment();
});
el.btnShare.addEventListener("click", shareResult);
el.btnCta.addEventListener("click", () => trackEvent("pop_cta_clicked"));


/* =========================================================================
   PART 5: ANALYTICS HOOKS
   trackEvent() is called throughout the app above. Right now it only logs
   to the console. When you're ready to connect a real analytics tool,
   this is the only function you need to edit — for example, calling
   gtag('event', name, payload) for Google Analytics.
   ========================================================================= */

function trackEvent(name, payload) {
  // Example once Google Analytics (gtag.js) is installed in index.html:
  // if (typeof gtag === "function") gtag("event", name, payload || {});
  console.log("[POP Business Scan] event:", name, payload || {});
}
