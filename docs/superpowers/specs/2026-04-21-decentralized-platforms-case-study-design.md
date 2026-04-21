# Decentralized Platforms Case Study Design

## Goal

Rewrite the `decentralized-platforms` project entry into a stronger portfolio case study that reflects the actual repository at `https://github.com/connorzty/PACSJF-401004-final`.

The change should replace the current generic "cloud and decentralized platforms" summary with content grounded in the implemented marketplace DApp:

- `Solidity` smart contracts for product listing, purchase, and order-status updates
- `React` frontend routes for browsing, adding products, managing shipping, and reviewing purchased orders
- `Web3` wallet interaction through MetaMask or a local Ganache-style provider
- `QuickNode IPFS` storage for product media and description bundles

The page should keep the current site structure and editorial style. This is a content rewrite, not a template redesign.

## Approved User Intent

- Use the repository linked by the user as the factual source
- Rewrite the project in a fuller case-study style rather than a lightweight placeholder
- Use the four fixed sections:
  - `Project Description`
  - `Outcome`
  - `Challenge`
  - `Approach`
- Correct inaccurate technology claims in the existing entry
- Update surrounding metadata so the homepage card and detail page feel coherent

## Current State

The current `decentralized-platforms` entry in [content.js](C:/Users/19612/Desktop/job/Personal_website/content.js) undersells and partially misstates the project:

- it describes the work as a vague research prototype
- it claims `AWS S3` support, which is not reflected in the linked repo
- it keeps the detail page extremely short
- it uses placeholder media and a dummy `Visit Project` link

The linked repository shows a more specific implementation:

- `contracts/Marketplace.sol` defines the on-chain product model and purchase/order events
- `marketplace-dapp/src/App.js` implements the user flows for:
  - browsing unsold products
  - adding a product
  - updating shipping status
  - viewing purchased orders
- product descriptions and images are zipped in the client, uploaded through the QuickNode IPFS API, and later rehydrated in the UI
- `marketplace-dapp/src/web3.js` connects through MetaMask when available and falls back to `http://localhost:7545`
- `README.txt` indicates a local Truffle deployment flow followed by contract-address wiring and `npm start`

## Approaches Considered

### 1. Minimal four-paragraph patch

Only replace the four content sections and leave the surrounding metadata mostly untouched.

Pros:

- smallest diff
- low risk to existing site structure

Cons:

- leaves inaccurate platform and stack metadata in place
- homepage card would still not match the detail-page story

### 2. Metadata correction plus four-section rewrite

Rewrite the fixed sections and also update the card metadata, stack, platform, and repository link.

Pros:

- fixes factual inconsistencies
- keeps the project coherent across homepage and detail page

Cons:

- still treats the project mostly as a content correction rather than a full portfolio upgrade

### 3. Full case-study rewrite within the existing data model

Rewrite the entire project object while preserving the same page template and rendering contract.

Pros:

- strongest portfolio result
- aligns the homepage card, metadata, and detail narrative
- corrects the technology story without requiring any template changes

Cons:

- larger content diff
- requires careful wording so the copy stays grounded in the actual repo and does not overclaim

## Recommendation

Use **Approach 3: full case-study rewrite within the existing data model**.

This matches the user's instruction and produces the best result without expanding scope into layout or renderer changes. The content model already supports a richer detail page, so the right move is to upgrade the project narrative while keeping the same shell.

## Approved Design

### 1. Scope Of Change

Only the `decentralized-platforms` object in [content.js](C:/Users/19612/Desktop/job/Personal_website/content.js) should change.

Targeted fields to rewrite:

- `result`
- `subtitle`
- `summary`
- `visit`
- `detailMeta`
- `stack`
- `detailLeadSections`
- `detailsHtml`

Fields to keep unless directly needed:

- `slug`
- `category`
- `domain`
- `wordmarkLines`
- placeholder media paths
- quote block unless a strong repo-grounded quote is available

No template, routing, style, or test-structure redesign is planned.

### 2. Narrative Direction

The case study should frame the project as an **Ethereum marketplace DApp** rather than a vague cloud/decentralized experiment.

The emphasis should be:

- hybrid architecture decisions between chain state and content storage
- practical product flows rather than protocol theory
- how the UI, wallet, contract, and IPFS pipeline cooperate

