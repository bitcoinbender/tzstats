## Tezos Blockchain Explorer

Project Links
- [Discord](https://discord.gg/D5e98Hw) for talking to devs
- [Airtable](https://airtable.com/invite/l?inviteId=inv6CUL9bNO7iV91W&inviteToken=751ab81f062ecd294fb0463e44e624764c5f0fc51a1aa7bcaff740c23f0e8d0a) for persona and requirements mapping
- [XTZ Database](https://blockwatch.cc/databases/blockchains/XTZ) enhanced blockchain data as tables
- [XTZ-EOD Database](https://blockwatch.cc/databases/blockchains/XTZ-EOD) blockchain time-series statistics
- [Blockwatch API](https://blockwatch.cc/docs/api)

### Project Schedule

- W25 preparation phase
  - tasks: user poll, persona definition, explorer research, feature definition, team selection
  - deliverables: personas, feature list & priorities, API requirements, tech stack, design brief
- W26 design phase 1
  - tasks: ux and architecture design
  - deliverables: UX design sketches, list of screens and displayed information, user journey, URL semantics
- W27-W30 design phase 2
  - tasks: detailed UX/UI design
  - deliverables: visual language (colors, fonts, cards, graphs), screen designs, HTML/CSS templates
- W27 implementation setup
  - dev and test environment setup
  - site controllers
  - data API access layer
  - analytics integration
  - multi-language support foundation
- W28-W33 screen implementations
  - single block screen
  - single operation screen
  - single account screen
  - single delegator account screen
  - search feature
  - live status screen
  - staking and consensus screen
  - governance screen
  - analytics screens
  - deliverables
    - W27 build system and first alpha release
    - W28 first beta release (block, operation, cycle, account screens and search)

### User Personas/Groups

Target audience are all stakeholders in the Tezos ecosystem, i.e. investors, bakers, staking services, protocol developers, dapp developers, exchanges, media and the general public.

- **investor**: activity, growth, risk, upside, staking services, on/off-ramps + liquidity, custodians, governance, balance, address activity, payouts (past, pending, future), staking services, votes, on/off-ramps + liquidity, custodians, software upgrades
- **adopter**: balance, price, address activity, growth, staking services, payouts, governance
- **dapp user**: balance, address activity, current fees, historic costs (fee, gas), software upgrades
- **dapp developer**: balance, contract activity, gas & storage stats, code, storage, software upgrades
- **baker**: balance, delegation activity, #delegations, #rolls, past/current/future rights, steal/miss history, current deposits/rewards/fees, future deposits/rewards predictions (when rights are set), own voting history, software upgrades
- **protocol developer**: network & consensus health, governance, network nodes, all stats
- **exchange**: cluster balance, cluster members, cluster ops, in/out flow stats (for own cluster), network health, alarms, software upgrades


### Requirements

- display live and historic data as well as analytics for different Tezos blockchain networks (mainnet, alphanet, zeronet)
- allow users to view current network status, network health, consensus and governance related issues
- allow users to view and search for information on individual accounts, operations, blocks, and nodes
- provide network-wide analytics and insights into supply, delegation, consensus and on-chain activity, account growth, balance distributions and centralization
- provide individual analytics and insights into account and delegation balance evolutions
- be compatible with recent desktop and mobile web browsers (i.e. Firefox, Chrome, Safari and optionally Microsoft Edge)
- use of a modern Javascript framework (e.g. React) and modern HTML/CSS web design features
- optional integrations with 3rd party analytics services for collecting usage and software defect metrics (e.g. Google Analytics, Mixpanel, Bugsnag or similar services)
all source-code must be licensed under MIT license and made publicly available
- engage community to identify and prioritize user requirements


**Must have features**
- read-only view on blockchain data and statistics (no user accounts, no personalization)
- global network-wide views and detailed views on accounts, blocks, operations
- information freshness (block, cycle, time), last block n sec/min ago, crawler status
- low affordance graphs
- interactive graphs > click on graph follows deep link to allow for exploration
- visualize complex relations
  - sender-receiver for transactions and delegations
  - past .. present .. future for staking cycles and governance
  - cycle clock with fill-level and selected snapshot
  - chain of blocks with branches, block-times, misses
  - consensus priorities, rights/steals/misses
  - N-of-100 for centralization
- search
  - block level -> single block page
  - block hash -> single block page
  - op hash -> single operation page
  - addr hash -> single account page
  - service name -> single account page
- single-page javascript app, no backend rendering, API only data streams

**Optional features**
- multiple Tezos networks besides mainnet

**Out of scope features**
- notifications (Telegram, email, discord)
- staking payout tracking
- staking service reliability
- node networking metrics

### Screens

- **landing** `/`
  - live block(s), cycle, voting, market (price, mcap) info
  - live supply: inflation, staking yield, circulating, staking, frozen, and unclaimed supply
  - 30d global market status: market volume, market price
  - 30d global network growth: new funded accounts (new vs cleared accounts)
  - 30d global network activity: rewards, fees, volume, gas, token age transacted time-series
- [**single block**](./blob/master/doc/block.md) `/block/:block_id`
  - visual chain history timeline on top, navigate left/right
  - selected block details
  - baker/endorser details
- [**single cycle**](./blob/master/doc/cycle.md) `/cycle/:cycle_num`
  - visual cycle history timeline on top, navigate left/right
  - #bakers, #endorsers, #roll owners, staking supply
  - top-N bakers
- [**single operation**](./blob/master/doc/op.md) `/op/:op_hash`
  - visual operation list within block on top, navigate left/right
  - block and op details
  - involved accounts (as cards with all type-specific data, e.g. delegator)
- [**single account**](./blob/master/doc/account.md) `/account/:address`
  - accounts share basic metadata/balance/etc and have type/state specific data
  - show call to action when type/state suggests (e.g. this is how you delegate)
  - types: BASIC (implicit, tz1/2/3), CONTRACT (w/wo code)
  - states: unclaimed, simple, delegate, baker / not delegated, delegated
  - baker: delegate efficiency (missed blocks, endorsements, lost rewards)
  - baker: staking bond, current balance, total capacity, available bonds, available capacity
- [**governance**](./blob/master/doc/governance.md) `/governance`
  - past and current voting periods on top, navigate left/right
  - voting progress, current proposals, votes, quorum, majority
- **staking** `/staking`
  - maybe EOD stats only, 30d view
  - this is related to data in cycle, but displays evolution across larger time frame
  - delegation activity and consensus related supply
  - active delegators, delegates, daily consensus participants (#bakers, #endorsers), rolls, owners
- **health** `/health`
  - 24h or 30d views or both
  - double baking and double endorsements
  - uncle rate, i.e. alternative heads (backend todo)
  - missed endorsements
  - missed blocks: actual block priorities distribution, block times
  - missed nonce revelations (backend todo)
  - height, protocol version and node version for our backend & different public nodes (backend todo)
  - block propagation times (optional, missing data)
  - tx propagation times (optional, missing data)
- **whales** (centralization) `/whales`
  - large bag holders, 100% donut graph = top 1 - 1k balances + rest
  - large bakers, 100% donut graph, top 1, 10, 100, rest delegates
  - wealth centralization by address value and count
  - daily tx on top active addresses
  - daily volume on top active addresses
- **markets** `/markets`
  - volume, trades, price across markets (exchanges and pairs)
  - trades per weekday / hour histogram
  - list of volume, price, 24h change by market (selected markets only, like tradeblock)
  - list of largest trades last 24h
  - daily candles + volume in buy/sell side (across all markets) last 30 or 60 days
  - donut charts: XTZ volume by exchange, XTZ volume by quote
  - change: absolute & percent 1d, 7d, 30d, from ATH, YTD
- **analytics** `/analytics`
    - growth/demand
      - daily growth overall (new vs cleared accounts)
      - growth by address type, growth by balances size (= derivative of centralization data)
      - 3M hodl vs Tx supply vs. 3M token age transacted
      - dormancy by age (in addresses and funds)
    - on-chain activity
        - volume percentage by type
        - operation counts by type
        - fee and gas prices
        - mean, median, max value by operation
    - supply
        - activated/unclaimed, vested/unvested funds
        - inflation: frozen/unfrozen rewards vs burn
        - frozen bonds, staked vs circulating supply
        - supply breakdown donut chart: (100% = total supply)
            - sum managed KT1
            - sum implicit tz1
            - sum contract KT1
            - unvested
            - unclaimed
        - circulating supply breakdown donut chart: (100% = total supply)
            - circulating
            - frozen
            - unvested
            - unclaimed
        - delegation supply breakdown donut chart: (100% = total supply)
            - staking (= delegated + frozen deposits, delegate spendable funds)
            - unvested
            - unclaimed
            - frozen rewards (count against total, but not staking)
    - account activations
      - activated accounts by month
      - activated coins by month
      - count and percentage activated vs not activated accounts & coins
      - histogram of balances across all non-activated accounts
- **node list/single node** (out of scope)
    - ip address and location
    - update availability: git hash compare against gitlab master
    - connectivity (can we reach the node?)
    - number of connections


## URL Semantics

| URL | Screen    | Comments |
|-----|-----------|---------|
| `/` | Landing   ||
| `/block/:block_id` | [Block](./blob/master/doc/block.md) | `:block_id` is hash or height; 404 when not found |
| `/block`           | | forward to head block |
| `/cycle/:cycle_num`| [Cycle](./blob/master/doc/cycle.md) | `:cycle_num` is a number; 404 when not found |
| `/cycle`           | | forward to current cycle |
| `/op/:op_hash`     | [Operation](./blob/master/doc/op.md) | `:op_hash` is hash only; 404 when not found |
| `/op`              | 404 | |
| `/account/:address`| [Account](./blob/master/doc/account.md) | `:address` is any KT1\*, tz1\*, tz2\*, tz3\*; 404 when not found |
| `/vote/:vote_id`   | [Governance](./blob/master/doc/governance.md) | `:vote_id` is a voting period; 404 when not found |
| `/vote`            | | forward to current voting period |
| `/staking`         | Staking    | todo |
| `/health`          | Health     | todo |
| `/whales`          | Whales     | todo |
| `/markets`         | Markets    | todo |
| `/analytics`       | Analytics  | todo |


## Inspiration

Explorers

- https://tzscan.io/ https://gitlab.com/tzscan/tzscan
- https://tezos.id
- https://xtzexplorer.io/
- https://arronax-beta.cryptonomic.tech/
  - https://medium.com/the-cryptonomic-aperiodical/arronax-an-analysis-oriented-block-explorer-bd3b5d4f9fcb
  - https://github.com/Cryptonomic/Arronax
  - https://github.com/Cryptonomic/Conseil
- DEAD http://www.ostez.com/
- DEAD https://tezoschain.io/
- AirGap [1](https://medium.com/airgap-it/tezblock-a-tezos-block-explorer-concept-a6fce860ae8e), [2](https://medium.com/airgap-it/tezblock-a-tezos-block-explorer-concept-part-2-ffaa1557b5d5), [3](https://medium.com/airgap-it/tezblock-receives-tezos-foundation-grant-f668809fea06)

Other Services

- https://bakendorse.com - baker statistics
- https://baking-bad.com - baker accountability
- https://mytezosbaker.com/ - staking service overview

Gini Coefficient, Distributions, Voting
- https://medium.com/@Melt_Dem/the-tezos-experiment-b97e124e5b38
- https://bakendorse.com/#/bakers/tz1Yju7jmmsaUiG9qQLoYv35v5pHgnWoLWbt/dashboard
- https://mytezosbaker.com/
- https://baking-bad.org/

Blockies Images JS Lib
- https://github.com/airgap-it/blockies

## Application

### `npm start`
### `npm run build` fails to minify
### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
### `npm test`