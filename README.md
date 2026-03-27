# 🌐 Wrap-Up: Study Smartly

**A Decentralized Web3 AI Research & News Curation Platform, Built Natively on OneChain**

[![Live App](https://img.shields.io/badge/Visit-Live%20App-00C853?style=for-the-badge&logo=vercel&logoColor=white)](https://wrap-up-onechain.vercel.app/)
[![Demo Video](https://img.shields.io/badge/Watch-Demo%20Video-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/PEnP38zMSzw)
[![OneChain Docs](https://img.shields.io/badge/Docs-OneChain-6C47FF?style=for-the-badge)](https://docs.onelabs.cc/DevelopmentDocument)

> ### Built for OneHack 3.0 | AI & GameFi Edition — AI Track

---

## 📖 What is Wrap-Up?

Wrap-Up is a fully-fledged decentralized social platform engineered for the modern Web3 researcher, built as a tool to **"Study Smartly."**

Instead of drowning in messy Twitter feeds, scattered news articles, or reading multiple blogs, Wrap-Up delivers a **gamified, decentralized ecosystem** where high-quality articles and AI-generated research reports are curated, summarised, and permanently recorded on-chain via **OneChain**.

---

## 🚨 The Problem We Are Solving

The Web3 information landscape is fundamentally broken in three critical ways:

| # | Problem | Real-World Impact |
|---|---|---|
| 1 | **Information Overload** | Hundreds of articles, threads, and posts are published daily from multiple platforms with no quality checks. |
| 2 | **Financial Bias** | Content is routinely created to pump tokens, mislead retail investors, or spread FUD. There is no accountability layer. |
| 3 | **No Verifiable Source of Truth** | There is no on-chain, cryptographically-backed record of what content is accurate, who published it, or when it appeared. |

These three failures together create an environment where **misinformation thrives and genuine research is undervalued.** The cost of this is measured in bad investment decisions, missed opportunities, and eroding trust in the space.

---

## ✅ The Solution: How Wrap-Up Fixes This

Wrap-Up directly attacks all three failure points by combining **AI-powered research**, **articles curation**, and **immutable on-chain storage** — all running on the OneChain ecosystem.

| Failure | Wrap-Up's Answer |
|---|---|
| Information Overload | AI synthesizes the web into structured, sourced research reports in seconds |
| Financial Bias | Community upvoting and on-chain leaderboards surface quality content organically |
| No Source of Truth | Every piece of content is committed to OneChain with a permanent IPFS hash and wallet fingerprint |

Wrap-Up is the platform where:

- **AI writes research** so you don't have to chase a hundred sources
- **Communities curate** and rank what actually matters
- **The OneChain blockchain records** what has been verified, permanently
- **Readers earn $WUP tokens** for contributing high-quality knowledge

---

## 💎 Why OneChain? The Move Architecture Advantage

Building Wrap-Up on OneChain was not a deployment decision. It was a design decision. We fully abandoned the EVM account-based model and embraced **OneChain's Resource-Oriented Move Architecture**, which unlocked capabilities that are impossible on legacy chains.

Here is exactly how we used OneChain's unique primitives:

---

### 1. Object-Oriented User Profiles (The `UserProfile` Object)

On EVM platforms, a user's points and state are stored inside a central contract mapping. This means the contract owns the user's data. We did the opposite.

When a user initializes their Wrap-Up account, our Move contract creates a `UserProfile` object with the `key` ability and **physically transfers it into the user's wallet**. The user is the true custodian of their own profile, points, and earned rewards. No central authority can revoke or manipulate this data.

```move
// Simplified representation of profile initialization
public entry fun initialize_profile(ctx: &mut TxContext) {
    let profile = UserProfile {
        id: object::new(ctx),
        points: 0,
        claimed_rewards: 0,
    };
    transfer::transfer(profile, tx_context::sender(ctx));
}
```

**This is a fundamentally more secure and user-sovereign model than any EVM mapping can offer.**

---

### 2. Programmable Transaction Blocks (PTBs) for Seamless AI Report Submission

Our React frontend uses `@mysten/dapp-kit` to construct Programmable Transaction Blocks. When a user submits an AI research report, the frontend bundles multiple operations atomically into a single transaction:

- The user's `UserProfile` object reference (mutable, from their wallet)
- The IPFS content hash of the synthesized report
- OneChain's global `Clock` object (`0x6`) for a tamper-proof, block-level timestamp

This means a report submission, profile point update, and timestamp recording all happen atomically in one transaction. No second transaction, no race conditions, no partial state updates.

---

### 3. Secure Token Claiming via Object-Level State

The `claim_rewards` function in our Move module reads the user's unspent points **directly from their owned `UserProfile` object** in their wallet. It does not query a central ledger. This design:

- Prevents any centralized manipulation of claimable balances
- Ensures only the wallet owner can trigger a claim
- Makes the entire reward lifecycle auditable on-chain

---

### 4. Hybrid Off-Chain / On-Chain Architecture for Web2-Speed UX

We combined an off-chain MongoDB database with on-chain Move settlement to create a Web2-like experience without sacrificing decentralization. AI generation and article reading happen instantly off-chain. The "Curation Submit" and "Token Claim" actions are then settled on OneChain, giving users speed where it matters and trust where it counts.

---

## 🌟 Core Features

### Feature 1: 🤖 AI Research Engine

> *The core feature powering the AI Track submission*

#### The Problem It Solves
A Web3 researcher today must read 15 articles, cross-reference 3 Twitter threads, and check 2 Discord servers just to form an informed view on a single topic. This process takes hours and is still vulnerable to bias.

#### How It Works

Users enter any research topic or question into Wrap-Up's research panel. The backend AI engine then executes a full research pipeline autonomously:

**Step 1 — Web Intelligence Gathering**
The engine scours live web sources for the most recent and relevant articles, posts, and documentation related to the query. It prioritizes primary sources and ecosystem-native publications.

**Step 2 — Synthesis and Structuring**
The AI synthesizes all gathered information into a structured, readable report featuring:
- An executive summary of key findings
- A detailed analysis section
- Identified counterpoints or risks
- Full source citations with links

**Step 3 — IPFS Pinning for Permanent Storage**
The compiled report is uploaded to IPFS via Pinata, producing a content-addressed, immutable hash. The report now exists permanently on a decentralized storage network.

**Step 4 — On-Chain Commitment**
The IPFS hash is submitted to the `platform` module on OneChain Testnet via a PTB. The transaction emits a `ReportSubmittedEvent`, linking the report's hash to the submitter's wallet address and block timestamp. The report now has a **cryptographic proof of existence on OneChain**.

**Step 5 — Community Ranking**
The published report enters the platform leaderboard where the community can upvote, comment, and compare it against other reports.

#### Use Case
> A user wants to understand the current state of OneChain's Move ecosystem. Instead of spending hours reading, they submit the prompt to Wrap-Up and receive a synthesized, sourced report in seconds — permanently stored and community-ranked on OneChain.

---

### Feature 2: 📰 Article Curation and Leaderboard

#### The Problem It Solves
Quality articles exist across the web, but the Web3 community has no shared, unbiased platform to surface and rank them. Twitter algo and Discord pin-boards are both easily gamed.

#### How It Works

Any user can submit an external article URL to the Wrap-Up curation feed. The platform then:

**Article Extraction**
Wrap-Up's backend fetches and parses the full article content, stripping away ads, paywalls, and distracting UI. The reader gets a clean, distraction-free reading experience inside the app.

**On-Chain Submission Record**
The article's URL, submitter wallet address, and submission timestamp are committed on-chain, creating an immutable record of who surfaced what content and when.

**Community Engagement Tracking**
The platform aggregates upvotes, comments, and saves on each article. These scores feed into a live curation leaderboard.

**The $WUP Reward Loop**
Users whose submitted articles rise to the top of the leaderboard earn points in their `UserProfile` object. Those points are claimable as $WUP tokens via the `claim_rewards` function.

```
Submit quality article → Community upvotes → Climb leaderboard → Earn $WUP rewards
```

This model makes spam and low-effort submissions economically irrational. Quality content is the only path to earning.

---

### Feature 3: ⚖️ Article Comparator Tool

#### The Problem It Solves
Two articles on the same topic can reach wildly different conclusions. Without a tool to place them side by side, readers are forced to context-switch between tabs and rely on memory to spot contradictions.

#### How It Works

The Article Comparator is a split-screen reading and analysis tool built into Wrap-Up:

**Side-by-Side View**
Users can load any two articles or AI research reports into a dual-pane view simultaneously. No more tab-switching.

**Contradiction Detection**
By reading both sources in parallel, users can immediately identify where claims diverge, where data conflicts, and where one source may be omitting important context.

**Research Workflow**
Users can highlight passages, annotate key points, and compare conclusions across sources in a single focused session.

#### Use Case
> A researcher wants to compare a bullish vs. bearish analysis on a DeFi protocol. They load both reports into the comparator and immediately see where the arguments diverge — without losing context.

---

### Feature 4: 💬 Decentralized Social Hub

#### The Problem It Solves
Existing Web3 discussion happens on centralized platforms. Valuable analysis threads can be deleted, shadowbanned, or lost. The community has no permanent, censorship-resistant record of its own discourse.

#### How It Works

Every article and research report on Wrap-Up is a living social object with its own discussion layer:

**Threaded Discussions**
Reddit-style nested comment threads allow deep, contextual debate on every piece of content.

**Community Voting**
Upvotes and downvotes on both comments and articles surface genuine community sentiment without algorithmic interference.

**Immutable Interaction Records**
All social interactions are backed by on-chain records. Discussion history is owned by the community, not by any company or server. No comment can be silently deleted by a central authority.

---

### Feature 5: 🪙 $WUP Token Economy and Claiming

#### The Problem It Solves
Most content platforms extract value from creators without returning it. Quality researchers and curators have no financial incentive to do their best work on platform.

#### How It Works

$WUP is the native utility token that powers all economic activity on Wrap-Up. The token lifecycle is built directly on Move objects:

| Action | Result |
|---|---|
| Submit an AI research report | Earn points in your `UserProfile` object |
| Submit a top-ranked curated article | Earn points in your `UserProfile` object |
| Call `claim_rewards` on-chain | Points converted to $WUP in your wallet |
| Future: Stake $WUP to boost content visibility | Spend $WUP |

**The Claim Mechanics**

The `claim_rewards` function in the `platform` Move module directly reads the `points` field of the caller's owned `UserProfile` object. It verifies unspent balance, calculates the $WUP equivalent, and settles the transfer — all in one atomic Move transaction. The user's `UserProfile` object is then updated to reflect the claimed amount.

This means every reward claim is:
- Initiated only by the wallet owner
- Settled atomically on OneChain
- Fully auditable by anyone

---

## 🏗️ Full Architecture Diagram

```
User Action (Research Prompt or Article URL)
          │
          ▼
React Frontend (@mysten/dapp-kit, Zustand, React Query)
          │  Constructs PTB with UserProfile Object + Clock (0x6)
          ▼
Node.js / Express Backend
          │  AI pipeline synthesizes report or extracts article
          ▼
IPFS via Pinata
          │  Full content pinned → IPFS hash returned
          ▼
OneChain Testnet (Move :: platform module)
          │  Hash + metadata committed on-chain atomically
          │  ReportSubmittedEvent emitted
          ▼
Frontend Query (React Query polling)
          │  UI reads verified on-chain content state
          ▼
User sees verified, on-chain content card with community ranking
```

---

## 🛠️ Full Tech Stack

| Layer | Technology |
|---|---|
| **Smart Contracts** | Move (OneChain / Sui Framework) |
| **Blockchain** | OneChain Testnet |
| **Frontend** | React, Vite, TailwindCSS |
| **State Management** | Zustand, React Query |
| **Blockchain Interaction** | `@mysten/dapp-kit`, `@mysten/sui` |
| **Decentralized Storage** | IPFS via Pinata |
| **Backend** | Node.js, Express, Prisma (MongoDB) |
| **AI Engine** | Web-scraping + LLM synthesis pipeline |
| **Wallet Support** | OneWallet (OneChain native) |

---

## ✅ Deployed Contracts — OneChain Testnet

Our Move smart contracts are actively deployed and functional on the OneChain Testnet.

| Field | Value |
|---|---|
| **Package ID** | `0x6211ae71e382c6b59457a66579d5345ed82f2d746c3848932ee2e2bef8fd3dbd` |
| **Module Name** | `platform` |
| **Global Clock Object** | `0x6` (Standard across all Sui-based chains — used for report timestamps) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- OneChain CLI (for Move contract compilation)
- OneWallet Browser Extension (connected to OneChain Testnet)
- Pinata API key (for IPFS uploads)

### 1. Clone the Repository

```bash
git clone https://github.com/iammohit64/wrap-up-onechain.git
cd wrap-up-onechain
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 3. Configure Environment Variables

Create `.env` files in both the `frontend` and `backend` directories.

**frontend/.env**
```env
VITE_PACKAGE_ID=0x6211ae71e382c6b59457a66579d5345ed82f2d746c3848932ee2e2bef8fd3dbd
```

**backend/.env**
```env
PINATA_API_KEY=your_pinata_key
PINATA_SECRET=your_pinata_secret
AI_API_KEY=your_ai_key
DATABASE_URL=your_mongodb_url
```

### 4. Run the Application

Open two terminal windows.

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

---

## 🎯 Why Wrap-Up Wins the AI Track

| Dimension | What We Delivered |
|---|---|
| **Meaningful AI Integration** | AI is not a buzzword here. It solves a genuine Web3 problem — information overload — by synthesizing complex multi-source data into structured, readable, citable reports. |
| **Deep OneChain Ecosystem Alignment** | We fully embraced the Move paradigm: object-owned user profiles, PTBs for atomic transactions, and the global Clock object for tamper-proof timestamps. |
| **Working MVP** | We shipped a fully functional product featuring live IPFS pinning, OneWallet transaction signing, on-chain event emission, and a polished, production-grade UI. |
| **Real Problem, Real Stakes** | Web3 misinformation and information overload are active, multi-billion-dollar problems. Every feature in Wrap-Up exists to address a specific, observable failure in how knowledge flows through the ecosystem. |
| **Token Economy with On-Chain Logic** | The $WUP reward loop is not simulated. It is settled by Move functions reading directly from user-owned objects in their wallets. |

---

## 🔮 Roadmap

- [ ] **Governance Module** — $WUP holders vote on curation policies and platform parameters
- [ ] **Cross-Chain Content Discovery** — Expand to additional Move-based chains as the ecosystem grows
- [ ] **Mobile Client** — React Native app for on-the-go research and curation
- [ ] **Reputation NFTs** — Soulbound badges for top curators, verifiable on-chain
- [ ] **DAO Treasury** — Protocol fees fund community grants for high-quality research initiatives

---

## 👥 Team

Built with dedication for **OneHack 3.0 | AI & GameFi Edition.**

[![iammohit64](https://img.shields.io/badge/iammohit64-181717?style=flat-square&logo=github)](https://github.com/iammohit64)
[![dakshh0827](https://img.shields.io/badge/dakshh0827-181717?style=flat-square&logo=github)](https://github.com/dakshh0827)