The writing should feel like a portfolio explanation of a working prototype:

- what the product does
- what constraints shaped the architecture
- how the implementation handled those constraints
- what the final demo proves

### 3. Section Design

#### Project Description

This section should explain the end-to-end system clearly:

- a marketplace DApp where users can post products, browse items, purchase them, and track order fulfillment
- React handles page-level user flows and routing
- Solidity handles product records, purchase state, buyer identity, and order-status transitions
- product media and descriptions are packaged off-chain and loaded back through IPFS

This section should read as a system overview, not a generic course-project summary.

#### Outcome

This section should describe what the final prototype successfully demonstrated:

- a complete item lifecycle from listing to purchase to delivery-state tracking
- a working split between on-chain state and off-chain content delivery
- a usable front-end flow for both sellers and buyers

The tone should stress that the value is in the integrated workflow, not in isolated components.

#### Challenge

This section should focus on the real technical tension visible in the repo:

- blockchain storage is not suitable for rich product assets or long descriptions
- the UI has to coordinate wallet state, contract calls, IPFS reads, and route-specific behavior
- the product list and purchased-order views need to stay consistent with the evolving contract state
- shipping-state management adds another layer beyond simple buy/sell demo logic

This should explain why the project is more than a basic smart-contract CRUD exercise.

#### Approach

This section should describe the chosen design clearly:

- store only the minimum product and order state on-chain
- zip the image and `description.txt` client-side before upload
- persist the content package to QuickNode IPFS
- recover and unpack product details in the frontend when rendering cards
- organize the UI into four explicit flows:
  - `Home`
  - `Add Product`
  - `Manage Shipping`
  - `Purchased Orders`

The section should make the chain/off-chain boundary feel intentional rather than incidental.

### 4. Metadata Rewrite Plan

#### Homepage Card

The homepage-facing content should be upgraded from generic research language to a product-oriented summary.

The revised card should communicate:

- this is a marketplace DApp
- it combines smart contracts, wallet interaction, and decentralized file storage
- it supports listing, buying, and order tracking

#### Visit Link

The `visit` action should point to the GitHub repository rather than a placeholder external URL.

Expected direction:

- href: `https://github.com/connorzty/PACSJF-401004-final`
- label: a repository-oriented CTA such as `View Repository`

#### Detail Meta

The detail metadata should reflect the actual repo implementation more accurately.

Expected direction:

- `siteType`: `Marketplace DApp` or similarly precise label
- `platform`: `React + Solidity + Truffle`
- disciplines centered on smart contracts, frontend integration, and decentralized application architecture

#### Stack

The stack should be corrected to match what is visible in the repository.

Expected technologies:

- `React`
- `Solidity`
- `Truffle`
- `Web3.js`
- `MetaMask`
- `QuickNode IPFS`
- `JavaScript`

Avoid adding technologies that are not meaningfully evidenced in the repo.

### 5. Content Boundaries

Included:

- rewriting this one project into a richer and more accurate case study
- correcting misleading stack and platform metadata
- keeping the four requested section headings

Not included:

- sourcing new screenshots or media assets
- redesigning the detail-page template
- rewriting other projects for stylistic consistency
- reverse-engineering claims about scale, users, or deployment quality that the repo does not support

## Verification Plan

Implementation verification should stay focused:

- inspect the diff for the single `decentralized-platforms` object
- run the existing targeted site test command if it is cheap and already used in the repo
- manually open the project detail page and confirm the new headings and text render correctly
- verify the new repository CTA points to the GitHub URL

## Risks And Constraints

- The working tree is already dirty, including existing local edits in `content.js`, so the implementation must update only the `decentralized-platforms` object and avoid disturbing unrelated changes.
- The repo does not provide polished documentation, so all claims must be grounded in visible code paths rather than inferred ambitions.
- Placeholder media is likely to remain for now, so the writing must carry the case study without depending on new visuals.

## Implementation Outcome

When complete, the `decentralized-platforms` entry should read like a credible portfolio project:

- more specific than a course-project placeholder
- factually aligned with the linked GitHub implementation
- strong enough to support both the homepage card and the detail page
- still consistent with the site's existing content model and visual system
